import { createContext, useContext, useMemo, useReducer, useState, ReactNode } from "react";
import type { CartLine } from "../data/types";
import { products } from "../data/products";

interface CartState {
  lines: CartLine[];
}

type CartAction =
  | { type: "ADD"; productId: string; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.lines.find((l) => l.productId === action.productId);
      const qty = action.quantity ?? 1;
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId ? { ...l, quantity: l.quantity + qty } : l
          ),
        };
      }
      return { lines: [...state.lines, { productId: action.productId, quantity: qty }] };
    }
    case "REMOVE":
      return { lines: state.lines.filter((l) => l.productId !== action.productId) };
    case "SET_QTY":
      return {
        lines: state.lines
          .map((l) =>
            l.productId === action.productId ? { ...l, quantity: Math.max(1, action.quantity) } : l
          )
          .filter((l) => l.quantity > 0),
      };
    case "CLEAR":
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotalCents = state.lines.reduce((sum, l) => {
      const product = products.find((p) => p.id === l.productId);
      if (!product) return sum;
      return sum + product.priceCents * l.quantity;
    }, 0);
    return {
      lines: state.lines,
      itemCount,
      subtotalCents,
      addItem: (productId, quantity) => {
        dispatch({ type: "ADD", productId, quantity });
        setIsOpen(true);
      },
      removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
      setQuantity: (productId, quantity) => dispatch({ type: "SET_QTY", productId, quantity }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [state, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
