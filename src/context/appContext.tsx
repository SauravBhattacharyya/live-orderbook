import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { AppContextType, OrderBookData } from "../types";
import { Centrifuge } from "centrifuge";
import { BASEURL, initialState, MAX_LEVELS } from "../utils/constants";
import { updateData } from "../utils/commonFunctions";

//global context to store orderbook data received from websocket
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  //store final bids and asks array
  const [orderBookData, setOrderBookData] =
    useState<OrderBookData>(initialState);

  // useEffect(() => {
  //   //initialize Centrifuge websocket connection
  //   const centrifuge = new Centrifuge(BASEURL, {
  //     token: import.meta.env.VITE_TOKEN,
  //   });
  //   const channel = `orderbook:BTC-USD`;
  //   //subscribe to channel
  //   const sub = centrifuge.newSubscription(channel);
  //   //on receiving new update, process the data to store orderbook and refs
  //   sub.on("publication", async (ctx) => {
  //     if (!ctx.data) return;
  //     const initialSequence = orderBookData.sequence === 0;
  //     const isSequenceValid =
  //       initialSequence || ctx.data.sequence === orderBookData.sequence + 1;
  //     if (!isSequenceValid) {
  //       // console.log("Sequence mismatch - fetching data from history");
  //       try {
  //         const history = await sub.history({ limit: MAX_LEVELS });
  //         history.publications.forEach((pub) => {
  //           setOrderBookData((prev) => updateData(prev, pub.data));
  //         });
  //       } catch (error) {
  //         console.error("Failed to fetch history", error);
  //         setOrderBookData(initialState);
  //       }
  //       return;
  //     }
  //     setOrderBookData((prev) => updateData(prev, ctx.data));
  //   });
  //   //start the subscription and connect to websocket
  //   sub.subscribe();
  //   centrifuge.connect();
  //   //cleanup function
  //   return () => {
  //     sub.unsubscribe();
  //     centrifuge.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const centrifuge = new Centrifuge(BASEURL, {
      token: import.meta.env.VITE_TOKEN,
    });

    const channel = `orderbook:BTC-USD`;
    const sub = centrifuge.newSubscription(channel);

    const fetchHistory = async () => {
      try {
        const history = await sub.history({ limit: MAX_LEVELS });
        history.publications.forEach((pub) => {
          setOrderBookData((prev) => updateData(prev, pub.data));
        });
      } catch (error) {
        console.error("Failed to fetch history", error);
        setOrderBookData(initialState);
      }
    };

    sub.on("publication", (ctx) => {
      if (!ctx.data) return;

      setOrderBookData((prev) => {
        const initialSequence = prev.sequence === 0;
        const isSequenceValid =
          initialSequence || ctx.data.sequence === prev.sequence + 1;
        console.log("ctx.data.sequence", ctx.data.sequence);
        console.log("prev.sequence", prev.sequence);
        if (!isSequenceValid) {
          // console.log("Sequence mismatch - fetching history");
          fetchHistory(); // safe async call
          return prev; // do not reset here
        }

        return updateData(prev, ctx.data);
      });
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
