import { useContext } from "react";
import LogoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { CartContext } from "./CartContext.jsx";

function Header() {
  const cartCtx = useContext(CartContext);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return (totalNumberOfItems += item.quantity);
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={LogoImg} alt="A resturant" />
        <h1> REACT FOOD</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
