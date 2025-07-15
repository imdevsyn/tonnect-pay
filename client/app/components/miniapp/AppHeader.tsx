"use client";
import React from "react";
import { ConnectButton } from "../ConnectButton";

export function AppHeader() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-black text-white text-xs rounded-full">
          D
        </div>
        <p className="font-bold tracking-tight">Devsyn Builder</p>
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
}
