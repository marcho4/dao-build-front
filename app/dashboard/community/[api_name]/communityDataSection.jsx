import {Button} from "@/components/ui/button";


export default function CommunityDataSection({communityData}) {
    return (
        <div
            className="bg-primary text-off-white dark:text-primary dark:bg-off-white bg-blend-darken p-6 rounded-2xl
            shadow select-none space-y-4">
            <h2 className="text-xl font-semibold">Community Details</h2>

            {/* Список характеристик */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                    <dt className="font-semibold">Description:</dt>
                    <dd>{communityData.description ? communityData.description : "You have no description"}</dd>
                </div>

                <div>
                    <dt className="font-semibold">Renewal period:</dt>
                    <dd>{communityData.renewal_period} days</dd>
                </div>

                <div>
                    <dt className="font-semibold">Price per period:</dt>
                    <dd>{communityData.price} USDT</dd>
                </div>

                <div>
                    <dt className="font-semibold">Social:</dt>
                    <dd>{communityData.social === 'tg' ? "Telegram" : "Discord"}</dd>
                </div>

                <div>
                    <dt className="font-semibold">Only for allowed wallets:</dt>
                    <dd>{communityData.need_wl ? "Yes" : "No"}</dd>
                </div>
            </dl>

            <Button className="bg-[#1B1F3B] text-[#F8F8F8] w-full mt-4 mx-0">
                Change community
            </Button>
        </div>
    )
}