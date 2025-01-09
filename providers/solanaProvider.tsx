'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import {
    ConnectionProvider,
    WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ReactNode } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';

export function SolanaProviders({ children }: { children: ReactNode }) {
    const network = WalletAdapterNetwork.Mainnet;
    const endpoint = clusterApiUrl(network);

    const wallets = [new PhantomWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}