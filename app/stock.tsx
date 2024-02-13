import { DeckCard } from "./utils";
import styles from "./page.module.css";
import Card from "./card";
import useSolitaireStore from "./store";

interface StockPileProps {}

export default function StockPile() {
  const stock = useSolitaireStore((state) => state.stock);
  return (
    <div className={styles.stockContainer}>
      {stock.map((card, index) => (
        <div
          key={`${card.suit}-${card.value}`}
          className={styles.stockCard}
          style={{ left: `${index}px` }}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
