import { useContext, useState } from "react";
import LogoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { CartContext } from "./store/CartContext.jsx";
import { UserProgressContext } from "./store/UserProgressContext.jsx";

function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return (totalNumberOfItems += item.quantity);
  }, 0);

  const { showCart } = useContext(UserProgressContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={LogoImg} alt="A resturant" />
        <h1> REACT FOOD</h1>
      </div>
      <nav>
        <Button textOnly onClick={showCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
