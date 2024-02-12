"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Suit, CardValue } from "./types";
import { DeckCard, getSuit } from "./utils";

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
  return (
    <div className={styles.card}>
      {card.discovered && <img src={imageName} />}
      {!card.discovered && <img src="card_back_blue.png" />}
    </div>
  );
}
