import React from "react";
import { Send, ScanLine, Key, ArrowUpRight, ArrowUpLeft } from "lucide-react";

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

export function WalletView() {
  return (
    <>
      <div className="mt-4">
        <div>
          <span className="text-lg text-black/45 tracking-tight">
            Saldo Total
          </span>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl tracking-tight">R$ 1.413,04</h1>
            <h2 className="text-black/45 text-base">US$ 255,36</h2>
          </div>
        </div>
        <div className="flex justify-around mt-4 gap-2">
          <button className="flex flex-col items-center justify-center cursor-pointer flex-1 rounded-2xl bg-gray-300">
            <Key />
            <span className="text-sm tracking-tight">Chave</span>
          </button>

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
        <div className="mt-4">
          {tokens.map((token) => (
            <div
              key={token.ticker}
              className="flex justify-between bg-black/10 rounded-2xl mb-1.5 py-2 px-3"
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 bg-blue-900 rounded-full text-center">
                  IMG
                </div>
                <div className="flex flex-col ">
                  <h2>{token.name}</h2>
                  <span>
                    {token.balance} {token.ticker}
                  </span>
                </div>
              </div>
              <div>
                <span>R${token.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
