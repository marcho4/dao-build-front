"use client"

import WalletLogin from '../components/walletLogin';

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[70svh] bg-dark-secondary dark:bg-dark-primary">
            <WalletLogin />
        </div>
    );
};
