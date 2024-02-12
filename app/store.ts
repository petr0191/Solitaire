import { create } from "zustand";
import { DeckCard, getCardValue, getNewDeck, getStartIndex } from "./utils";
import { CardValue } from "./types";

interface SolitaireStore {
  stock: DeckCard[];
  waste: DeckCard[];
  foundations: Array<DeckCard[]>;
  tableau: Array<DeckCard[]>;
  newGame: () => void;
  attemptStack: (card: DeckCard, tableauIndex: number) => void;
}

const useSolitaireStore = create<SolitaireStore>()((set, get) => ({
  stock: [],
  waste: [],
  foundations: [[], [], [], []],
  tableau: [[], [], [], [], [], [], []],
  newGame: () => {
    const newDeck = getNewDeck();

    const newTableau = Array.from({ length: 7 }).map((_, index) => {
      return newDeck.slice(
        getStartIndex(index),
        getStartIndex(index) + index + 1
      );
    });
    newTableau.forEach((tab) => (tab[tab.length - 1].discovered = true));
    const newStock = newDeck.slice(28);
    set(() => ({
      stock: [...newStock],
      waste: [],
      foundations: [[], [], [], []],
      tableau: [...newTableau],
    }));
  },
  attemptStack: (card: DeckCard, tableauIndex: number) => {
    const tableauStack = [...get().tableau[tableauIndex]];
    const foundationsStack = [...get().foundations[card.suit]];
    // If card is last in tableau
    if (
      tableauStack[tableauStack.length - 1].suit === card.suit &&
      tableauStack[tableauStack.length - 1].value === card.value
    ) {
      // If card can be added to foundations
      if (
        (foundationsStack.length === 0 && card.value === CardValue.Ace) ||
        getCardValue(card.value) ===
          getCardValue(foundationsStack[foundationsStack.length - 1].value) + 1
      ) {
        tableauStack.pop();
        foundationsStack.push(card);
        if (tableauStack.length > 0) {
          tableauStack[tableauStack.length - 1].discovered = true;
        }
        set((state) => ({
          tableau: state.tableau.map((stack, index) =>
            index === tableauIndex ? tableauStack : stack
          ),
          foundations: state.foundations.map((stack, index) =>
            index === card.suit ? foundationsStack : stack
          ),
        }));
      }
    }
  },
}));

export default useSolitaireStore;
