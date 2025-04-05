import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { AppContextType, OrderBookData } from "../types";
import { Centrifuge } from "centrifuge";
import { BASEURL, initialState } from "../utils/constants";
import { updateData } from "../utils/commonFunctions";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [orderBookData, setOrderBookData] =
    useState<OrderBookData>(initialState);

  const bidsRef = useRef<Map<number, number>>(new Map());
  const asksRef = useRef<Map<number, number>>(new Map());
  const sequenceRef = useRef<number>(0);

  useEffect(() => {
    const centrifuge = new Centrifuge(BASEURL, {
      token: import.meta.env.VITE_TOKEN,
    });
    const channel = `orderbook:BTC-USD`;
    const sub = centrifuge.newSubscription(channel);
    sub.on("publication", (ctx) => {
      if (ctx.data)
        updateData(ctx.data, bidsRef, asksRef, sequenceRef, setOrderBookData);
    });
    sub.subscribe();
    centrifuge.connect();
    return () => {
      sub.unsubscribe();
      centrifuge.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider value={{ orderBookData }}>
      {children}
    </AppContext.Provider>
  );
};
