export type SortType = "asc" | "desc";
export type OrderBookData = {
  bids: [string, string][];
  asks: [string, string][];
  sequence: number;
};

export interface AppContextType {
  orderBookData: OrderBookData;
}

export interface OrderbookProps {
  orderbook: {
    price: string;
    amount: string;
    total: number;
  }[];
  type: "asks" | "bids";
}
