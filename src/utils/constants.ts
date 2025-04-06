import { OrderBookData } from "../types";

export const BASEURL = "wss://api.prod.rabbitx.io/ws";

export const initialState: OrderBookData = {
  bids: [],
  asks: [],
  sequence: 0,
};

export const MAX_LEVELS = 15;
