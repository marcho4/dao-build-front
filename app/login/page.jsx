"use client"

import Link from "next/link";
import {CreationForm} from "../components/createCommunity";
import {useState} from "react";
import ConditionalLink from "../components/conditionalLink";

export default function Page() {
    const [visibility, setVisibility] = useState(false);

    const showForm = () => {
        setVisibility(true);
        document.body.style.overflow = "hidden";
    }

    function processLogin()  {
        // Create message and send it to sign
        // Verify message
        // Create JWT token
        // Place it into Http Storage only cookies
        // Redirect to dashboard
        const jwt =  fetch(
            "http://localhost:8000/jwt/generate",
            {method: "POST", body: {walletAddress: "sad"} })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .finally(() => console.log(jwt));
        return false;
    }

    const closeForm = () => {
        setVisibility(false);
        document.body.style.overflow = "auto";
    }
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <ConditionalLink loginHandler={generateJWT}>
                <div className="bg-[#556B2F] text-white py-4 px-2">Login using solana</div>
            </ConditionalLink>
            <Link onClick={processLogin} href="/dashboard" className="border bg-[#4B0082] border-gray-200 text-white px-10 py-4">LOGIN</Link>
            <button onClick={showForm} className="bg-[#556B2F] text-white py-4">Create Community</button>
            <CreationForm isOpen={visibility} onClose={closeForm}></CreationForm>
        </div>
    );
};
