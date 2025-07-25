import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GalleryVerticalEnd, Mic, UploadCloud } from "lucide-react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Link from "next/link";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <>
      <div className="h-full flex flex-col pb-6">
        <div className="flex-grow py-24 lg:py-32  flex flex-col justify-center">
          <div className="mt-0 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex justify-center items-center">
              <Link
                href="#"
                className="flex items-center gap-2 self-center font-medium"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
                  <Image
                    src="/logo-black.svg"
                    alt="TonnectPay Logo"
                    width={30}
                    height={30}
                  />
                </div>
                TonnectPay
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-primary sm:text-4xl">
              Conheça seu agente de pagamentos na TON Blockchain.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Seu copiloto com IA para a web3.
            </p>
          </div>

          <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Input
                type="text"
                className="p-4 text-sm block h-10 w-full rounded-full"
                placeholder="Envie 3 TON coins para @joao..."
              />
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                <Button size="sm" variant="ghost" className="rounded-full">
                  <UploadCloud className="shrink-0 w-6 h-6" />
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full">
                  <Mic className="shrink-0 w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
