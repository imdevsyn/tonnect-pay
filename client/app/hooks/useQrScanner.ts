"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useQrScanner() {
  const [WebApp, setWebApp] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadWebApp = async () => {
      if (typeof window !== "undefined") {
        const { default: WebAppSDK } = await import("@twa-dev/sdk");
        setWebApp(WebAppSDK);
      }
    };

    loadWebApp();
  }, []);

  const handleScanQr = () => {
    if (!WebApp) {
      console.error("WebApp SDK ainda não carregado");
      return;
    }

    setIsScanning(true);

    WebApp.showScanQrPopup(
      {
        text: "Escaneie o QR",
      },
      (qrCode: string) => {
        setIsScanning(false);
        if (qrCode) {
          try {
            const json = JSON.parse(atob(qrCode));
            const query = new URLSearchParams(json).toString();
            router.push(`/mini-app/wallet/pay?${query}`);
            WebApp.closeScanQrPopup();
          } catch (err) {
            console.error("QR inválido ou malformatado", err);
            alert("QR inválido");
          }
        }
      }
    );
  };

  return { handleScanQr, isScanning };
}
