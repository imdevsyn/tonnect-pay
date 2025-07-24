// global.d.ts
interface TelegramWebApp {
  showScanQrPopup: (params: {
    text: string;
    onSuccess: (qrText: string) => void;
    onError: (error: any) => void;
  }) => void;
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}
