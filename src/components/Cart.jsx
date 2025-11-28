import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import { useContext } from "react";
import { CartContext } from "./store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import { UserProgressContext } from "./store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  const userProgressContext = useContext(UserProgressContext);

  return (
    <Modal className="cart" open={userProgressContext.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onDecrease={() => removeItem(item.id)}
            onIncrease={() => addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={userProgressContext.hideCart}>
          Close
        </Button>
        {items.length > 0 && <Button>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}
