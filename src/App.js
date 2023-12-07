import { D6Button } from "./components/D6Button";
import History from "./components/History";
import "./styles.css";
import React, { useState, useEffect } from "react";
import { getD6Roll } from "./utils";
import useLocalStorageState from "use-local-storage-state";

export default function App() {
  const [rolls, setRolls] = useLocalStorageState("dice-rolls");

  useEffect(() => {
    if (!rolls) {
      // Initialize rolls with an empty array if it's not set
      setRolls([]);
    }
  }, [rolls, setRolls]);

  const handleRoll = () => {
    const newRoll = { value: getD6Roll(), time: Date.now() };
    setRolls((prevRolls) => [newRoll, ...prevRolls]);
  };

  const currentRollValue = rolls?.length > 0 ? rolls[0].value : null;

  return (
    <div className="app">
      <main className="app__main">
        <D6Button value={currentRollValue} onRoll={handleRoll} />
      </main>
      <aside className="app__aside">
        <History rolls={rolls || []} />
      </aside>
    </div>
  );
}
