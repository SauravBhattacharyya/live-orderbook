import { OrderBookData, SortType } from "../types";
import { MAX_LEVELS } from "./constants";

//updates orderbook data, handles sequence validation, data merging, and state update
export const updateData = (
  prev: OrderBookData,
  data: {
    bids: [number, number][];
    asks: [number, number][];
    sequence: number;
  }
) => {
  const newBids = new Map(prev.bids);
  const newAsks = new Map(prev.asks);

  updateOrderMap(newBids, data.bids);
  updateOrderMap(newAsks, data.asks);

  return {
    bids: sortOrderBookData(newBids, "desc").slice(0, MAX_LEVELS),
    asks: sortOrderBookData(newAsks, "asc").slice(0, MAX_LEVELS),
    sequence: data.sequence,
  };
};

//merges new data with existing orderbook data
export const updateOrderMap = (
  targetRef: Map<number, number>,
  updates: [number, number][]
) => {
  updates.forEach(([price, amount]) => {
    if (amount === 0) {
      targetRef.delete(price);
    } else {
      targetRef.set(price, amount);
    }
  });
};

//sorts orderbook data based on price
export const sortOrderBookData = (
  targetRef: Map<number, number>,
  sortType: SortType
) => {
  return Array.from(targetRef.entries()).sort((a, b) =>
    sortType === "desc" ? b[0] - a[0] : a[0] - b[0]
  );
};

//depth calculation for price level
export const calculateCumulative = (orders: [number, number][]) => {
  let total = 0;
  return orders.map(([price, amount]) => {
    total += Number(amount);
    return { price, amount, total };
  });
};
