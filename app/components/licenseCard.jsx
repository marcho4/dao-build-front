import React from 'react';
import Image from 'next/image';

export const LicenseCard = ({ name, license, community, invite, expiration, imageSrc, onClick }) => {
    return (
        <div onClick={onClick} className="
        min-h-40 min-w-52 bg-[#f1e2b6] transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:border-gray-300
         max-w-64 rounded-3xl flex flex-col p-4 cursor-pointer">
            <Image
                className="square-picture rounded-3xl mb-3 min-w-32 select-none bg-[#ffffff]"
                src={imageSrc}
                alt={"logo"}
                width={256}
                height={256}
                priority
            />
            <div className="rounded-3xl text-2xl font-bold select-none dark:text-black">
                {community}
            </div>
            <div className="rounded-3xl font-thin mb-3 text-[#4f3e2e] select-none">
                {license}
            </div>
            <div className="max-w-fit mt-auto font-bold text-left py-1.5 px-3 hover:text-white cursor-pointer rounded-xl bg-[#2c289f] text-white">
                See more
            </div>
        </div>
    );
};

