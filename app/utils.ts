import { CardValue, Suit } from "./types";

export interface DeckCard {
  suit: Suit;
  value: CardValue;
  discovered: boolean;
}

function createDeck(): DeckCard[] {
  let deck: DeckCard[] = [];
  for (let suit in Suit) {
    if (isNaN(Number(suit))) {
      Object.values(CardValue).forEach((value) => {
        deck.push({
          suit: Suit[suit as keyof typeof Suit],
          value: value as CardValue,
          discovered: false,
        });
      });
    }
  }
  return deck;
}

function shuffleDeck(deck: DeckCard[]): DeckCard[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }
  return deck;
}

export function getNewDeck(): DeckCard[] {
  let deck = createDeck();
  deck = shuffleDeck(deck);
  return deck;
}

export function getStartIndex(input: number): number {
  if (input === 0) {
    return 0;
  }
  return input + getStartIndex(input - 1);
}

export function getSuit(suit: Suit): string {
  if (suit === Suit.Clubs) {
    return "Clubs";
  }
  if (suit === Suit.Diamonds) {
    return "Diamonds";
  }
  if (suit === Suit.Hearts) {
    return "Hearts";
  }
  return "Spades";
}

export function getCardValue(value: CardValue): number {
  if (value === CardValue.Ace) {
    return 1;
  }
  if (value === CardValue.Two) {
    return 2;
  }
  if (value === CardValue.Three) {
    return 3;
  }
  if (value === CardValue.Four) {
    return 4;
  }
  if (value === CardValue.Five) {
    return 5;
  }
  if (value === CardValue.Six) {
    return 6;
  }
  if (value === CardValue.Seven) {
    return 7;
  }
  if (value === CardValue.Eight) {
    return 8;
  }
  if (value === CardValue.Nine) {
    return 9;
  }
  if (value === CardValue.Ten) {
    return 10;
  }
  if (value === CardValue.Jack) {
    return 11;
  }
  if (value === CardValue.Queen) {
    return 12;
  }
  if (value === CardValue.King) {
    return 13;
  }
  return 0;
}

export function isAlternateColor(card: DeckCard, lastCard: DeckCard) {
  if (card.suit === Suit.Diamonds || card.suit === Suit.Hearts) {
    return lastCard.suit === Suit.Clubs || lastCard.suit === Suit.Spades;
  }
  if (card.suit === Suit.Clubs || card.suit === Suit.Spades) {
    return lastCard.suit === Suit.Hearts || lastCard.suit === Suit.Diamonds;
  }

  return false;
}

export function isOneLower(card: DeckCard, lastCard: DeckCard) {
  console.log(card, "source");
  console.log(lastCard, "lastCard");
  console.log(getCardValue(card.value) + 1 === getCardValue(lastCard.value));
  console.log(getCardValue(card.value) + 1);
  console.log(getCardValue(lastCard.value));
  return getCardValue(card.value) + 1 === getCardValue(lastCard.value);
}

export function canDropOnTableau(card: DeckCard, tableauStack: DeckCard[]) {
  console.log(tableauStack);
  if (tableauStack.length === 0) {
    return card.value === CardValue.King;
  }
  const lastCard = tableauStack[tableauStack.length - 1];
  return isOneLower(card, lastCard) && isAlternateColor(card, lastCard);
}
