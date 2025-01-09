'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {useCallback, useEffect} from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from "@/contexts/authContext";
import bs58 from 'bs58';
import {redirect, useRouter} from "next/navigation";

const uint8ArrayToBase58 = (arr) => {
    return bs58.encode(arr);
};

export default function WalletLogin() {
    const { wallet, connected, disconnect, publicKey, signMessage } = useWallet();
    const { user, setUser, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/dashboard");
        }
    }, [user, isLoading]);

    const signMessageReq = async () => {
        let message = await fetch(`http://localhost:8080/api/auth/request_nonce/${publicKey}`, {
            method: 'GET',
            credentials: 'include'
        })
        let { data } = await message.json();
        data = new TextEncoder().encode(data);
        const signature = await signMessage(data);
        const signature_bs58 = uint8ArrayToBase58(signature);
        console.log(signature_bs58);
        let jwt = await fetch("http://localhost:8080/api/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                wallet: publicKey,
                signature: signature_bs58
            }),
            credentials: 'include'
        })
        if (jwt.status !== 200) {
           alert("Authorization failed");
        } else {
            setUser(publicKey.toString());
            await redirect('/dashboard');
        }

    }


    const handleLogout = useCallback(async () => {
        if (wallet) {
            await disconnect();
        }
    }, [wallet, disconnect]);

    return (
        <Card className="w-full max-w-[300px] sm:max-w-[500px] px-10 pt-10 mx-10 rounded-2xl shadow-lg bg-secondary dark:bg-dark-secondary min-h-96">
            <div className="flex flex-col items-center justify-between gap-6">
                <h2 className="text-2xl text-center font-bold text-primary dark:text-dark-primary">
                    Login with Wallet
                </h2>

                {!connected ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <p className="text-primary dark:text-dark-primary">
                            Connect your Solana wallet to continue
                        </p>
                        <WalletMultiButton/>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 w-full">

                        <p className="text-sm text-primary break-all text-center select-none mb-7">
                            Connected Address:<br/> {publicKey?.toBase58()}
                        </p>

                       <Button
                           onClick={signMessageReq}
                           className="text-2xl min-h-14 rounded-3xl font-semibold w-full max-w-52 bg-off-white text-primary
                           hover:bg-primary hover:text-off-white
                           dark:bg-primary dark:text-dark-secondary
                            dark:hover:bg-accent">
                           Sign in
                       </Button>

                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="w-fit rounded-3xl bg-off-white font-semibold text-primary
                            hover:bg-primary hover:text-off-white
                            dark:bg-primary dark:text-dark-secondary
                            dark:hover:bg-accent">

                            Disconnect Wallet
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}