"use client";
import React from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider manifestUrl="https://tonnect-pay.vercel.app/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
}
