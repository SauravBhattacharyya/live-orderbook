import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { AppContextType, OrderBookData, SortType } from "../types";
import { Centrifuge } from "centrifuge";
import { BASEURL } from "../utils/constants";

export const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: OrderBookData = {
  bids: [],
  asks: [],
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [orderBookData, setOrderBookData] =
    useState<OrderBookData>(initialState);

  const bidsRef = useRef<Map<number, number>>(new Map());
  const asksRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const centrifuge = new Centrifuge(BASEURL, {
      token: import.meta.env.VITE_TOKEN,
    });
    const channel = `orderbook:BTC-USD`;
    const sub = centrifuge.newSubscription(channel);
    sub.on("publication", (ctx) => {
      if (ctx.data) updateData(ctx.data);
    });
    sub.subscribe();
    centrifuge.connect();
    return () => {
      sub.unsubscribe();
      centrifuge.disconnect();
    };
  }, []);

  const updateData = (data: {
    bids: [number, number][];
    asks: [number, number][];
  }) => {
    const bidsData = bidsRef.current;
    const asksData = asksRef.current;

    updateOrderMap(bidsData, data.bids);
    updateOrderMap(asksData, data.asks);

    setOrderBookData({
      bids: sortOrderBookData(bidsData, "desc"),
      asks: sortOrderBookData(asksData, "asc"),
    });
  };

  const updateOrderMap = (
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

  const sortOrderBookData = (
    targetRef: Map<number, number>,
    sortType: SortType
  ) => {
    return Array.from(targetRef.entries()).sort((a, b) =>
      sortType === "desc" ? b[0] - a[0] : a[0] - b[0]
    );
  };

  return (
    <AppContext.Provider value={{ orderBookData }}>
      {children}
    </AppContext.Provider>
  );
};
