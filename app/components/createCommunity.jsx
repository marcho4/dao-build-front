import React from "react";
import styles from "./Modal.module.css";
import {Button} from "@/components/ui/button";

export function CreationForm( { isOpen, onClose }) {
    if (!isOpen) return null;

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const community = Object.fromEntries(formData.entries());
        community.logo = "/" + community.api_name + ".png"
        community.renewal_period = Number(community.renewal_period)
        community.need_wl = community.need_wl === "true";
        community.allowed_wallets = [];

        fetch("http://127.0.0.1:8000/api/community/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(community),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
        console.log(community);
        onClose();
    };

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose}>
            <div className={`${styles.modal} ${isOpen ? styles.open : ""}`} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2 className="text-2xl text-[#fbf0d8] font-semibold mb-4 text-center">Create Your Community</h2>
                <form onSubmit={submitForm}>

                    <div className="text-[#fbf0d8] ml-2 mb-1">
                        Enter your community&#39;s name
                    </div>
                    <input type="text" name="name"
                           className="bg-[#739ab9] text-black pl-3 focus:outline-0
                           rounded-2xl border-2 border-[#b02a29] w-[300px] h-[25px] mb-3"/>

                    <div className="text-[#fbf0d8] ml-2 mb-1">
                        Enter description (Optional)
                    </div>
                    <input type="text" name="description"
                           className="bg-[#739ab9] text-black pl-3 focus:outline-0
                           rounded-2xl border-2 border-[#b02a29] w-[300px] h-[25px] mb-3"/>

                    <div className="text-[#fbf0d8] ml-2 mb-1">
                        Enter your main wallet for collecting funds
                    </div>
                    <input type="text" name="owners_wallet"
                           className="bg-[#739ab9] text-black text-xs rounded-3xl border-2 pl-3 focus:outline-0 border-[#b02a29] w-[300px] h-[25px] mb-3 "/>

                    <div className="text-[#fbf0d8] ml-2 mb-1">Choose Social</div>
                    <select id="social" name="social" className="bg-[#739ab9] text-black rounded-3xl border-2 pl-3 focus:outline-0 border-[#b02a29] h-[25px] w-[300px] mb-3">
                        <option value="tg">Telegram</option>
                        <option value="ds">Discord</option>
                    </select>

                    <div className="text-[#fbf0d8]">Enter renewal period in days</div>
                    <input type="text" name="renewal_period"
                           className="bg-[#739ab9] text-black rounded-3xl border-2 pl-3 focus:outline-0 border-[#b02a29] w-[200px] h-[25px] mb-3"/>

                    <div className="text-[#fbf0d8]">Enter your email</div>
                    <input type="text" name="owners_email"
                           className="bg-[#739ab9] text-black rounded-3xl border-2 pl-3 focus:outline-0 border-[#b02a29] w-[200px] h-[25px] mb-3"/>

                    <div className="text-[#fbf0d8]">Enable payments only for allowed wallets?</div>
                    <select id="choices" name="need_wl" className="bg-[#739ab9] text-black rounded-3xl border-2 pl-3 focus:outline-0 h-[25px] border-[#b02a29] w-[300px] mb-3">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    <div className="text-[#fbf0d8]">Choose your plan</div>
                    <select id="choices" name="plan" className="bg-[#739ab9] text-black rounded-3xl border-2 pl-3 focus:outline-0 h-[25px] border-[#b02a29] w-[300px] mb-3">
                        <option value="Option 1">Free Creation + 10% fee</option>
                        <option value="Option 2">Paid Creation (100$) + 5% fee</option>
                    </select>

                    <Button id="communityCreationButton" type="submit"
                            className="text-[#fbf0d8] hover:text-[#fbf0d8] text-semibold text-xl bg-[#b02a29] rounded-2xl">Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}
