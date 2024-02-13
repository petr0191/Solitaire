import useSolitaireStore from "./store";
import styles from "./page.module.css";
import Card from "./card";

interface FoundationProps {
  index: number;
}

export default function Foundation({ index }: FoundationProps) {
  const cards = useSolitaireStore((state) => state.foundations[index]);

  return (
    <div className={styles.foundation}>
      {cards.map((card, index) => (
        <div
          key={`${card.suit}-${card.value}`}
          className={styles.foundationCard}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
