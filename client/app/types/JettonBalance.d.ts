export interface IJettonBalance {
  balance: string;
  price: {
    prices: {
      BRL: number;
      TON: number;
      USD: number;
    };
  };
  jetton: {
    name: string;
    symbol: string;
    decimals: number;
    image: string;
  };
}
