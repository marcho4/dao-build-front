"use client"

import Link from 'next/link';


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col mb-20">
          <div className="text-7xl">WHY US?</div>
          <div className="text-3xl">Our service is very friendly (especially for crypto bros 😎)</div>
          <div className="text-3xl">You don&#39;t need to look after your community - everything is on us!</div>
          <div className="text-3xl">When joining us you support independent devs, not big companies</div>
        </div>
        <div className="flex flex-col mb-20">
          <div className="text-7xl">OUR PLANS</div>
          <div className="text-3xl">Free Join and 10% revenue share (good for newcomers)</div>
          <div className="text-3xl">Paid Join for 100$ and 5% revenue share (exclusive plan for big whales 🐳)</div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mb-20">
          <Link href="/login" className="text-7xl hover:underline">BECOME INFLUENCER</Link>
        </div>
      </main>
    </div>
  );
}