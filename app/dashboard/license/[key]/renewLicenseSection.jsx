import {Button} from "../../../../components/ui/button";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";




export default function RenewLicenseSection( {connected, handleClick } ) {

    return (
        <div
            className="bg-primary text-off-white dark:text-primary dark:bg-off-white p-6 rounded-2xl shadow select-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                    className="bg-primary text-off-white dark:text-primary dark:bg-off-white p-6 rounded-2xl select-none">
                    <h2 className="text-xl font-semibold mb-6 ">
                        Renew Your License
                    </h2>
                    <Button
                        disabled={!connected}
                        onClick={handleClick}
                        className={`bg-off-white dark:bg-primary w-full p-6 rounded-2xl text-xl font-semibold flex items-center
                            justify-center text-dark-primary dark:text-off-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-green-accent
                            hover:-translate-x-1 mx-0 hover:-translate-y-1 dark:hover:text-primary `}>
                        Pay
                    </Button>
                </div>
                <div className="flex items-start justify-end">
                    <WalletMultiButton/>
                </div>
            </div>
        </div>
    )
}