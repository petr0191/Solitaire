"use client";

import styles from "./page.module.css";
import StockPile from "./stock";
import TableauPile from "./tableau";
import useSolitaireStore from "./store";
import { useEffect } from "react";
import Foundation from "./foundation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  const newGame = useSolitaireStore((state) => state.newGame);
  const showAllCards = useSolitaireStore((state) => state.showAllCards);

  useEffect(() => {
    newGame();
  }, []);

  return (
    <main className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.gameBoard}>
          {/* Command Row */}
          <div className={styles.commandRow}>
            <button className={styles.shuffleButton} onClick={() => newGame()}>
              Shuffle
            </button>
            <button
              className={styles.shuffleButton}
              onClick={() => showAllCards()}
            >
              Show all cards
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
              <Foundation key={index} index={index} />
            ))}
          </div>

          {/* Third Row for tableau */}
          <div className={styles.tableau}>
            {Array.from({ length: 7 }).map((_, index) => (
              <TableauPile index={index} key={index} />
            ))}
          </div>
        </div>
      </DndProvider>
    </main>
  );
}
