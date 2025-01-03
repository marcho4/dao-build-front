"use client"

import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../contexts/authContext";
import Link from "next/link";


export default function Page() {
    const { key} = useParams();
    const [ licenseData, setLicenseData ] = useState(null);
    const [ fetchingData, setFetch ] = useState(true);
    const { isLoading } = useAuth()


    useEffect(() => {
        setFetch(true);
        const fetchLicense = async (key) => {
            const response = await fetch("http://localhost:8001/license/get/" + key,
                {
                    method: "GET",
                    credentials: "include",
                });
            let obj = await response.json();
            let date = new Date(obj.data.expiration);

            obj.data.endDay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            obj.data.endTime = `${date.getHours()}:${date.getMinutes()}`;
            setLicenseData(obj.data);
            setFetch(false);

            console.log(obj.data);
        }
        if (key) {
            fetchLicense(key);
        }
    }, [key]);

    if (isLoading || fetchingData) {
        return <p>Loading...</p>;
    }
    return (
        <div className="p-8 bg-[#F8F8F8]">
            <h1 className="bg-white text-2xl shadow font-bold w-full mb-8 text-center rounded-2xl py-2">
                License in {licenseData.community}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* License Details section */}
                <div className=" bg-white p-6 rounded-2xl shadow select-none">
                    <h2 className="text-xl font-semibold mb-4 ">License Details</h2>
                    <p className=""><span className="font-semibold">License key:</span> {licenseData.license}
                    </p>
                    <p className=""><span
                        className="font-semibold">End Date: </span>
                        {licenseData.endDay + " " + licenseData.endTime}
                    </p>
                    <p className="">
                        <span className="font-semibold">Price per period:</span> {}
                    </p>
                    <p className="">
                        <span
                            className="font-semibold">Activated:</span> {licenseData.activated ? "True" : "False"}
                    </p>
                    {licenseData.invite !== "" ? (
                            <p className="">
                                <span className="font-semibold">Invite:</span>
                                <Link className="hover:text-[#7034ff]"
                                      href={`https://` + licenseData.invite}> {licenseData.invite}</Link>
                            </p>)
                        :
                        (<p className=""></p>)}


                </div>

                {/* License Details section */}
                <div className=" bg-white p-6 rounded-2xl shadow select-none">
                    <div className="text-center">About community</div>
                    {/*<Image src={`${licenseData.communtity}.png`} alt={"logo"} width={256} height={256}></Image>*/}
                </div>
            </div>
        </div>
    )
}