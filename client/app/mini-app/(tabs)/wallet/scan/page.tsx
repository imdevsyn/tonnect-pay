"use client"
import React from "react";
import { qrScanner } from "@telegram-apps/sdk";

export default function Scan() {
  const handleScan = () => {
    qrScanner.open().then((content) => {
      console.log(content);
    });
    console.log(qrScanner.isOpened);
  };
  return (
    <div>
      <button onClick={handleScan}>OPEN SCAN</button>
    </div>
  );
}
