"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { Member } from "./member";
import {Wallet} from "./wallet";
import AllowWallet from "./AddWalletSection";
import CommunityDataSection from "./communityDataSection";

export default function CommunityPage() {
    const { api_name } = useParams();
    const { user } = useAuth();
    const [communityData, setCommunityData] = useState(null);
    const [members, setMembers] = useState(null);
    const [allowedWallets, setAllowedWallets] = useState(null);

    const get_members = async (api_name) => {
        try {
            let response = await fetch(`http://localhost:8080/api/${api_name}/members`, {
                method: "GET",
                credentials: "include"
            });
            const data = await response.json();
            setMembers(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const get_allowed_wallets = async (api_name) => {
        try {
            let response = await fetch(`http://localhost:8080/api/${api_name}/wallets`, {
                method: "GET",
                credentials: "include"
            })
            const data = await response.json();
            setAllowedWallets(data.data);
        } catch (e) {
            console.log(e);
        }
    }
    const fetchCommunityDetails = async (api_name) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/community/${api_name}`,
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

    useEffect(() => {
        if (api_name) {
            fetchCommunityDetails(api_name);
            get_members(api_name);
            get_allowed_wallets(api_name);
        }
    }, [api_name]);


    if (!communityData || !allowedWallets || !members) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8 bg-[#F8F8F8] dark:bg-[#1B1F3B]">
            <h1 className="text-2xl lg:text-4xl text-center py-3 bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8]
             rounded-2xl font-bold mb-6">
                {communityData.name + " Dashboard"}
            </h1>
            {/* Community description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-6">
                    <CommunityDataSection communityData={communityData} />
                    {communityData.need_wl ? (
                        <div
                            className="bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8] p-6 rounded-2xl shadow">
                            <h2 className="text-xl font-semibold mb-4 ">Allowed wallets</h2>
                            {allowedWallets.length === 0 ? (<div>You have 0 wallets allowed</div>) : null}
                            <div className="max-h-60 overflow-y-auto">
                                {allowedWallets.map((allowedWallet) =>
                                    (<Wallet key={allowedWallet} wallet={allowedWallet} onClick={() => {
                                    }}/>))
                                }
                            </div>
                        </div>
                    ) : null}
                </div>


                <div className="flex flex-col gap-6">
                    {/* Members section */}
                    <div
                        className="bg-[#1B1F3B] text-[#F8F8F8] dark:text-[#1B1F3B] dark:bg-[#F8F8F8] p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4 ">Members</h2>
                        {members.length === 0 ? (<div>You have 0 members</div>) : null}
                        <div className="max-h-60 overflow-y-auto">
                            {members.map((member) => (
                                <Member key={member.wallet} wallet={member.wallet} onClick={() => {
                                }} endDate={member.expiration}/>
                            ))}
                        </div>

                    </div>

                    {/* Allow wallets section*/}
                    {communityData.need_wl ? <AllowWallet api_name={api_name} /> : null}

                </div>
            </div>
        </div>
    );
}