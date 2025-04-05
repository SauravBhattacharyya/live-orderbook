import { useMemo } from "react";
import OrderBook from "./components/orderBook";
import useAppContext from "./context/useAppContext";
import { calculateCumulative } from "./utils/commonFunctions";

const Home = () => {
  const { orderBookData } = useAppContext();

  //cumulative calculation will run only when bids/asks data changes
  const asks = useMemo(
    () => calculateCumulative(orderBookData.asks),
    [orderBookData.asks]
  );
  const bids = useMemo(
    () => calculateCumulative(orderBookData.bids),
    [orderBookData.bids]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h3 className="text-2xl font-bold mb-4">Order Book — BTC/USD</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <OrderBook orderbook={asks} type="asks" />
        <OrderBook orderbook={bids} type="bids" />
      </div>
    </div>
  );
};

export default Home;
