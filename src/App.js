import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: window.localStorage.getItem("cart_items")
        ? JSON.parse(window.localStorage.getItem("cart_items"))
        : [],
      isCartOpen: false,
    };
  }

  updateInLocalStorage = (cart) => {
    window.localStorage.setItem("cart_items", JSON.stringify(cart));
  };

  addToCart = (item) => {
    const cartItem = this.state.cart.find((i) => i.id === item.id);
    if (
      cartItem &&
      cartItem.selectedSize === item.selectedSize &&
      cartItem.selectedColor === item.selectedColor
    ) {
      this.incrementInCart(item);
    } else {
      this.setState({
        ...this.state,
        cart: [item, ...this.state.cart],
      });
      this.updateInLocalStorage([item, ...this.state.cart]);
    }
  };
  removeFromCart = (itemId) => {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((i) => i.id !== itemId),
    });
    this.updateInLocalStorage(this.state.cart.filter((i) => i.id !== itemId));
  };

  incrementInCart = (itemId) => {
    this.setState({
      ...this.state,
      cart: this.state.cart.map((i) => ({
        ...i,
        qty: i.id === itemId ? (i.qty += 1) : i.qty,
      })),
    });
    this.updateInLocalStorage(
      this.state.cart.map((i) => ({
        ...i,
        qty: i.id === itemId ? (i.qty += 1) : i.qty,
      }))
    );
  };
  decrementInCart = (itemId) => {
    const cartItem = this.state.cart.find((i) => i.id === itemId);
    if (cartItem && cartItem.qty > 1) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((i) => ({
          ...i,
          qty: i.id === itemId ? (i.qty -= 1) : i.qty,
        })),
      });
      this.updateInLocalStorage(
        this.state.cart.map((i) => ({
          ...i,
          qty: i.id === itemId ? (i.qty -= 1) : i.qty,
        }))
      );
    } else if (cartItem && cartItem.qty === 1) {
      this.removeFromCart(itemId);
    }
  };
  changeItemSize = (itemId, size) => {
    this.setState({
      ...this.state,
      cart: this.state.cart.map((i) => ({
        ...i,
        selectedSize: i.id === itemId ? size : i.selectedSize,
      })),
    });
    this.updateInLocalStorage(
      this.state.cart.map((i) => ({
        ...i,
        selectedSize: i.id === itemId ? size : i.selectedSize,
      }))
    );
  };
  changeItemColor = (itemId, color) => {
    this.setState({
      ...this.state,
      cart: this.state.cart.map((i) => ({
        ...i,
        selectedColor: i.id === itemId ? color : i.selectedColor,
      })),
    });
    this.updateInLocalStorage(
      this.state.cart.map((i) => ({
        ...i,
        selectedColor: i.id === itemId ? color : i.selectedColor,
      }))
    );
  };

  toggleCart = () => {
    this.setState({
      ...this.state,
      isCartOpen: !this.state.isCartOpen,
    });
  };

  render() {
    return (
      <Router>
        <div id="routes">
          <Navbar
            cart={this.state.cart}
            isCartOpen={this.state.isCartOpen}
            incrementInCart={this.incrementInCart}
            decrementInCart={this.decrementInCart}
            changeItemSize={this.changeItemSize}
            changeItemColor={this.changeItemColor}
            toggleCart={this.toggleCart}
          />
          <div className="app_container">
            {this.state.isCartOpen ? (
              <div className="overlay" onClick={this.toggleCart}></div>
            ) : null}

            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route
                path="/products/:id"
                render={() => <ProductDetails addToCart={this.addToCart} />}
              />

              <Route
                path="/cart"
                render={() => (
                  <CartPage
                    cart={this.state.cart}
                    incrementInCart={this.incrementInCart}
                    decrementInCart={this.decrementInCart}
                    changeItemSize={this.changeItemSize}
                    changeItemColor={this.changeItemColor}
                  />
                )}
              />

              <Route path="/:category" component={HomePage} />

              <Route exact render={() => <h1>Page not Found!</h1>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
