"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, LogOut } from "lucide-react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { formatAddress, toUserFriendly } from "../utils/formatAddress";

export function ConnectButton() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
  };

  const handleCopy = () => {
    const fullAddress = toUserFriendly(wallet?.account.address ?? "");
    navigator.clipboard.writeText(fullAddress);
  };

  if (!wallet) {
    return <Button onClick={() => tonConnectUI.openModal()} className="cursor-pointer">Conectar</Button>;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {formatAddress(wallet.account.address)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopy}>
            <Copy />
            Copiar endereço
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDisconnect}>
            <LogOut />
            Desconectar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
