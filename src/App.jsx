import CartContextProvider from "./components/CartContext.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header></Header>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
