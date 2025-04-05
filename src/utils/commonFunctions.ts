import { Dispatch, RefObject } from "react";
import { OrderBookData, SortType } from "../types";
import { initialState } from "./constants";

export const updateData = (
  data: {
    bids: [number, number][];
    asks: [number, number][];
    sequence: number;
  },
  bidsRef: RefObject<Map<number, number>>,
  asksRef: RefObject<Map<number, number>>,
  sequenceRef: RefObject<number>,
  setOrderBookData: Dispatch<React.SetStateAction<OrderBookData>>
) => {
  const bidsData = bidsRef.current;
  const asksData = asksRef.current;
  let isSequenceValid = true;
  if (sequenceRef.current === 0) {
    sequenceRef.current = data.sequence;
  } else {
    isSequenceValid = data.sequence === sequenceRef.current + 1;
  }

  if (!isSequenceValid) {
    console.log("Sequence mismatch");
    bidsData.clear();
    asksData.clear();
    setOrderBookData(initialState);
    sequenceRef.current = 0;
  }

  updateOrderMap(bidsData, data.bids);
  updateOrderMap(asksData, data.asks);

  setOrderBookData({
    bids: sortOrderBookData(bidsData, "desc").slice(0, 100),
    asks: sortOrderBookData(asksData, "asc").slice(0, 100),
  });
  sequenceRef.current = data.sequence;
};

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

export const sortOrderBookData = (
  targetRef: Map<number, number>,
  sortType: SortType
) => {
  return Array.from(targetRef.entries()).sort((a, b) =>
    sortType === "desc" ? b[0] - a[0] : a[0] - b[0]
  );
};

export const calculateCumulative = (orders: [number, number][]) => {
  let total = 0;
  return orders.map(([price, amount]) => {
    total += Number(amount);
    return { price, amount, total };
  });
};
