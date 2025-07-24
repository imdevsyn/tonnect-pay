"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

export default function Scan() {
  const qrCodeRegionId = "qr-scanner";
  const [decodedText, setDecodedText] = useState("");
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    const setupScanner = async () => {
      const config = {
        fps: 15,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      const devices = await Html5Qrcode.getCameras();
      const backCamera =
        devices.find(
          (d) =>
            d.label.toLowerCase().includes("back") ||
            d.label.toLowerCase().includes("traseira")
        ) || devices[0];

      if (!backCamera) {
        alert("Nenhuma câmera encontrada");
        return;
      }

      const html5QrCode = new Html5Qrcode(qrCodeRegionId);
      scannerRef.current = html5QrCode;

      html5QrCode
        .start(
          backCamera.id,
          config,
          (decodedText) => {
            setDecodedText(decodedText);
            html5QrCode.stop();
          },
          (error) => {
          }
        )
        .catch((err) => {
          console.error("Erro ao iniciar scanner:", err);
        });
    };

    setupScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current?.clear();
        });
      }
    };
  }, []);

  return (
    <div className="flex pt-5 flex-col items-center justify-between h-full">
      {!decodedText && (
        <div
          id={qrCodeRegionId}
          className="w-[300px] h-[300px] rounded-xl overflow-hidden"
        />
      )}

      {decodedText && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black z-20 p-4">
          <p className="text-lg mb-4 text-white">QR Code detectado:</p>
          <code className="break-all text-sm text-green-400">
            {decodedText}
          </code>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            Escanear Novamente
          </button>
        </div>
      )}
    </div>
  );
}
