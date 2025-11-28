import { createContext, useCallback, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD") {
    const currentItems = [...state.items];
    const itemExist = currentItems.findIndex(
      (item) => item.id === action.payload.id
    );
    if (itemExist >= 0) {
      const updatedItem = {
        ...currentItems[itemExist],
        quantity: currentItems[itemExist].quantity + 1,
      };
      currentItems[itemExist] = updatedItem;
      return { ...state, items: [...currentItems] };
    } else {
      const newItem = { ...action.payload, quantity: 1 };
      return { ...state, items: [...currentItems, newItem] };
    }
  } else if (action.type === "REMOVE") {
    const currentItems = [...state.items];
    const itemExist = currentItems.findIndex(
      (item) => item.id === action.payload.id
    );

    if (itemExist >= 0) {
      if (currentItems[itemExist].quantity > 1) {
        const updatedItem = {
          ...currentItems[itemExist],
          quantity: currentItems[itemExist].quantity - 1,
        };
        currentItems[itemExist] = updatedItem;
        return { ...state, items: [...currentItems, updatedItem] };
      } else {
        const filteredItems = currentItems.filter(
          (item) => item.id !== action.payload.id
        );
        return { ...state, items: filteredItems };
      }
    } else {
      return { ...state, items: currentItems };
    }
  }
  return { ...state };
}

export default function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  const cartCtx = {
    items: cartState.items,
    addItem: useCallback((item) => {
      cartDispatch({ type: "ADD", payload: item });
    }),
    removeItem: useCallback((id) => {
      cartDispatch({ type: "REMOVE", payload: { id } });
    }),
  };

  console.log(cartCtx);
  return <CartContext value={cartCtx}>{children}</CartContext>;
}
