"use client"

import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../contexts/authContext";
import useToast from '../../../../hooks/useToast';
import Link from "next/link";
import Image from "next/image";
import {Button} from "../../../../components/ui/button";
import {useWallet} from "@solana/wallet-adapter-react";
import {Connection, PublicKey, Transaction, TransactionInstruction} from "@solana/web3.js";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import RenewLicenseSection from "./renewLicenseSection";
import bs58 from "bs58";


export const getTransaction = async (amount, sender, receiver, token) => {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/generate_transaction", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json" // Правильный ключ
            },
            body: JSON.stringify({
                "amount": amount,
                "sender": sender,
                "receiver": receiver,
                "token": token
            }),
        });

        if (!response.ok) {
            // Обработка ошибок HTTP
            const errorData = await response.json();
            console.error("Ошибка сервера:", errorData);
            return null;
        }

        const body = await response.json();

        const keys = body.data.accounts.map(key => ({
            pubkey: new PublicKey(key.pubkey),
            isSigner: key.is_signer,
            isWritable: key.is_writable,
        }));

        const decodedData = Buffer.from(body.data.data, 'base64');

        const instruction = new TransactionInstruction({
            keys,
            programId: new PublicKey(body.data.program_id),
            data: decodedData,  // было decodedData: decodedData
        });

        return instruction;
    } catch (error) {
        return null;
    }
}


export default function Page() {
    const { key} = useParams();
    const [ licenseData, setLicenseData ] = useState(null);
    const [ communityData, setCommunityData ] = useState(null);
    const [ fetchingData, setFetch ] = useState(true);
    const { isLoading } = useAuth()
    const { addToast } = useToast()
    const { wallet, connected, disconnect, publicKey, signTransaction } = useWallet();

    const handleClick = async () => {
        const connection = new Connection(`https://mainnet.helius-rpc.com/?api-key=57609837-4d67-42dc-8ee6-1307bb7df433`, 'confirmed');
        const latestBlockhash = await connection.getLatestBlockhash();
        let ix = await getTransaction(communityData.price, publicKey, communityData.collect_wallet, "USDT");
        if (ix == null) {
            addToast("Error with generating transaction", 'error');
            return;
        }
        let transaction = new Transaction().add(ix);
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = publicKey;
        // Подпись транзакции
        const signedTransaction = await signTransaction(transaction);

        // Отправка транзакции
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        // Подтверждение транзакции
        await connection.confirmTransaction(signature, 'confirmed');

        addToast(`Transaction successful with signature: ${signature}`, 'success');
        console.log(`Transaction successful with signature: ${signature}`);
    };

    useEffect(() => {
        setFetch(true);
        const fetchLicense = async (key) => {
            const response = await fetch("http://localhost:8001/license/get/" + key,
                {
                    method: "GET",
                    credentials: "include",
                });
            let obj = await response.json();

            let commResponse = await fetch("http://localhost:8003/community/" +
                obj.data.community.toLowerCase().replace(" ", "_"),
                {
                    method: "GET",
                    credentials: "include",
                });
            let communityResponse = await commResponse.json();

            let date = new Date(obj.data.expiration);

            obj.data.endDay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            obj.data.endTime = `${date.getHours()}:${date.getMinutes()}`;
            setLicenseData(obj.data);
            setCommunityData(communityResponse.data);
            setFetch(false);

            console.log(obj.data);
        }
        if (key) {
            fetchLicense(key);
        }
    }, [key]);

    if (isLoading || fetchingData) {
        return <p>Loading...</p>;
    }
    if (!licenseData) {
        return <div className="min-h-screen text-5xl text-center flex flex-col justify-center items-center">License doesn&#39;t exist</div>;
    }
    if (!communityData) {
        return <div className="min-h-screen text-5xl text-center flex flex-col justify-center items-center">Community doesn&#39;t exist</div>;
    }
    return (
        <div className="p-8 bg-off-white dark:bg-primary">
            <h1 className="bg-primary text-off-white dark:bg-off-white dark:text-primary text-2xl md:text-4xl shadow font-bold w-full mb-8 text-center rounded-2xl py-4">
                License in {licenseData.community}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-6">
                    <div
                        className="bg-primary text-off-white dark:bg-off-white dark:text-primary p-6 pb-10 rounded-2xl shadow select-none">
                        <div className="dark:text-primary font-semibold text-2xl text-left mb-6">
                            About community
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                            <div className="flex items-center justify-center">
                                <Image
                                    src={`/${licenseData.community.toLocaleLowerCase().replace(' ', '_')}.png`}
                                    alt={"logo"}
                                    width={256}
                                    height={256}
                                    className="rounded-xl dark:border-4 dark:border-primary w-full max-w-[256px] object-cover object-center"
                                />
                            </div>
                            <div className="flex justify-center">
                                <div className="flex flex-col">
                                    {communityData && communityData.description !== undefined ?
                                        (<>
                                            <div className="dark:text-primary font-semibold text-lg text-left">
                                                Description<br/>
                                            </div>
                                            <div className="dark:text-primary text-lg text-left mb-6">
                                                {communityData.description }
                                            </div>
                                        </>)
                                        : null }


                                    <div className="dark:text-primary text-lg text-left">
                                    <span
                                        className="font-semibold">Renewal period:</span> {communityData.renewal_period} days
                                    </div>
                                    <div className="dark:text-primary text-lg text-left">
                                        <span className="font-semibold">Renewal price:</span> {communityData.price} USD
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div
                        className=" bg-primary text-off-white dark:text-primary dark:bg-off-white p-6 rounded-2xl shadow select-none">
                        <h2 className="text-xl font-semibold mb-6 ">License Details</h2>
                        <p className=""><span className="font-semibold">License key:</span> {licenseData.license}
                        </p>
                        <p className=""><span
                            className="font-semibold">End Date: </span>
                            {licenseData.endDay + " " + licenseData.endTime}
                        </p>

                        <p className="">
                        <span
                            className="font-semibold">Activated:</span> {licenseData.activated ? "True" : "False"}
                        </p>
                        {licenseData.invite !== "" ? (
                                <p className="">
                                    <span className="font-semibold">Invite:</span>
                                    <Link className="hover:text-[#C2E812] dark:hover:text-accent font-medium"
                                          href={`https://` + licenseData.invite}> {licenseData.invite}</Link>
                                </p>)
                            :
                            (<p className=""></p>)}

                    </div>
                    <RenewLicenseSection handleClick={handleClick} connected={connected} />
                </div>
            </div>
        </div>
    )
}