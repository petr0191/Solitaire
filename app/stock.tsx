import styles from "./page.module.css";
import Card from "./card";
import useSolitaireStore from "./store";

export default function StockPile() {
  const stock = useSolitaireStore((state) => state.stock);
  const flipCards = useSolitaireStore((state) => state.flipStockCards);
  return (
    <div className={styles.stockContainer}>
      {stock.map((card, index) => (
        <div
          key={`${card.suit}-${card.value}`}
          className={styles.stockCard}
          style={{ left: `${index}px` }}
          onClick={() => flipCards()}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
