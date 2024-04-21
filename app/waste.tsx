import styles from "./page.module.css";
import Card from "./card";
import useSolitaireStore from "./store";

export default function WastePile() {
  const wasteStack = useSolitaireStore((state) => state.waste);
  const lastThree = wasteStack.slice(-3);

  return (
    <div className={styles.stockContainer}>
      {lastThree.map((card, index) => (
        <div
          key={`${card.suit}-${card.value}`}
          className={styles.wasteCard}
          style={{ left: `${index * 16}px` }}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
