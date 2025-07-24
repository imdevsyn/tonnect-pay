"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import QRCode from "react-qr-code";
import Image from "next/image";
import Link from "next/link";
import { toUserFriendly } from "@/app/utils/formatAddress";

const tokens = [
  {
    value: "ton",
    label: "TON",
    image: "/toncoin-icon.png",
  },
  {
    value: "usde",
    label: "USDe",
    image:
      "https://cache.tonapi.io/imgproxy/VeuD6Bx5AEpyD0bUUvLl72LLiSUwVLCrQG6hBPmXu74/rs:fill:200:200:1/g:no/aHR0cHM6Ly9ldGhlbmEuZmkvc2hhcmVkL3VzZGUucG5n.webp",
  },
  {
    value: "usdt",
    label: "USDT",
    image:
      "https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp",
  },
];

export default function Receive() {
  const [rawValue, setRawValue] = useState("0");
  const [formatted, setFormatted] = useState("R$ 0,00");
  const [selectValue, setSelectValue] = useState<string>("ton");
  const [copied, setCopied] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState<{
    token: string;
    value: string;
    address: string | undefined;
  } | null>();
  const wallet = useTonWallet();
  const address = wallet?.account.address;

  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(50);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    const safeValue = value === "" ? "0" : value;

    setRawValue(safeValue);

    const asNumber = Number(safeValue) / 100;
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(asNumber);

    setFormatted(formattedValue);
  };

  const handleCopy = () => {
    const fullAddress = toUserFriendly(wallet?.account.address ?? "");
    if (address) {
      navigator.clipboard.writeText(fullAddress);
      setCopied(true);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "TonnectPay | Micropagamentos",
          text: "Pagamentos descentralizados com a segurança da TON Blockchain.",
          url: window.location.href,
        });
        console.log("Compartilhado com sucesso!");
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      alert("O compartilhamento não é suportado neste navegador.");
    }
  };

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 10);
    }
  }, [formatted]);

  useEffect(() => {
    setQrCodeData({ token: selectValue, value: formatted, address: address });
  }, [selectValue, formatted, address]);

  return (
    <div className="h-full flex flex-col overflow-x-clip">
      <div className="flex flex-col h-full items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/mini-app/wallet/"
            className="flex items-center justify-center w-10 h-10 bg-black/10 rounded-full"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-center">Informe o valor a receber</h1>
          <span></span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-3">
            <input
              className="font-semibold text-4xl text-center border-none outline-none bg-transparent"
              placeholder="0.00"
              type="text"
              value={formatted}
              onChange={handleChange}
              style={{ width: `${inputWidth}px` }}
            />
            <span
              ref={spanRef}
              className="absolute top-0 left-[-9999px] text-4xl font-semibold"
            >
              {formatted}
            </span>
          </div>
          <Select
            defaultValue="ton"
            onValueChange={(value) => setSelectValue(value)}
          >
            <SelectTrigger className="flex justify-center w-[100px] [&>svg]:hidden rounded-4xl shadow-blue-100 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="center">
              {tokens.map((token) => (
                <SelectItem
                  key={token.value}
                  value={token.value}
                  className="cursor-pointer"
                >
                  <Image
                    src={token.image}
                    alt={token.label}
                    width={20}
                    height={20}
                  />
                  {token.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full pb-6">
          <Drawer>
            <DrawerTrigger className="h-12 mt-auto w-full bg-black text-white rounded-lg cursor-pointer">
              Criar QR Code
            </DrawerTrigger>
            <DrawerContent className="flex h-[80%]">
              <DrawerHeader className="flex text-start">
                <DrawerTitle className="text-start font-bold text-3xl tracking-tight">
                  Micropagamentos nunca foi tão fácil!
                </DrawerTitle>
                <DrawerDescription className="text-lg tracking-tight text-start">
                  Abra o TonnectPay, escaneia o QR Code abaixo e confirme a
                  transação.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex justify-center my-auto">
                <QRCode
                  size={160}
                  value={JSON.stringify(qrCodeData)}
                  className="border-2 p-4 rounded-2xl"
                />
              </div>
              <DrawerFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopy}
                >
                  Copiar endereço{" "}
                  {copied ? <Check className="text-green-700" /> : <Copy />}
                </Button>
                <Button onClick={handleShare}>Compartilhar QR Code</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
