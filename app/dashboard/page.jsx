"use client"

import {useEffect, useState} from "react";
import {CreationForm} from "../components/createCommunity";
import {useAuth} from "../../contexts/authContext";
import { CommunityCard } from "../components/card";
import {LicenseCard} from "../components/licenseCard";

export default function Page() {
    const [visibility, setVisibility] = useState(false);
    const { user, isLoading } = useAuth();

    const [licenses, setLicenses] = useState([]);
    const [communities, setCommunities] = useState([]);


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
        if (!isLoading && user) {
            fetchCommunityData();
            fetchLicenseData();
        }
    }, [user, isLoading]);

    const showForm = () => {
        setVisibility(true);
        fetchLicenseData();
        document.body.style.overflow = "hidden";
    }
    const closeForm = () => {
        setVisibility(false);
        document.body.style.overflow = "auto";
    }


    return (
        <div className="flex flex-col justify-center">
            <div className="pt-10 select-none">
                <div className="text-5xl font-bold mb-20 underline text-center">MEMBERSHIPS</div>
            </div>

            <div className="flex flex-col justify-center items-center px-20">
                <div id="memberships-container" className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-y-12 gap-x-20">
                    {licenses.map((licenseItem) => (
                        <LicenseCard
                            key={licenseItem.name}
                            license={licenseItem.license}
                            name={licenseItem.name}
                            imageSrc={`/shelter.jpg`}
                            community={licenseItem.community}
                            invite={licenseItem.invite}
                            expiration={licenseItem.expiration}
                        />
                    ))}
                </div>
            </div>

            <div className="pt-10 select-none">
                <div className="text-5xl font-bold mb-20 underline text-center">OWNERSHIPS</div>
            </div>
            <div className="flex flex-col justify-center items-center px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-y-12 gap-x-20">
                    {communities.map((communityItem) => (
                        <CommunityCard
                            key={communityItem.api_name}
                            title={communityItem.name}
                            description={communityItem.description}
                            imageSrc={communityItem.logo}
                        />
                    ))}
                    <CommunityCard title="Create" description="" imageSrc={`/plus.png`} onClick={showForm}/>
                    <CreationForm isOpen={visibility} onClose={closeForm}></CreationForm>
                </div>
            </div>
        </div>
    );
};