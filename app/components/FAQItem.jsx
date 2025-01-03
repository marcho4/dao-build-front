"use client"


import {useState} from "react";

export const FAQItem = ({question, answer}) => {
    const [show, setShow] = useState(false);

    const buttonClick = () => {
        setShow(!show);
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <button
                className={`bg-secondary dark:text-dark-primary text-left font-semibold text-xl ${show ? "rounded-t-2xl" : "rounded-2xl"} min-w-full
                flex justify-between items-center p-4 mb-0`}
                onClick={buttonClick}>

                <span>{question}</span>
                <svg
                    className="w-6 h-6 text-black transform transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>

            </button>
            {show && (
                <div className="p-4 mt-0 bg-[#C9DDFF] dark:text-dark-primary font-semibold text-left text-xl rounded-b-2xl min-w-full">
                    {answer}
                </div>
            )}
        </div>

    )
}