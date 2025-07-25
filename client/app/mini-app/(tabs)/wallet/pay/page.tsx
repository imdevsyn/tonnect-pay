// page.tsx - Solução completa em um arquivo
"use client";
import { useSearchParams } from "next/navigation";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";

// Componente interno que usa useSearchParams
function PayContent() {
  const searchParams = useSearchParams();
  const [tonConnectUI] = useTonConnectUI();
  const [tonToSend, setTonToSend] = useState(0);
  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [tonPrice, setTonPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);

  // Buscar parâmetros da URL
  useEffect(() => {
    if (searchParams) {
      setValue(searchParams.get("amount") || "");
      setToken(searchParams.get("selectValue") || "");
      setAddress(searchParams.get("address") || "");
    }
  }, [searchParams]);

  // Buscar preço do TON
  useEffect(() => {
    async function fetchTonPrice() {
      setPriceLoading(true);
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=brl"
        );
        const data = await res.json();
        const tonPriceBRL = data["the-open-network"]?.brl;

        if (tonPriceBRL) {
          setTonPrice(tonPriceBRL);
        }
      } catch (err) {
        console.error("Erro ao buscar preço do TON:", err);
      } finally {
        setPriceLoading(false);
      }
    }

    fetchTonPrice();

    // Atualizar preço a cada 30 segundos
    const interval = setInterval(fetchTonPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  // Calcular valor em TON sempre que o valor em BRL ou preço mudar
  useEffect(() => {
    if (tonPrice && value) {
      const tonAmount = Number(value) / tonPrice;
      setTonToSend(tonAmount);
    }
  }, [tonPrice, value]);

  async function handleSend() {
    if (!tonConnectUI.account) {
      alert("Conecte sua carteira antes de enviar.");
      return;
    }

    if (!tonPrice) {
      alert("Aguarde o carregamento do preço do TON.");
      return;
    }

    setLoading(true);
    try {
      const nanoTONAmount = BigInt(Math.floor(tonToSend * 1e9)).toString();

      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
          {
            address: address!,
            amount: nanoTONAmount,
          },
        ],
      });

      alert("Transação enviada!");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar transação.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-center">
        <h1 className="mx-auto text-xl font-bold">Confirme o Pagamento</h1>
      </div>
      <div className="flex items-center justify-center">
        <Image src="/payment.png" alt="Payment" width={700} height={700} />
      </div>
      <div>
        <div className="mb-4">
          <div className="flex justify-between px-2 mb-2">
            <p className="text-lg font-bold">Valor:</p>
            <span>
              R$ {value}{" "}
              {priceLoading ? (
                <span className="text-gray-500">
                  {"..."}
                </span>
              ) : (
                `(${tonToSend.toFixed(6)} TON)`
              )}
            </span>
          </div>
          <div className="flex justify-between px-2 mb-2">
            <p className="text-lg font-bold">Token:</p>
            <div>
              {token?.toUpperCase()} <span className="text-black/40">( R$ {tonPrice?.toFixed(2)} )</span>
            </div>
          </div>
          <div className="flex justify-between px-2 mb-2">
            <p className="text-lg font-bold">Destino:</p>
            <span className="truncate max-w-32">{address}</span>
          </div>
        </div>
        <Button
          onClick={handleSend}
          className="w-full h-14 mb-4"
          disabled={loading || !address || !value}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Confirmar transação"
          )}
        </Button>
      </div>
    </div>
  );
}

// Loading skeleton
function PaySkeleton() {
  return (
    <div className="flex flex-col justify-between h-full animate-pulse">
      <div>
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
      </div>
      <div>
        <div className="mb-4 space-y-3">
          <div className="flex justify-between px-2">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="flex justify-between px-2">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex justify-between px-2">
            <div className="h-4 bg-gray-200 rounded w-14"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="w-full h-14 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  );
}

// Componente principal exportado
export default function Pay() {
  return (
    <Suspense fallback={<PaySkeleton />}>
      <PayContent />
    </Suspense>
  );
}
