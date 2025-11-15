import LogoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";

function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={LogoImg} alt="A resturant" />
        <h1> REACT FOOD</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}

export default Header;
