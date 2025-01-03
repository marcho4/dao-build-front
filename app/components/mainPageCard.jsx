

const PageCard = ({ content }) => {
    return (
        <div
            className="bg-secondary dark:text-dark-primary border-t border-l border-b-4 border-r-4
         border-gray-700 dark:border-black w-full h-60 p-6 rounded-2xl text-3xl font-semibold flex items-center
         justify-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-[#C2E812]">
            {content}
        </div>
    );
}

export default PageCard;