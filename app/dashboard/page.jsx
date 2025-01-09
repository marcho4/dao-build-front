"use client"

import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { CommunityCard } from "../components/CommunityCard";
import { LicenseCard } from "../components/LicenseCard";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CommunityCreationModal from "../components/CreateCommunity";
import { Suspense } from 'react';


const SkeletonCard = () => (
    <div className="min-h-40 min-w-52 w-full bg-gray-100 transition-all duration-300 rounded-3xl flex flex-col p-4 animate-pulse">
        <div className="square-picture rounded-3xl mb-3 w-full bg-gray-200 h-64" />
        <div className="rounded-3xl h-8 bg-gray-200 mb-5 w-3/4" />
        <div className="mt-auto max-w-fit font-bold text-left py-1.5 px-3 rounded-xl bg-gray-200 w-24 h-8" />
    </div>
);
export default function Page() {
    const [visibility, setVisibility] = useState(false);
    const { user, isLoading } = useAuth();
    const router = useRouter();

    const [licenses, setLicenses] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const fetchCommunityData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/get/ownerships/${user}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (data?.data) {
                setCommunities(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch community data", err);
        }
    };

    const fetchLicenseData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/get/memberships/${user}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (data?.data) {
                setLicenses(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch license data", err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading && user) {
                setIsDataLoading(true);
                await Promise.all([fetchCommunityData(), fetchLicenseData()]);
                setIsDataLoading(false);
            }
        };
        fetchData();
    }, [user, isLoading]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (!user) {
        return null;
    }

    const showForm = () => {
        if (user) {
            setVisibility(true);
            document.body.style.overflow = "hidden";
        }
    };

    const closeForm = () => {
        setVisibility(false);
        document.body.style.overflow = "auto";
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center px-20 py-10 mb-14">
                {(licenses.length > 0 || isDataLoading) && (
                    <div className="select-none w-full">
                        <div className="text-5xl font-bold mb-10 text-center">Memberships</div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-20">
                    {isDataLoading
                        ? Array(4)
                            .fill(null)
                            .map((_, index) => <SkeletonCard key={`license-skeleton-${index}`}/>)
                        : licenses.map((licenseItem) => (
                            <LicenseCard
                                key={licenseItem.license}
                                license={licenseItem.license}
                                name={licenseItem.name}
                                imageSrc={`/shelter.jpg`}
                                community={licenseItem.community}
                                invite={licenseItem.invite}
                                expiration={licenseItem.expiration}
                                onClick={() =>
                                    router.push(`/dashboard/license/${licenseItem.license}`)
                                }
                            />
                        ))}
                </div>
            </div>

            <div className="flex flex-col justify-center items-center px-20 mb-10">
                <div className="select-none w-full">
                    <div className="text-5xl font-bold mb-10 text-center">Ownerships</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-20">
                    {isDataLoading
                        ? Array(4)
                            .fill(null)
                            .map((_, index) => <SkeletonCard key={`community-skeleton-${index}`}/>)
                        : communities.map((communityItem) => (
                            <CommunityCard
                                key={communityItem.api_name}
                                title={communityItem.name}
                                description={communityItem.description}
                                imageSrc={communityItem.logo}
                                onClick={() =>
                                    router.push(`/dashboard/community/${communityItem.api_name}`)
                                }
                            />
                        ))}
                    {!isDataLoading && (
                        <div
                            onClick={showForm}
                            className="min-h-40 min-w-52 bg-[#deeaff] transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:border-gray-300 max-w-64 rounded-3xl flex flex-col p-4 cursor-pointer"
                        >
                            <Image
                                className="square-picture rounded-3xl mb-3 min-w-32 select-none bg-[#ffffff]"
                                src={`/plus.png`}
                                alt={"create"}
                                width={256}
                                height={256}
                                priority
                            />
                            <div
                                className="flex-grow flex items-center justify-center rounded-3xl text-2xl text-center font-bold select-none dark:text-black">
                                Create new community
                            </div>
                        </div>
                    )}
                    <CommunityCreationModal
                        isOpen={visibility}
                        onClose={closeForm}
                    ></CommunityCreationModal>
                </div>
            </div>
        </div>
    );
}