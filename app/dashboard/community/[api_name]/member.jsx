export function Member({ wallet, endDate, onClick }) {
    // Сокращаем адрес, показывая первые 4 и последние 4 символа
    const shortenedWallet = `${wallet.substring(0, 4)}...${wallet.substring(
        wallet.length - 4
    )}`;

    return (
        <div className="flex items-center justify-between bg-[#F8F8F8] rounded-xl text-black
         hover:bg-[#252ad0] hover:text-[#F8F8F8]  transition-colors min-w-fit mb-4 p-4 max-h-9">
            <div className="pl-3 text-xs font-semibold">{shortenedWallet}</div>
            <div className="text-xs opacity-80 px-3 text-center">{endDate}</div>
            <button
                onClick={onClick}
                className="px-2 py-0.5 rounded-xl text-xs underline font-semibold"
            >
                Kick
            </button>
        </div>
    );
}