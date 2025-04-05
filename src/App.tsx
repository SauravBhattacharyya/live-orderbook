import OrderBook from "./components/orderBook";
import useAppContext from "./context/useAppContext";

const calculateCumulative = (orders: [number, number][]) => {
  let total = 0;
  return orders.map(([price, amount]) => {
    total += amount;
    return { price, amount, total };
  });
};

const Home = () => {
  const { orderBookData } = useAppContext();

  const asks = calculateCumulative(orderBookData.asks);
  const bids = calculateCumulative(orderBookData.bids);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h3 className="text-2xl font-bold mb-4">Order Book — BTC/USD</h3>

      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        <OrderBook orderbook={asks} type="asks" />
        <OrderBook orderbook={bids} type="bids" />
      </div>
    </div>
  );
};

export default Home;
