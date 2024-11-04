import React from "react";
import styles from "./Modal.module.css";

export function CreationForm( { isOpen, onClose }) {
    if (!isOpen) return null;

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const community = Object.fromEntries(formData.entries());
        community.logo = "/" + community.api_name
        community.renewal_period = Number(community.renewal_period)
        community.need_wl = community.need_wl === "true";
        community.allowed_wallets = [];

        fetch("http://127.0.0.1:8000/community/create", {
            method: "POST",
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
                <h2 className="text-2xl text-black font-semibold mb-4 text-center">Create Your Community</h2>
                <form onSubmit={submitForm}>
                    <div className="text-black">
                        Enter your community&#39;s name
                    </div>
                    <input type="text" name="name"
                           className="bg-white text-black rounded-none border border-red-500"/>
                    <div className="text-black">
                        Enter description (Optional)
                    </div>
                    <input type="text" name="description" className="bg-white text-black rounded-none border border-red-500"/>
                    <div className="text-black">
                        Enter your main wallet for collecting funds
                    </div>
                    <input type="text" name="owners_wallet"
                           className="bg-white text-black rounded-none border border-red-500"/>
                    <div className="text-black">Enter Social platform (Telegram or Discord)</div>
                    <select id="social" name="social" className="bg-white text-black">
                        <option value="tg">Telegram</option>
                        <option value="ds">Discord</option>
                    </select>
                    <div className="text-black">Enter your group&#39;s ID</div>
                    <input type="text" name="group_id"
                           className="bg-white text-black rounded-none border border-red-500"/>
                    <div className="text-black">Enter renewal period in days</div>
                    <input type="text" name="renewal_period"
                           className="bg-white text-black rounded-none border border-red-500"/>
                    <div className="text-black">Enter your email</div>
                    <input type="text" name="owners_email"
                           className="bg-white text-black rounded-none border border-red-500"/>
                    <div className="text-black">Enable payments only for allowed wallets?</div>
                    <select id="choices" name="need_wl" className="bg-white text-black">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <div className="text-black">Choose your plan</div>
                    <select id="choices" name="plan" className="bg-white text-black">
                        <option value="Option 1">Free Creation + 10% fee</option>
                        <option value="Option 2">Paid Creation (100$) + 5% fee</option>
                    </select>
                    <button id="communityCreationButton" type="submit"
                            className="text-black text-semibold bg-red-500">Submit Community
                        creation
                    </button>
                </form>
            </div>
        </div>
    );
}
