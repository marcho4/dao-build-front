"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Member } from "./member";
import {Wallet} from "./wallet";

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
        <div className="p-8 bg-[#F8F8F8] dark:bg-[#1B1F3B]">
            <h1 className="text-xl lg:text-3xl text-center py-3 bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8]
             rounded-2xl font-bold mb-6">{communityData.name + " Dashboard"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-6">
                    {/* Описание сообщества */}
                    <div className=" bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8] bg-blend-darken p-6 rounded-2xl shadow select-none">
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
                        wallets: </span>{communityData.need_wl ? "Yes" : "No"}
                        </p>

                    </div>
                    {communityData.need_wl ? (
                            <div className="bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8] p-6 rounded-2xl shadow">
                                <h2 className="text-xl font-semibold mb-4 ">Allowed wallets</h2>
                                <div className="max-h-60 overflow-y-auto">
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                    <Wallet wallet="CVBHTGQRNFRtTvNPCvf1G4mcVy93TwB9QAxGhrM6sWRr"/>
                                </div>

                            </div>
                    ) : null}

                </div>


                {/* Список */}
                <div className="bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8] p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4 ">Members</h2>
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


            </div>
        </div>
    );
}