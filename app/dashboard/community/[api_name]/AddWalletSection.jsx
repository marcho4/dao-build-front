"use client"

import useToast from "../../../../hooks/useToast";
import {useState} from "react";
import {isValidSolanaAddress} from "../../../components/CreateCommunity";

export default function AllowWallet ({ api_name }) {
    const {addToast} = useToast();
    const [text, setText] = useState("");

    const addWalletsRequest = async (wallets) => {
        let url = `http://localhost:8080/api/${api_name}/add_wallets_to_wl`
        try {
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    wallets: wallets
                }),
                credentials: "include",
                headers: {"Content-Type": "application/json"},
            });
            let responseData = await response.json();
            window.location.reload();
        } catch {
            addToast("Error with adding wallets", 'error');
        }
    }

    // Handling change of the text area component
    const handleChange = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    const submitWallets = () => {
        if (text.trim() === "") { // Проверяем, не пуст ли текст
            addToast("You need to enter at least 1 wallet");
            return;
        }

        const wallets = text
            .split("\n")
            .map((wallet) => wallet.trim())
            .filter((wallet) => isValidSolanaAddress(wallet));

        if (wallets.length === 0) {
            addToast("You need to enter at least 1 valid Solana wallet");
            return;
        }

        addWalletsRequest(wallets);
        setText("");
    };

    return (
        <div className="flex flex-col w-full bg-primary dark:bg-off-white text-off-white dark:text-primary
        rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">Allow wallets</h2>
            <textarea className="min-h-20 max-h-40 overflow-auto rounded-xl border-primary border-2 pt-1.5 pl-1.5
            focus:outline-none text-primary"
                      value={text}
                      onChange={handleChange}
                      placeholder={`wallet1\nwallet2\nwallet3`}>
            </textarea>
            <button onClick={submitWallets} className="dark:text-off-white dark:bg-primary text-primary bg-off-white
             hover:bg-green-accent dark:hover:text-primary transition-colors font-semibold w-full mx-0 rounded-2xl mb-0 p-2">
                Add wallets to WL
            </button>
        </div>
    )
}