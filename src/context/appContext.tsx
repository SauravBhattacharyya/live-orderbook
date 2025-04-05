import { createContext, ReactNode, useEffect, useState } from "react";
import { AppContextType, OrderBookData } from "../types";
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

  useEffect(() => {
    const centrifuge = new Centrifuge(BASEURL, {
      token: import.meta.env.VITE_TOKEN,
    });
    const channel = `orderbook:BTC-USD`;
    const sub = centrifuge.newSubscription(channel);
    sub.on("publication", (ctx) => {
      console.log("CTX", ctx.data);
      const { bids, asks } = ctx.data;
      setOrderBookData({ bids, asks });
    });
    sub.subscribe();
    centrifuge.connect();
    return () => {
      centrifuge.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider value={{ orderBookData }}>
      {children}
    </AppContext.Provider>
  );
};
