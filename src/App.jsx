import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";

function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivated, setIsDeactivated] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const deactivateCells = () => {
    setIsDeactivated(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivated(false);
        }
        return newOrder;
      });
    }, 300);
  };

  const activateCell = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    console.log(newOrder);

    //deactivate
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config.flat(1).map((value, index) => {
          return value ? (
            <Cell
              key={index}
              label={`Cell ${index}`}
              filled={order.includes(index)}
              onClick={() => activateCell(index)}
              isDisabled={order.includes(IDBIndex) || isDeactivated}
            />
          ) : (
            <span></span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
