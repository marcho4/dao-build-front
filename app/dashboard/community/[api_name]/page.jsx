"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Member } from "./member";

export default function CommunityPage() {
    const { api_name } = useParams();
    const { user } = useAuth();
    const [communityData, setCommunityData] = useState(null);

    useEffect(() => {
        const fetchCommunityDetails = async () => {
            try {
                console.log(api_name);
                const response = await fetch(
                    `http://localhost:8003/community/${api_name}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                if (data?.data) {
                    setCommunityData(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch community details", err);
            }
        };

        if (api_name) {
            fetchCommunityDetails();
        }
    }, [api_name]);

    if (!communityData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8 bg-[#F8F8F8]">
            <h1 className="text-3xl text-center py-3 bg-white rounded-2xl font-bold mb-6">{communityData.name + " Dashboard"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                {/* Описание сообщества */}
                <div className=" bg-white p-6 rounded-2xl shadow select-none">
                    <h2 className="text-xl font-semibold mb-4 ">Community Details</h2>
                    <p className=""><span className="font-semibold">Description:</span> {communityData.description}
                    </p>
                    <p className=""><span
                        className="font-semibold">Renewal period:</span> {communityData.renewal_period} days
                    </p>
                    <p className="">
                        <span className="font-semibold">Price per period:</span> {communityData.price}
                    </p>
                    <p className="">
                        <span className="font-semibold">Social:</span> {communityData.social}
                    </p>

                    <p className=""><span className="font-semibold">Only for allowed
                        wallets: </span>{communityData.need_wl ? "Yes" : "No"}</p>

                </div>
                <button className="bg-gray-50">Change community</button>

                {/* Список */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4 text-black">Members</h2>
                    {/* Список участников */}

                    <div className="max-h-60 overflow-y-auto">
                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>
                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>

                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>

                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>
                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>
                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>
                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>
                        <Member wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr" endDate="28th december"/>

                    </div>

                </div>
                {/* Добавьте другие секции по необходимости */}

                {/*  */}

            </div>
        </div>
    );
}