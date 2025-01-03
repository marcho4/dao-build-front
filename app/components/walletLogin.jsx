'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {useCallback, useEffect} from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from "@/contexts/authContext";
import bs58 from 'bs58';
import {redirect} from "next/navigation";

const uint8ArrayToBase58 = (arr) => {
    return bs58.encode(arr);
};

export default function WalletLogin() {
    const { wallet, connected, disconnect, publicKey, signMessage } = useWallet();
    const {user, setUser} = useAuth();
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
        <Card className="w-full max-w-md mx-auto p-6 shadow-lg bg-white">
            <div className="flex flex-col items-center gap-6">
                <h2 className="text-2xl font-bold">
                    {connected ? 'Wallet Connected' : 'Connect Your Wallet'}
                </h2>

                {!connected ? (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <p className="text-gray-600">
                            Connect your Solana wallet to continue
                        </p>
                        <WalletMultiButton className="w-full" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <p className="text-sm text-gray-600 break-all text-center select-none">
                            Connected Address: {publicKey?.toBase58()}
                        </p>
                       <Button onClick={signMessageReq} className="text-2xl font-bold hover:text-purple-700 border border-black">
                           SIGN IN
                       </Button>

                        <Button
                            variant="destructive"
                            onClick={handleLogout}
                            className="w-full underline"
                        >
                            Disconnect Wallet
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}