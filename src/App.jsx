import CartContextProvider from "./components/store/CartContext.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import UserProgressContextProvider from "./components/store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header></Header>
        <Meals />
        <Cart />
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
