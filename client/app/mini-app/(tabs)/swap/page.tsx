"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Wallet, TrendingUp, DollarSign } from "lucide-react";
import Image from "next/image";

// Definição de tipos
interface Token {
  symbol: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  price: number;
}

type TokenSymbol = "USDT" | "TON" | "USDE";

const tokens: Token[] = [
  {
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp",
    color: "text-green-600",
    bgColor: "bg-green-50",
    price: 1.0,
  },
  {
    symbol: "TON",
    name: "Toncoin",
    icon: "/toncoin-icon.png",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    price: 2.45,
  },
  {
    symbol: "USDE",
    name: "USDe",
    icon: "https://cache.tonapi.io/imgproxy/VeuD6Bx5AEpyD0bUUvLl72LLiSUwVLCrQG6hBPmXu74/rs:fill:200:200:1/g:no/aHR0cHM6Ly9ldGhlbmEuZmkvc2hhcmVkL3VzZGUucG5n.webp",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    price: 1.0,
  },
];

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState<TokenSymbol>("USDT");
  const [toToken, setToToken] = useState<TokenSymbol>("TON");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isSwapping, setIsSwapping] = useState<boolean>(false);

  const getTokenData = (symbol: TokenSymbol): Token => {
    const token = tokens.find((token) => token.symbol === symbol);
    if (!token) {
      throw new Error(`Token ${symbol} não encontrado`);
    }
    return token;
  };

  const calculateSwap = (
    amount: string,
    from: TokenSymbol,
    to: TokenSymbol
  ): string => {
    if (!amount || isNaN(Number(amount))) return "";
    const fromTokenData = getTokenData(from);
    const toTokenData = getTokenData(to);
    const result =
      (parseFloat(amount) * fromTokenData.price) / toTokenData.price;
    return result.toFixed(6);
  };

  const handleFromAmountChange = (value: string): void => {
    setFromAmount(value);
    setToAmount(calculateSwap(value, fromToken, toToken));
  };

  const handleToAmountChange = (value: string): void => {
    setToAmount(value);
    setFromAmount(calculateSwap(value, toToken, fromToken));
  };

  const handleSwapTokens = (): void => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async (): Promise<void> => {
    setIsSwapping(true);
    // Simular processo de swap
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSwapping(false);
    // Reset form
    setFromAmount("");
    setToAmount("");
  };

  const handleFromTokenChange = (value: string): void => {
    const newToken = value as TokenSymbol;
    setFromToken(newToken);
    if (fromAmount) {
      setToAmount(calculateSwap(fromAmount, newToken, toToken));
    }
  };

  const handleToTokenChange = (value: string): void => {
    const newToken = value as TokenSymbol;
    setToToken(newToken);
    if (fromAmount) {
      setToAmount(calculateSwap(fromAmount, fromToken, newToken));
    }
  };

  const fromTokenData = getTokenData(fromToken);
  const toTokenData = getTokenData(toToken);

  const isSwapDisabled =
    !fromAmount || !toAmount || isSwapping || fromToken === toToken;

  return (
    <div className="h-full w-full">
      <div className="w-full mx-auto pt-20">
        <Card className="shadow-none outline-none border-none">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Wallet className="w-5 h-5" />
              Swap de Tokens
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* From Token */}
            <div className="space-y-0">
              <label className="text-sm font-medium text-gray-700">De</label>
              <div className="relative">
                <div className="flex gap-1">
                  <Select
                    value={fromToken}
                    onValueChange={handleFromTokenChange}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={token.icon}
                              alt="Token Icon"
                              width={20}
                              height={20}
                              className="text-lg"
                            />
                            <span>{token.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                    className="flex-1 text-right text-lg font-semibold"
                  />
                </div>

                <div className="flex items-center justify-between mt-2 px-1">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${fromTokenData.bgColor}`}
                  >
                    <span
                      className={`text-xs font-medium ${fromTokenData.color}`}
                    >
                      {fromTokenData.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ${fromTokenData.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center py-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapTokens}
                className="rounded-full p-2 transition-all duration-200"
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>

            {/* To Token */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Para</label>
              <div className="relative">
                <div className="flex gap-2">
                  <Select value={toToken} onValueChange={handleToTokenChange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={token.icon}
                              alt="Token icon"
                              width={20}
                              height={20}
                              className="text-lg"
                            />
                            <span>{token.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="0.00"
                    value={toAmount}
                    onChange={(e) => handleToAmountChange(e.target.value)}
                    className="flex-1 text-right text-lg font-semibold"
                  />
                </div>

                <div className="flex items-center justify-between mt-2 px-1">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full ${toTokenData.bgColor}`}
                  >
                    <span
                      className={`text-xs font-medium ${toTokenData.color}`}
                    >
                      {toTokenData.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ${toTokenData.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Exchange Rate */}
            {fromAmount && toAmount && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Taxa de câmbio</span>
                </div>
                <div className="text-sm font-medium">
                  1 {fromToken} ={" "}
                  {(toTokenData.price / fromTokenData.price).toFixed(6)}{" "}
                  {toToken}
                </div>
              </div>
            )}

            {/* Swap Button */}
            <Button
              onClick={handleSwap}
              className="w-full h-12 text-lg font-semibold !bg-black"
            >
              {isSwapping ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin"></div>
                  Processando...
                </div>
              ) : (
                <div className="flex items-center gap-2 ">Swap</div>
              )}
            </Button>

            {/* Disclaimer */}
          </CardContent>
        </Card>
        <div className="text-xs text-gray-500 text-center mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200 w-52 mx-auto">
          ⚠️ Swap de tokens em desenvolvimento.
        </div>
      </div>
    </div>
  );
}
