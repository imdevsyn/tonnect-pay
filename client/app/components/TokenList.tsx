import React from "react";
import Image from "next/image";
import { IJettonBalance } from "../types/JettonBalance";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TokenListProps {
  address: string;
  jettons: IJettonBalance[];
}

export function TokenList({ address, jettons }: TokenListProps) {
  const { tonBalance, tonBalanceBRL } = useWalletBalance(address);
  const tokens = [
    {
      name: "Toncoin",
      symbol: "TON",
      image: "/toncoin-icon.png",
      amount: tonBalance,
      priceBRL: tonBalanceBRL,
    },
    ...jettons.map((jetton) => {
      const amount =
        Number(BigInt(jetton.balance)) /
        Math.pow(10, jetton.jetton.decimals || 9);
      return {
        name: jetton.jetton.name,
        symbol: jetton.jetton.symbol,
        image: jetton.jetton.image || "/fallback.png",
        amount,
        priceBRL: amount * jetton.price.prices.BRL,
      };
    }),
  ];

  return (
    <ScrollArea className="h-[400px] rounded-md pt-2">
      <div className="space-y-2 mt-2">
        {tokens.map((token) => {
          return (
            <div
              key={token.symbol}
              className="flex justify-between bg-black/10 rounded-2xl py-2 px-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                  <Image
                    src={token.image || "/fallback.png"}
                    alt={token.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{token.name}</span>
                  <span className="text-sm text-gray-500">
                    {token.amount.toFixed(4)} {token.symbol}
                  </span>
                </div>
              </div>
              <div className="flex items-center font-medium">
                R${token.priceBRL.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
