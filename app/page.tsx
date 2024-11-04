"use client"

import {Header} from "@/app/components/header";
import {Footer} from "@/app/components/footer";
import {CreationForm} from "@/app/components/createCommunity"
import { useState } from "react";

export default function Home() {
  const [visibility, setVisibility] = useState(false);
  
  const showForm = () => {
    setVisibility(true);
    document.body.style.overflow = "hidden"; 
  }
  const closeForm = () => {
    setVisibility(false);
    document.body.style.overflow = "auto"; 
  }

  return (
    <>
    <Header/>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={showForm} className="bg-red-500">Create Community</button>
        <CreationForm isOpen={visibility} onClose={closeForm}></CreationForm>
      </main>
    </div>
    <Footer/>
    </>
  );
}