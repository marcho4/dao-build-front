'use client'

import ToastContainer from '../app/components/Toast'
import React from "react";

export function ToastProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}