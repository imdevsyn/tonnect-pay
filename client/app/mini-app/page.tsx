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

  return (
    <div className="container mx-auto">
      <div className="max-w-md w-full mx-auto h-full bg-blue-900">
        {onboard != "true" ? <SlideOnboard /> : <div>Mini-app</div>}
      </div>
    </div>
  );
}
