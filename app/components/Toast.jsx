"use client"

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import useToast from "@/hooks/useToast";

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'bg-off-white';
            case 'error':
                return 'bg-red-100';
            default:
                return 'bg-secondary';
        }
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-[9999] ${getBgColor()} shadow-md rounded-lg p-3 min-w-[180px] transform transition-all duration-300 ease-in-out`}>
            <div className="flex items-center gap-1.5">
                {getIcon()}
                <p className="text-primary flex-1">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    className="text-primary hover:text-gray-600 p-1"
                >
                    <X className="w-3 h-3"/>
                </button>
            </div>
        </div>
    );
};
const ToastContainer = () => {
    const toasts = useToast((state) => state.toasts) // Получаем toasts из того же store

    return (
        <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => useToast.getState().removeToast(toast.id)}
                />
            ))}
        </div>
    )
}
export default ToastContainer;