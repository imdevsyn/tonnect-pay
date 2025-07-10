"use client";
import { useState, useEffect } from "react";
import { SlideOnboard } from "../components/SlideOnboard";
import { AppTabs, AppHeader } from "../components/miniapp";

export default function MiniApp() {
  const [onboard, setOnboardSeen] = useState("");

  useEffect(() => {
    const onboard_status: string | null =
      localStorage.getItem("onboarding_seen");
    console.log(onboard_status);
    setOnboardSeen(onboard_status ?? "");
  }, []);

  if (onboard !== "true") {
    return (
      <div className="container mx-auto">
        <div className="max-w-md w-full mx-auto h-full bg-blue-900">
          <SlideOnboard />
        </div>
      </div>
    );
  }

  const clearStorage = () => {
    localStorage.removeItem("onboarding_seen");
  };

  return (
    <div className="container flex justify-center items-center mx-auto h-screen">
      <div className="max-h-[1024px] h-full max-w-md w-full flex flex-col mx-auto px-4 pt-5">
        <header>
          <AppHeader />
        </header>
        <main className="h-full bg-gray-200">
          <button
            onClick={clearStorage}
            className="bg-amber-400 w-24 h-10 rounded-3xl"
          >
            clear
          </button>
        </main>
        <div className="mt-auto pb-6">
          <div className="flex justify-around">
            <AppTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
