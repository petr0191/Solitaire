import styles from "./page.module.css";
import Card from "./card";
import useSolitaireStore from "./store";

interface TableauPileProps {
  index: number;
}
export default function TableauPile({ index }: TableauPileProps) {
  const cards = useSolitaireStore((state) => state.tableau[index]);
  const onCardClick = useSolitaireStore((state) => state.attemptStack);
  return (
    <div className={styles.tableauPile}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={styles.tableauCard}
          style={{ top: `${index * 16}px` }}
          onClick={() => onCardClick(card, index)}
        >
          <Card card={card} />
        </div>
      ))}
    </div>
  );
}
