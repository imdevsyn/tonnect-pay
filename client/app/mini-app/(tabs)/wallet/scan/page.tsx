'use client';

export default function QrScanner() {
  const handleScan = () => {
    if (!window.Telegram?.WebApp?.showScanQrPopup) {
      alert("QR Scan não suportado");
      return;
    }

    window.Telegram.WebApp.showScanQrPopup({
      text: "Scan a QR code",
      onSuccess: (qrText) => {
        console.log("Scanned QR:", qrText);
      },
      onError: (error) => {
        console.error("QR Scan Error:", error);
      },
    });
  };

  return (
    <button onClick={handleScan} className="bg-blue-500 text-white p-4 rounded">
      Escanear QR Code
    </button>
  );
}
