import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  progress: "", //'cart', 'checkout',
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [progress, setProgress] = useState("");

  function showCart() {
    setProgress("cart");
  }
  function hideCart() {
    setProgress("");
  }
  function showCheckout() {
    setProgress("checkout");
  }
  function hideCheckout() {
    setProgress("");
  }

  const progressCtx = {
    progress: progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext value={progressCtx}>{children}</UserProgressContext>
  );
}
