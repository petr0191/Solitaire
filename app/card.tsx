"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Suit, CardValue, DragItemTypes } from "./types";
import { DeckCard, getSuit } from "./utils";
import { useDrag } from "react-dnd";

export function useCardState(initialDiscovered: boolean) {
  const [isDiscovered, setIsDiscovered] = useState(initialDiscovered);
  const discover = () => setIsDiscovered(true);

  return {
    isDiscovered,
    discover,
  };
}

interface CardProps {
  card: DeckCard;
}

export default function Card({ card }: CardProps) {
  const imageName = `${card.value.toLowerCase()}_of_${getSuit(card.suit)}.png`;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragItemTypes.CARD,
      canDrag: () => card.discovered,
      item: card,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card.discovered, card.value, card.suit]
  );
  return (
    <div
      className={styles.card}
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {card.discovered && <img src={imageName} />}
      {!card.discovered && <img src="card_back_blue.png" />}
    </div>
  );
}
