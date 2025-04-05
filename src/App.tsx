import useAppContext from "./context/useAppContext";

const Home = () => {
  const { orderBookData } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h3 className="text-2xl font-bold mb-4">Order Book — BTC/USD</h3>

      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Asks */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-red-400">Asks</h4>
          <ul className="space-y-1">
            {orderBookData.asks.map(([price, amount], i) => (
              <li
                key={`ask-${i}`}
                className="flex justify-between text-sm text-red-300"
              >
                <span>{price}</span>
                <span>{amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bids */}
        <div>
          <h4 className="text-lg font-semibold mb-2 text-green-400">Bids</h4>
          <ul className="space-y-1">
            {orderBookData.bids.map(([price, amount], i) => (
              <li
                key={`bid-${i}`}
                className="flex justify-between text-sm text-green-300"
              >
                <span>{price}</span>
                <span>{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
