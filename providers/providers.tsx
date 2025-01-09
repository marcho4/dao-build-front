'use client'

import { SolanaProviders } from "@/providers/solanaProvider"
import { ToastProvider } from "@/providers/toastProvider"
import { AuthProvider } from "@/contexts/authContext"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <SolanaProviders>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </SolanaProviders>
        </AuthProvider>
    )
}