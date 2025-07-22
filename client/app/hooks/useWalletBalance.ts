import axios from "axios";
import { useState, useEffect } from "react";
import { IJettonBalance } from "../types/JettonBalance";
import { toNano, fromNano } from "@ton/core";

export function useWalletBalance(address: string | undefined) {
  const [tonBalance, setTonBalance] = useState<number>(0);
  const [tonBalanceBRL, setTonBalanceBRL] = useState<number>(0);
  const [jettons, setJettons] = useState<IJettonBalance[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [totalBalanceInUSD, setTotalBalanceInUSD] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [
          tonResponse,
          jettonResponse,
          tonPriceInBRLResponse,
          usdPriceResponse,
        ] = await Promise.all([
          axios.get(`https://tonapi.io/v2/accounts/${address}`),
          axios.get(
            `https://tonapi.io/v2/accounts/${address}/jettons?currencies=ton,usd,brl`
          ),
          axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=brl"
          ),
          axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=brl"
          ),
        ]);

        const tonBalanceInNano = BigInt(tonResponse.data.balance);
        const tonPriceInBRL =
          tonPriceInBRLResponse.data["the-open-network"].brl;
        const usdPriceInBRL = usdPriceResponse.data["usd"].brl;

        const tonBalance = Number(tonBalanceInNano) / 1e9;
        const tonBalanceInBRL = tonBalance * tonPriceInBRL;
        setTonBalanceBRL(tonBalanceInBRL);

        const jettonList = jettonResponse.data.balances || [];
        const jettonTotal = jettonList.reduce((acc: number, j: any) => {
          const amount = j.balance / Math.pow(10, j.jetton.decimals || 9);
          const price = j.price?.prices.BRL || 0;
          return acc + amount * price;
        }, 0);

        const balanceInUSD = (tonBalanceInBRL + jettonTotal) / usdPriceInBRL;

        setTonBalance(tonBalance);
        setJettons(jettonList);
        setTotalBalance(tonBalanceInBRL + jettonTotal);
        setTotalBalanceInUSD(balanceInUSD);
      } catch (error) {
        console.log("Error while fetching balance:", error);
      }
    };

    fetch();
  }, [address]);

  return {
    jettons,
    tonBalance,
    tonBalanceBRL,
    totalBalance,
    totalBalanceInUSD,
  };
}
