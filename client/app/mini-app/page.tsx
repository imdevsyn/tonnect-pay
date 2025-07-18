"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MiniAppRoot() {
  const router = useRouter();
  const [onboarding, setOnboarding] = useState<string | null>(null);

  useEffect(() => {
    const onboard_status = localStorage.getItem("user_onboarded");
    setOnboarding(onboard_status);
  }, []);

  useEffect(() => {
    if (onboarding === null) return router.push("/mini-app/onboarding");

    if (onboarding === "true") {
      router.push("/mini-app/wallet");
    } else {
      router.push("/mini-app/onboarding");
    }
  }, [onboarding]);

  return null;
}
