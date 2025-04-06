import { OrderBookData, SortType } from "../types";
import { MAX_LEVELS } from "./constants";

//updates orderbook data, handles sequence validation, data merging, and state update
export const updateData = (
  prev: OrderBookData,
  data: {
    bids: [string, string][];
    asks: [string, string][];
    sequence: number;
  }
) => {
  const newBids = new Map(prev.bids);
  const newAsks = new Map(prev.asks);

  const updatedBids = updateOrderMap(newBids, data.bids);
  const updatedAsks = updateOrderMap(newAsks, data.asks);

  return {
    bids: sortOrderBookData(updatedBids, "desc").slice(0, MAX_LEVELS),
    asks: sortOrderBookData(updatedAsks, "asc").slice(0, MAX_LEVELS),
    sequence: data.sequence,
  };
};

//merges new data with existing orderbook data
export const updateOrderMap = (
  prev: Map<string, string>,
  updates: [string, string][]
) => {
  const map = new Map(prev);
  updates.forEach(([price, amount]) => {
    const decimalFixedPrice = parseFloat(price).toFixed(8);
    if (amount === "0") {
      map.delete(decimalFixedPrice);
    } else {
      map.set(decimalFixedPrice, amount);
    }
  });
  return map;
};

//sorts orderbook data based on price
export const sortOrderBookData = (
  data: Map<string, string>,
  sortType: SortType
) => {
  return [...data].sort((a, b) =>
    sortType === "desc"
      ? Number(b[0]) - Number(a[0])
      : Number(a[0]) - Number(b[0])
  );
};

//depth calculation for price level
export const calculateCumulative = (orders: [string, string][]) => {
  let total = 0;
  return orders.map(([price, amount]) => {
    total += Number(amount);
    return { price, amount, total };
  });
};
