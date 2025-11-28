import { useContext } from "react";
import { UserProgressContext } from "./store/UserProgressContext";
import Modal from "./UI/Modal.jsx";
import { CartContext } from "./store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContext);

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={
        userProgressCtx.progress === "checkout"
          ? userProgressCtx.hideCheckout
          : null
      }
    >
      <form>
        <h2>Checkout Form</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="full-name" type="text" required />
        <Input label="Email Address" id="email" type="email" required />
        <Input label="Street" id="street" type="text" required />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" required />
          <Input label="City" id="city" type="text" required />
        </div>
        <p className="modal-actions">
          <Button textOnly type="button" onClick={userProgressCtx.hideCheckout}>
            Close
          </Button>
          <Button onClick={userProgressCtx.hideCheckout}>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
