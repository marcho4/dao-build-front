"use client"

import { create } from 'zustand';

const useToast = create((set) => ({
    toasts: [],
    addToast: (message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type, duration }],
        }));
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },
}));

export default useToast;