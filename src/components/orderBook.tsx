import { OrderbookProps } from "../types";
import styles from "./styles.module.css";

const OrderBook = ({ orderbook, type }: OrderbookProps) => {
  return (
    <div>
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
        {orderbook.map(({ price, amount, total }, i) => (
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
        ))}
      </ul>
    </div>
  );
};

export default OrderBook;
