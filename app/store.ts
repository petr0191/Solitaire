import { create } from "zustand";
import {
  DeckCard,
  canDropOnTableau,
  getCardValue,
  getNewDeck,
  getStartIndex,
} from "./utils";
import { CardValue } from "./types";

interface SolitaireStore {
  stock: DeckCard[];
  waste: DeckCard[];
  foundations: Array<DeckCard[]>;
  tableau: Array<DeckCard[]>;
  newGame: () => void;
  attemptStack: (card: DeckCard, tableauIndex: number) => void;
  dropOnTableau: (card: DeckCard, destinationTableauIndex: number) => void;
  showAllCards: () => void;
  flipStockCards: () => void;
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
    console.log("attempt stack", card);
    const tableauStack = [...get().tableau[tableauIndex]];
    const foundationsStack = [...get().foundations[card.suit]];
    console.log(foundationsStack);
    // If card is last in tableau
    if (
      tableauStack[tableauStack.length - 1].suit === card.suit &&
      tableauStack[tableauStack.length - 1].value === card.value
    ) {
      if (foundationsStack.length > 0) {
        console.log(getCardValue(card.value), "card value");
        console.log(
          getCardValue(foundationsStack[foundationsStack.length - 1].value),
          "last foundation card"
        );
      } else {
        console.log("Foundation stack empty");
      }
      // If card can be added to foundations
      if (
        (foundationsStack.length === 0 && card.value === CardValue.Ace) ||
        (foundationsStack.length > 0 &&
          getCardValue(card.value) ===
            getCardValue(foundationsStack[foundationsStack.length - 1].value) +
              1)
      ) {
        tableauStack.pop();
        foundationsStack.push(card);
        if (tableauStack.length > 0) {
          const temp = tableauStack.pop();
          if (temp) {
            tableauStack.push({
              suit: temp.suit,
              value: temp.value,
              discovered: true,
            });
          }
        }
        set((state) => ({
          tableau: state.tableau.map((stack, index) =>
            index === tableauIndex ? [...tableauStack] : stack
          ),
          foundations: state.foundations.map((stack, index) =>
            index === card.suit ? foundationsStack : stack
          ),
        }));
      }
    }
  },
  dropOnTableau: (card: DeckCard, destinationTableauIndex: number) => {
    console.log("drop");
    const sourceTableauIndex = get().tableau.findIndex((t) =>
      t.find((c) => c.suit === card.suit && c.value === card.value)
    );
    const sourceWasteIndex = get().waste.findIndex(
      (c) => c.suit === card.suit && c.value === card.value
    );
    if (
      (sourceTableauIndex === -1 && sourceWasteIndex === -1) ||
      sourceTableauIndex === destinationTableauIndex
    ) {
      return;
    }
    const destinationTableauStack = [...get().tableau[destinationTableauIndex]];
    if (sourceTableauIndex !== -1) {
      const sourceStackIndex = get().tableau[sourceTableauIndex].findIndex(
        (c) => c.suit === card.suit && c.value === card.value
      );

      const sourceTableauStack = [...get().tableau[sourceTableauIndex]];
      if (!canDropOnTableau(card, destinationTableauStack)) {
        return;
      }

      const cardsToMove = sourceTableauStack.splice(sourceStackIndex);
      destinationTableauStack.push(...cardsToMove);
      console.log(destinationTableauIndex);
      console.log(sourceTableauIndex);
      console.log(sourceStackIndex);

      if (sourceTableauStack.length > 0) {
        console.log("moved");
        sourceTableauStack[sourceTableauStack.length - 1].discovered = true;
        console.log(sourceTableauStack[sourceTableauStack.length - 1]);
      }

      set((state) => ({
        tableau: state.tableau.map((stack, index) => {
          if (index === sourceTableauIndex) {
            return sourceTableauStack;
          } else if (index === destinationTableauIndex) {
            return destinationTableauStack;
          }
          return stack;
        }),
      }));
    }

    if (sourceWasteIndex !== -1) {
      if (sourceWasteIndex !== get().waste.length - 1) {
        console.log("Waste can only move last card");
        return;
      }

      const cardToMove = get().waste[sourceWasteIndex];
      destinationTableauStack.push(cardToMove);

      set((state) => ({
        waste: [...state.waste.slice(0, -1)],
        tableau: state.tableau.map((stack, index) => {
          if (index === sourceTableauIndex) {
            return state.tableau[index];
          } else if (index === destinationTableauIndex) {
            return destinationTableauStack;
          }
          return stack;
        }),
      }));
    }
  },
  showAllCards: () => {
    set((state) => ({
      tableau: state.tableau.map((stack, index) => {
        return stack.map((card, index) => ({
          ...card,
          discovered: true,
        }));
      }),
    }));
  },
  flipStockCards: () => {
    const stock = [...get().stock];
    const cardsToMove: DeckCard[] = [];
    while (stock.length > 0 && cardsToMove.length < 3) {
      const card = stock.pop();
      if (card) {
        cardsToMove.push({ ...card, discovered: true });
      }
    }

    console.log(stock);
    set((state) => ({
      stock: [...stock],
      waste: [...state.waste, ...cardsToMove],
    }));
  },
}));

export default useSolitaireStore;
