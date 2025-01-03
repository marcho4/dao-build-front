import React, { useState, useEffect } from 'react';

export function Wallet({ wallet, onClick }) {
    // Состояние для хранения текущей ширины окна
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        // Функция-обработчик изменения размера окна
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Добавляем слушатель события 'resize'
        window.addEventListener('resize', handleResize);

        // Убираем слушатель при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Сокращаем адрес, показывая первые 4 и последние 4 символа
    const shortenedWallet = `${wallet.substring(0, 4)}...${wallet.substring(wallet.length - 4)}`;

    return (
        <div className="flex items-center justify-between min-w-fit bg-[#F8F8F8] rounded-xl text-black
             hover:bg-[#252ad0] hover:text-[#F8F8F8] transition-colors mb-4 p-4 max-h-9">
            {windowWidth > 1100 ? (
                <div className="pl-3 text-xs font-semibold">{wallet}</div>
            ) : (
                <div className="pl-3 text-xs font-semibold">{shortenedWallet}</div>
            )}

            <button
                onClick={onClick}
                className="px-2 py-0.5 rounded-xl text-xs underline font-semibold"
            >
                Remove
            </button>
        </div>
    );
}