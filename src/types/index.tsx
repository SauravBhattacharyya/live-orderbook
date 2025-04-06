export type SortType = "asc" | "desc";
export type OrderBookData = {
  bids: [number, number][];
  asks: [number, number][];
  sequence: number;
};

export interface AppContextType {
  orderBookData: OrderBookData;
}

export interface OrderbookProps {
  orderbook: {
    price: number;
    amount: number;
    total: number;
  }[];
  type: "asks" | "bids";
}
