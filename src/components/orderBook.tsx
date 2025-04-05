import { memo } from "react";
import { OrderbookProps } from "../types";
import styles from "./styles.module.css";

const OrderBook = ({ orderbook, type }: OrderbookProps) => {
  return (
    <div className="border border-gray-700 rounded-sm bg-gray-900 p-3">
      <h4
        className={`text-lg font-semibold mb-2 ${
          type === "asks" ? "text-red-400" : "text-green-400"
        } capitalize`}
      >
        {type}
      </h4>

      <div className="flex justify-between text-xs text-gray-500 pb-1 border-b border-gray-700 px-4">
        <span>Price</span>
        <span>Amount</span>
      </div>

      <ul className={`space-y-1 relative ${styles.orderbookWrapper}`}>
        {orderbook && orderbook.length > 0 ? (
          orderbook.map(({ price, amount, total }, i) => (
            <li
              key={`${type}-${i}`}
              className="relative text-sm flex justify-between border-b border-gray-800 hover:bg-gray-800 transition px-2"
            >
              <div
                className={`absolute left-0 top-0 h-full ${
                  type === "asks" ? "bg-red-800" : "bg-green-800"
                } opacity-20`}
                style={{
                  width: `${
                    (total / orderbook[orderbook.length - 1].total) * 100
                  }%`,
                }}
              />
              <span className="z-10">{price}</span>
              <span className="z-10">{amount}</span>
            </li>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-8 animate-pulse">
            {`Loading ${type}...`}
          </div>
        )}
      </ul>
    </div>
  );
};

export default memo(OrderBook);
