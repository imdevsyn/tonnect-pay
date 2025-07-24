"use client";
import { useState } from "react";
import { toNano, Address } from "@ton/core";
import {
  Factory,
  VaultNative,
  PoolType,
  Asset,
  ReadinessStatus,
} from "@dedust/sdk";

// Props: tonClient e sender (wallet do usuário)
export default function SwapButton({
  tonClient,
  sender,
}: {
  tonClient: any;
  sender: {
    address: Address;
    send: (args: {
      to: Address;
      value: bigint;
      body?: any;
    }) => Promise<void>;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSwap = async () => {
    try {
      setLoading(true);
      setStatus("Inicializando...");

      const factory = new Factory(tonClient);
      const TON = Asset.native();
      const DUST = Asset.jetton(
        Address.parse("EQBlqsm144Dq6SjbPI4jjZvA1hqTIP3CvHovbIfW_t-SCALE")
      );

      setStatus("Carregando Vault e Pool...");
      const vault = tonClient.open(await factory.getNativeVault());
      const pool = tonClient.open(
        await factory.getPool(PoolType.VOLATILE, [TON, DUST])
      );

      const vaultReady = await vault.getReadinessStatus();
      const poolReady = await pool.getReadinessStatus();

      if (vaultReady !== ReadinessStatus.READY) {
        throw new Error("Vault TON não pronto.");
      }
      if (poolReady !== ReadinessStatus.READY) {
        throw new Error("Pool TON-DUST não pronto.");
      }

      const amountIn = toNano("1"); // valor de TON que será convertido
      const gasAmount = toNano("0.25");

      setStatus("Enviando swap...");
      await vault.sendSwap(sender, {
        poolAddress: pool.address,
        amount: amountIn,
        gasAmount,
      });

      setStatus("Swap enviado com sucesso!");
    } catch (err: any) {
      console.error(err);
      setStatus("Erro ao enviar swap: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSwap}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {loading ? "Swapping..." : "Trocar 1 TON por DUST"}
      </button>
      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
}
