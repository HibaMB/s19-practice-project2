import { useContext } from "react";
import { UserProgressContext } from "./store/UserProgressContext";
import Modal from "./UI/Modal.jsx";
import { CartContext } from "./store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, isLoading, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  function handleSubmitCheckout(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());
    console.log(customerData);

    sendRequest(
      JSON.stringify({
        order: {
          customer: customerData,
          items: cartCtx.items,
        },
      })
    );
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Order submitted successfully!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={
        userProgressCtx.progress === "checkout"
          ? userProgressCtx.hideCheckout
          : null
      }
    >
      <form onSubmit={handleSubmitCheckout}>
        <h2>Checkout Form</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="name" type="text" required />
        <Input label="Email Address" id="email" type="email" required />
        <Input label="Street" id="street" type="text" required />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" required />
          <Input label="City" id="city" type="text" required />
        </div>
        {error && <Error title="Submit Order failed!" message={error} />}
        <p className="modal-actions">
          {!isLoading && (
            <>
              <Button
                textOnly
                type="button"
                onClick={userProgressCtx.hideCheckout}
              >
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
          {isLoading && <p>Submitting order...</p>}
        </p>
      </form>
    </Modal>
  );
}
