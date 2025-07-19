import { Address } from "@ton/core";

/**
 * Converte para o exato formato que a Tonkeeper usa
 */
export function toUserFriendly(
  rawAddress: string,
  options: {
    testnet?: boolean;
    urlSafe?: boolean;
    bounceable?: boolean;
  } = {}
): string {
  const { testnet = false, urlSafe = true, bounceable = false } = options;

  try {
    const parsed = Address.parse(rawAddress);
    return parsed.toString({
      testOnly: testnet,
      urlSafe,
      bounceable,
    });
  } catch {
    return rawAddress;
  }
}

/**
 * Abrevia o endereço para exibição
 */
export function shortenAddress(address: string): string {
  return address.slice(0, 4) + "..." + address.slice(-4);
}

/**
 * Junta tudo: converte e encurta
 */
export function formatAddress(raw: string, testnet: boolean = false): string {
  const friendly = toUserFriendly(raw, { testnet });
  return shortenAddress(friendly);
}
