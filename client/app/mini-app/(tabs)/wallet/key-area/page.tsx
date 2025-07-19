import React from "react";
import { Smartphone } from "lucide-react";

export default function KeyArea() {
  return (
    <div className="py-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight mb-1">Minhas chaves</h1>
        <p className="text-description">
          Gerencie suas chaves para receber transferências onchain.
        </p>
      </div>
      <div className="mt-10">
        <h2 className="text-sm text-description">2 chaves</h2>
        <div className="flex mt-2 pt-4 items-center px-2 gap-2 border-t-[1px]">
          <Smartphone className="mr-1" />
          <div>
            <h3 className="font-bold">Celular</h3>
            <p className="text-description">91 99999-9999</p>
          </div>
        </div>
      </div>
    </div>
  );
}
