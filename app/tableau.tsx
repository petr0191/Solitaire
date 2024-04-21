import styles from "./page.module.css";
import Card from "./card";
import useSolitaireStore from "./store";
import { useDrop } from "react-dnd";
import { DragItemTypes } from "./types";
import { DeckCard, canDropOnTableau } from "./utils";

interface TableauPileProps {
  index: number;
}
export default function TableauPile({ index }: TableauPileProps) {
  const cards = useSolitaireStore((state) => state.tableau[index]);
  const onCardClick = useSolitaireStore((state) => state.attemptStack);
  const onCardDrop = useSolitaireStore((state) => state.dropOnTableau);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragItemTypes.CARD,
    drop: (item, monitor) => {
      onCardDrop(item as DeckCard, index);
    },
    //canDrop: (item) => canDropOnTableau(item as DeckCard, cards),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      className={styles.tableauPile}
      ref={drop}
      style={{ borderColor: isOver ? "yellow" : "#3CB371" }}
    >
      {cards.map((card, index) => (
        <div
          key={`${card.suit}-${card.value}`}
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
