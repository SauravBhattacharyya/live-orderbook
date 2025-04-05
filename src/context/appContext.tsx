import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { AppContextType, OrderBookData } from "../types";
import { Centrifuge } from "centrifuge";
import { BASEURL, initialState } from "../utils/constants";
import { updateData } from "../utils/commonFunctions";

//global context to store orderbook data received from websocket
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  //store final bids and asks array
  const [orderBookData, setOrderBookData] =
    useState<OrderBookData>(initialState);

  //to store raw orderbook data for bids, asks and latest sequence number received
  const bidsRef = useRef<Map<number, number>>(new Map());
  const asksRef = useRef<Map<number, number>>(new Map());
  const sequenceRef = useRef<number>(0);

  useEffect(() => {
    //initialize Centrifuge websocket connection
    const centrifuge = new Centrifuge(BASEURL, {
      token: import.meta.env.VITE_TOKEN,
    });
    const channel = `orderbook:BTC-USD`;
    //subscribe to channel
    const sub = centrifuge.newSubscription(channel);
    //on receiving new update, process the data to store orderbook and refs
    sub.on("publication", (ctx) => {
      if (ctx.data)
        updateData(ctx.data, bidsRef, asksRef, sequenceRef, setOrderBookData);
    });
    //start the subscription and connect to websocket
    sub.subscribe();
    centrifuge.connect();
    //cleanup function
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
