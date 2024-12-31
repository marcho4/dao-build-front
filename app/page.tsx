"use client";
import Link from "next/link";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen bg-[#739ab9]">
        {/* Hero Section */}
        <header className="rounded-3xl m-10 relative flex items-center justify-center bg-[#113047] text-white py-20 px-8 sm:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-7xl font-extrabold mb-6">
              HOW CONTENT CREATORS MONETIZE THEIR WORK
            </h1>
            <p className="text-xl sm:text-3xl mb-10 max-w-3xl mx-auto">
              dao.build is a single platform to manage & monetize your private communities easily
            </p>
            <Link
                href="/login"
                className="inline-block px-8 py-4 bg-white text-black font-semibold text-lg rounded-md hover:bg-gray-50 transition-colors"
            >
              BECOME INFLUENCER
            </Link>
          </div>
        </header>

        {/* Unlock Potential Section */}
        <main className="flex-grow px-8 sm:px-20 py-16 ">
          <section className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-4xl sm:text-6xl font-bold mb-10">
              Unlock Your Community’s Potential
            </h2>
            <ul className="text-xl sm:text-3xl space-y-4">
              <li>Save your time</li>
              <li>Manage your DAO easily</li>
              <li>Start profiting in 5 minutes</li>
            </ul>
          </section>

          {/* Plans Section */}
          <section className="max-w-4xl mx-auto mt-20 flex flex-col items-center text-center rounded-3xl m-10 bg-[#113047]">
            <h2 className="text-4xl sm:text-6xl font-bold mb-12">OUR PLANS</h2>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="bg-white p-8 rounded-lg shadow-md text-black">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Free Join
                </h3>
                <p className="text-lg sm:text-xl ">
                  10% revenue share (good for newcomers)
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-black">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  Paid Join – $100
                </h3>
                <p className="text-lg sm:text-xl ">
                  5% revenue share (exclusive plan for big whales 🐳)
                </p>
              </div>
            </div>
          </section>
        </main>

      </div>
  );
}