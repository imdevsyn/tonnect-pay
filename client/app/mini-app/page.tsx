"use client";
import { useState, useEffect } from "react";
import { SlideOnboard } from "../components/SlideOnboard";

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
    <div className="container mx-auto">
      <div className="max-w-md w-full mx-auto h-full bg-blue-900">
        <header>
          <span>image</span>
          <button>wallet</button>
        </header>
        <div>
          <p>R$16.15</p>
          <button onClick={clearStorage} className="bg-amber-400">clear storage</button>
        </div>
      </div>
    </div>
  );
}
