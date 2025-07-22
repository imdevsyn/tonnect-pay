"use client";
import Link from "next/link";
import { useState } from "react";
import { AppHeader } from "@/app/components/miniapp";
import { ScanLine, Key, ArrowUpRight, ArrowUpLeft } from "lucide-react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useWalletBalance } from "@/app/hooks/useWalletBalance";
import { TokenList } from "@/app/components/TokenList";

const tokens = [
  {
    name: "Tonstakers",
    balance: 560.0,
    ticker: "TST",
    price: "0.50",
    image: "",
  },
  {
    name: "NOT Token",
    balance: 1900.8,
    ticker: "NOT",
    price: "0.014",
    image: "",
  },
  {
    name: "TON Crystal",
    balance: 800.0,
    ticker: "CRYSTAL",
    price: "0.60",
    image: "",
  },
];

export default function Wallet() {
  const wallet = useTonWallet();
  const address = wallet?.account.address;
  const { jettons, tonBalance, totalBalance, totalBalanceInUSD } =
    useWalletBalance(address);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <AppHeader />
      <div className="mt-4">
        <div>
          <span className="text-lg text-black/45 tracking-tight">
            Saldo Total
          </span>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl tracking-tight">
              {isLoading ? (
                <p>Carregando...</p>
              ) : (
                <span>R$ {totalBalance.toFixed(2)}</span>
              )}
            </h1>
            <h2 className="text-black/45 text-base">
              US$ {totalBalanceInUSD.toFixed(2)}
            </h2>
          </div>
        </div>
        <div className="flex justify-around mt-4 gap-2">
          <Link
            href="/mini-app/wallet/key-area"
            className="flex flex-col items-center justify-center cursor-pointer flex-1 rounded-2xl bg-gray-300"
          >
            <Key />
            <span className="text-sm tracking-tight">Chave</span>
          </Link>

          <button className="flex flex-col items-center justify-center cursor-pointer flex-1 rounded-2xl bg-gray-300">
            <ScanLine />
            <span className="text-sm tracking-tight">Pagar</span>
          </button>

          <button className="flex flex-col items-center justify-center cursor-pointer flex-1 rounded-2xl bg-gray-300">
            <ArrowUpRight />
            <span className="text-sm tracking-tight">Enviar</span>
          </button>

          <button className="flex flex-col items-center justify-center cursor-pointer flex-1 h-16 rounded-2xl bg-gray-300">
            <ArrowUpLeft className="rotate-180" />
            <span className="text-sm tracking-tight">Receber</span>
          </button>
        </div>
        <TokenList jettons={jettons} address={`${address}`} />
      </div>
    </>
  );
}
