import { OrderBookData } from "../types";

export const BASEURL = "wss://api.testnet.rabbitx.io/ws";

export const initialState: OrderBookData = {
  bids: [],
  asks: [],
};
