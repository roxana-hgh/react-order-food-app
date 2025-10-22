import "./App.css";
import Header from "./components/layout/header/header";
import HomePage from "./components/layout/home/homePage";
import CartProvider from "./store/cartProvider";

function App() {
  return (
    <div className="App max-w-7xl m-auto">
      <CartProvider>
        <Header></Header>
        <main>
          <HomePage></HomePage>
        </main>
      </CartProvider>
    </div>
  );
}

export default App;
