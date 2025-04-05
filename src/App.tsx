import useAppContext from "./context/useAppContext";

const Home = () => {
  const { orderBookData } = useAppContext();

  return (
    <div>
      <h3>Order Book</h3>
      <div>
        <h4>Asks</h4>
        <ul>
          {orderBookData.asks.map(([price, amount], i) => (
            <li key={`ask-${i}`}>
              {price} — {amount}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Bids</h4>
        <ul>
          {orderBookData.bids.map(([price, amount], i) => (
            <li key={`bid-${i}`}>
              {price} — {amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
