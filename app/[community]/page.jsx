"use client"

import { useParams } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import { useEffect, useState } from "react";
import Image from "next/image";
import {Button} from "../../components/ui/button";
import useToast from "../../hooks/useToast";

export default function Page() {
    const { community } = useParams();
    const { user, isLoading } = useAuth();
    const [communityData, setCommunityData] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const {addToast} = useToast();

    const checkWallet = async () => {
        if (!user) {
            addToast("You are not logged in!");
            return;
        }
        try {
            let response = await fetch(`http://localhost:8080/api/${communityData.api_name}/check/${user}`,
                {method: "GET", credentials: "include" }
            );
            let responseData = await response.json();
            if (responseData.data === true) {
                addToast("Your wallet is allowed to join", 'success')
            } else {
                addToast("Your wallet is not allowed to join", 'error')
            }
        } catch {
            addToast("Something went wrong while checking your wallet", 'error')
        }
    }

    const process_payment = async () => {
        try {

        } catch {}
    }

    useEffect(() => {
        async function fetchInfo() {
            try {
                setIsLoadingData(true);
                const response = await fetch(`http://localhost:8080/api/community/${community}`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await response.json();
                setCommunityData(data.data);
            } catch (error) {
                addToast("Error fetching community data", 'error');
            } finally {
                setIsLoadingData(false);
            }
        }
        fetchInfo();
    }, [community]); // добавил community в зависимости

    if (isLoading || isLoadingData) {
        return <div className="flex flex-col justify-center items-center text-4xl">Loading...</div>;
    }

    if (!communityData) {
        return <div className="flex flex-col justify-center items-center text-4xl">No data found</div>;
    }

    return (
            <div className="p-8 bg-off-white dark:bg-primary">
                <h1 className="bg-primary text-off-white dark:bg-off-white dark:text-primary text-2xl md:text-4xl shadow font-bold w-full mb-8 text-center rounded-2xl py-4">
                    {communityData.name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col gap-6">
                        <div
                            className="bg-primary text-off-white dark:bg-off-white dark:text-primary p-6 pb-10 rounded-2xl shadow select-none">
                            <div className="dark:text-primary font-semibold text-2xl text-center lg:text-left mb-6">
                                About community
                            </div>

                            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={communityData.logo}
                                        alt={"logo"}
                                        width={256}
                                        height={256}
                                        className="rounded-xl dark:border-4 dark:border-primary w-full max-w-[256px] object-cover object-center"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <div className="flex flex-col w-full max-w-full">
                                        {communityData && communityData.description !== undefined ?
                                            (<>
                                                <div className="dark:text-primary font-semibold text-lg text-left">
                                                    Description<br/>
                                                </div>
                                                <div className="dark:text-primary text-lg text-left mb-6 max-w-fit overflow-x-auto">
                                                    {communityData.description}
                                                </div>
                                            </>)
                                            : null}


                                        <div className="dark:text-primary text-lg text-left">
                                            <span
                                                className="font-semibold">Renewal period:</span> {communityData.renewal_period} days
                                        </div>
                                        <div className="dark:text-primary text-lg text-left">
                                            <span
                                                className="font-semibold">Renewal price:</span> {communityData.price} USDT
                                        </div>
                                        <div className="dark:text-primary text-lg text-left">
                                            <span
                                                className="font-semibold">Only for allowed wallets:</span> {communityData.need_wl ? "Yes" : "No"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {communityData && communityData.need_wl === true ? (
                            <div
                                className="bg-primary text-off-white dark:text-primary dark:bg-off-white p-6 rounded-2xl shadow select-none">
                                <h2 className="text-xl font-semibold mb-6 text-center">
                                    Check if you are allowed to join
                                </h2>
                                <Button onClick={checkWallet} className="bg-off-white dark:bg-primary w-full p-6 rounded-2xl text-xl font-semibold flex items-center
                            justify-center text-dark-primary dark:text-off-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-[#C2E812]
                            hover:-translate-x-1 mx-0 hover:-translate-y-1 dark:hover:text-primary">
                                    Check Wallet
                                </Button>
                            </div>
                        ) : null}
                        <div
                            className="bg-primary text-off-white dark:text-primary dark:bg-off-white p-6 rounded-2xl shadow select-none">
                            <h2 className="text-xl font-semibold mb-6 text-center">
                                Buy License
                            </h2>
                            <Button onClick={() => {}} className="bg-off-white dark:bg-primary w-full p-6 rounded-2xl text-xl font-semibold flex items-center
                            justify-center text-dark-primary dark:text-off-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-[#C2E812]
                            hover:-translate-x-1 mx-0 hover:-translate-y-1 dark:hover:text-primary">
                                Pay
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
    );
}