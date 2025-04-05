export type OrderBookData = {
  bids: [number, number][];
  asks: [number, number][];
};

export interface AppContextType {
  orderBookData: OrderBookData;
}
