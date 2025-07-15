"use client";
import { useTonConnectUI } from "@tonconnect/ui-react";

export function ConnectButton() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = tonConnectUI.wallet;

  const handleConnect = () => {
    if (wallet) {
      tonConnectUI.disconnect();
    } else {
      tonConnectUI.openModal();
    }
  };

  return (
    <>
      <button
        onClick={handleConnect}
        className="px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {wallet ? "Desconectar" : "Conectar"}
      </button>
    </>
  );
}
