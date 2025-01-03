"use client";
import Link from "next/link";
import {FAQItem} from "@/app/components/FAQItem";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
        {/* Main Section */}
        <header
            className="rounded-3xl border-2 border-black m-10 relative flex items-center justify-center bg-gradient-to-bl from-[#1B1F3B] to-[#1B1F3B] text-white py-20 px-8 sm:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-7xl font-extrabold mb-6">
              HOW CONTENT CREATORS MONETIZE THEIR WORK
            </h1>
            <p className="text-xl sm:text-3xl mb-10 max-w-3xl mx-auto">
              dao.build is a single platform to manage & monetize your private communities easily
            </p>
            <Link
                href="/login"
                className="inline-block px-8 py-4 bg-white text-black
                font-semibold text-lg rounded-md hover:bg-[#C2E812]  transition-colors"
            >
              Create community for free now
            </Link>
          </div>
        </header>


        <main className="flex-grow px-8 sm:px-20 py-16">
          {/* Unlock Potential Section */}
          <section className="max-w-6xl mx-auto flex flex-col items-center text-center mb-10">
            <h2 className="max-w-5xl text-4xl sm:text-6xl font-bold mb-10 select-none">
              Unlock Your Community’s Potential
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 select-none">
              <div
                  className="bg-gradient-to-tr from-[#C9DDFF] to-[#C9DDFF] border-t border-l border-b-4 border-r-4 border-gray-700 w-full h-60 p-6 rounded-2xl text-3xl font-semibold flex items-center justify-center">
                Save your time
              </div>
              <div
                  className="bg-gradient-to-br from-[#C9DDFF] to-[#C9DDFF] border-t border-l border-b-4 border-r-4 border-gray-700
                  w-full h-60 p-6 rounded-2xl text-3xl font-semibold flex items-center justify-center">
                Manage your DAO easily
              </div>
              <div
                  className="bg-gradient-to-tr from-[#C9DDFF] to-[#C9DDFF]  border-t border-l border-b-4 border-r-4 border-gray-700 w-full h-60 p-6 rounded-2xl text-3xl font-semibold flex items-center justify-center">
                Keep things organized
              </div>
            </div>
          </section>

          {/* How it works section */}
          <section
              className="mx-auto border-2 border-black p-10 min-h-96 mt-20 flex flex-col items-center justify-center
              text-center rounded-3xl m-10 bg-[#1B1F3B]">
            <h2 className="text-4xl sm:text-6xl font-bold mb-16 text-white select-none">
              Lacking time to grow?
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 select-none px-6 lg:px-20">
              <div
                  className=" w-full h-auto p-8 rounded-2xl text-lg sm:text-xl text-white font-medium flex items-center justify-center">
                <p className="leading-relaxed text-center font-semibold">
                  You are a DAO owner who needs to save more time for meaningful work
                </p>
              </div>
              <div
                  className=" w-full h-auto p-8 rounded-2xl text-lg sm:text-xl text-white font-medium flex items-center justify-center ">
                <p className="leading-relaxed text-center font-semibold">
                  Some members don’t pay you in time, you can’t track everything related to your DAO, and there will be
                  a lot of mess
                </p>
              </div>
              <div
                  className="w-full h-auto p-8 rounded-2xl text-lg sm:text-xl text-white font-medium flex items-center justify-center ">
                <p className="leading-relaxed text-center font-semibold">
                  By using our platform, you make it easy for your members to join and for you to monetize without
                  spending any time on managing
                </p>
              </div>
            </div>
          </section>


          {/* Plans Section */}
          <section
              className="mx-auto min-h-96 pb-7 mt-20 flex flex-col items-center justify-center text-center rounded-3xl">
            <h2 className="text-4xl sm:text-6xl font-bold mb-12 ">Our plans</h2>
            <div className="grid lg:grid-cols-2 gap-20 select-none max-w-5xl w-full">
              <div
                  className="bg-[#252AD0] border-t border-l border-b-4 border-r-4 border-gray-700
                  text-white min-w-full h-60 p-6 rounded-2xl text-3xl font-semibold flex flex-col items-center justify-center">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Free Join
                </h3>
                <p className="text-lg sm:text-xl ">
                  free creation<br/>10% revenue share <br/>good for newcomers
                </p>
              </div>
              <div
                  className="bg-[#252AD0] border-t border-l border-b-4 border-r-4 border-black
                  text-white w-full h-60 p-6 rounded-2xl text-3xl font-semibold flex flex-col items-center justify-center">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Paid Join
                </h3>
                <p className="text-lg sm:text-xl ">
                  One-time payment 99$ <br/>
                  5% revenue share <br/>exclusive plan for big whales 🐳<br/>
                </p>
              </div>
            </div>

          </section>

          {/* FAQ section */}
          <section className="mx-auto p-10 min-h-96 mt-20 rounded-3xl flex flex-col items-center text-center
           bg-[#1B1F3B] border-2 border-black mb-20">
            <h2 className="max-w-5xl text-4xl text-white sm:text-6xl font-bold mb-10 select-none">
              Got any questions?
            </h2>
            <div className="flex flex-col justify-center items-center lg:w-3/5">
              <FAQItem
                  question="How many communities can i create for free?"
                  answer="You can create 1 community for free now"
              />
              <FAQItem
                  question="What social networks do you support?"
                  answer="Currently we support Discord and Telegram"
              />
              <FAQItem
                  question="What do I need to create an account?"
                  answer="Only your phantom wallet"
              />
            </div>

          </section>

          {/* Convert section */}
          <section className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <h2 className="max-w-5xl text-4xl sm:text-6xl font-bold mb-10 select-none">
              Start saving time and earning more money with us!
            </h2>

            <Link href="/login">
              <div
                  className="bg-gradient-to-tr from-[#C2E812] to-[#C2E812] border-t border-l border-b-4 border-r-4 border-gray-700 w-full h-40 p-6 rounded-2xl text-3xl font-semibold flex items-center justify-center">
                Create account in 2 clicks
              </div>
            </Link>

          </section>
        </main>

      </div>
  );
}