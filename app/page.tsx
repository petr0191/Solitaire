"use client";

import styles from "./page.module.css";
import Card from "./card";
import { CardValue, Suit } from "./types";
import StockPile from "./stock";
import TableauPile from "./tableau";
import useSolitaireStore from "./store";
import { useEffect } from "react";
import Foundation from "./foundation";

export default function Home() {
  const newGame = useSolitaireStore((state) => state.newGame);

  useEffect(() => {
    newGame();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.gameBoard}>
        {/* Command Row */}
        <div className={styles.commandRow}>
          <button className={styles.shuffleButton} onClick={() => newGame()}>
            Shuffle
          </button>
        </div>

        {/* Second Row for stock, waste, and foundations */}
        <div className={styles.gameRow}>
          <div className={styles.stock}>
            <StockPile />
          </div>
          <div className={styles.waste}>Waste 1</div>
          <div className={styles.empty}></div>

          {Array.from({ length: 4 }).map((_, index) => (
            // <div key={index} className={styles.foundation}>
            //   Foundation {index + 1}
            // </div>
            <Foundation key={index} index={index} />
          ))}
        </div>

        {/* Third Row for tableau */}
        <div className={styles.tableau}>
          {Array.from({ length: 7 }).map((_, index) => (
            <TableauPile index={index} key={index} />
            // <div key={index} className={styles.tableauPile}>
            //   Tableau {index + 1}
            // </div>
          ))}
        </div>
      </div>
    </main>
  );
}
