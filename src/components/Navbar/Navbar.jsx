import "./styles.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BiDollar,
  BiEuro,
  BiPound,
  BiCart,
  BiChevronDown,
} from "react-icons/bi";
import CartItem from "../CartItem/CartItem";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        {
          key: "women",
          value: "Women",
        },
        {
          key: "men",
          value: "Men",
        },
        {
          key: "kids",
          value: "Kids",
        },
      ],
      isCurrencyDropdownOpen: false,
      currency: "usd",
    };
  }

  currentCurrencyIcon = () => {
    if (this.state.currency === "usd") return <BiDollar />;
    if (this.state.currency === "eur") return <BiEuro />;
    if (this.state.currency === "gbp") return <BiPound />;
  };
  handleCurrencyClick = () => {
    this.setState({
      ...this.state,
      isCurrencyDropdownOpen: !this.state.isCurrencyDropdownOpen,
    });
  };
  handleCurrencyChange = (currency) => {
    this.setState({
      ...this.state,
      isCurrencyDropdownOpen: false,
      currency: currency,
    });
  };
  handleCheckout = () => {
    const { cart } = this.props;
    console.log(this.props);

    window.dataLayer.push({
      event: "checkout",
      ecommerce: {
        currencyCode: "USD",
        checkout: {
          actionField: {
            step: 1,
            option: "Cart Page ",
          },
          products: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            brand: item.brand,
            variant: item.sizes,
            category: item.category,
            quantity: item.qty,
            dimension1: `${item.id}-${item.selectedSize}-${item.selectedColor}`,
            dimension2: `${item.name} ${item.selectedSize} ${item.selectedColor}`,
          })),
        },
      },
    });
  };

  render() {
    const {
      cart,
      isCartOpen,
      incrementInCart,
      decrementInCart,
      changeItemSize,
      changeItemColor,
      toggleCart,
    } = this.props;
    return (
      <nav>
        <div className="container d-flex">
          <div className="links">
            {this.state.navItems.map((i, index) => (
              <NavLink
                exact
                key={index}
                activeClassName="active"
                to={`/${i.key}`}
              >
                {i.value}
              </NavLink>
            ))}
          </div>
          <div className="icon">
            <img src="/assets/images/logo.png" alt="logo" />
          </div>
          <div className="actions d-flex">
            <div className="currency_container d-flex">
              <div className="button" onClick={this.handleCurrencyClick}>
                {this.currentCurrencyIcon()}
                <BiChevronDown size={16} />
              </div>
              <ul
                className={`currencies_dropdown d-flex ${
                  this.state.isCurrencyDropdownOpen ? "active" : ""
                }`}
              >
                <li
                  className="currency_li"
                  onClick={() => this.handleCurrencyChange("usd")}
                >
                  <a className="d-flex">
                    <BiDollar />
                    <span>USD</span>
                  </a>
                </li>
                <li
                  className="currency_li"
                  onClick={() => this.handleCurrencyChange("eur")}
                >
                  <a className="d-flex">
                    <BiEuro />
                    <span>EUR</span>
                  </a>
                </li>
                <li
                  className="currency_li"
                  onClick={() => this.handleCurrencyChange("gbp")}
                >
                  <a className="d-flex">
                    <BiPound />
                    <span>GBP</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="shopping_cart_container d-flex">
              <BiCart size={18} onClick={toggleCart} />
              {cart.length ? (
                <div className="badge d-flex">{cart.length}</div>
              ) : null}

              <div
                className={`cart_dropdown d-flex ${isCartOpen ? "active" : ""}`}
              >
                <div className="title">
                  <span>My Bag, </span>
                  <span>
                    {cart.length} {cart.length > 1 ? "items" : "item"}
                  </span>
                </div>
                <ul className={`d-flex cart_items_container`}>
                  {cart.length ? (
                    cart.map((cartItem, idx) => (
                      <li key={idx}>
                        <CartItem
                          id={cartItem.id}
                          brand={cartItem.brand}
                          name={cartItem.name}
                          price={cartItem.price}
                          sizes={cartItem.sizes}
                          colors={cartItem.colors}
                          category={cartItem.category}
                          selectedSize={cartItem.selectedSize}
                          selectedColor={cartItem.selectedColor}
                          image={cartItem.images[0]}
                          qty={cartItem.qty}
                          incrementInCart={incrementInCart}
                          decrementInCart={decrementInCart}
                          changeItemSize={changeItemSize}
                          changeItemColor={changeItemColor}
                        />
                      </li>
                    ))
                  ) : (
                    <div className={"empty_state"}>Cart is Empty</div>
                  )}
                </ul>
                <div className="total d-flex">
                  <span>Total</span>
                  <span>
                    $
                    {cart.reduce(
                      (partialSum, item) => partialSum + item.price * item.qty,
                      0
                    )}
                  </span>
                </div>
                <div className="cta d-flex">
                  <Link to={"/cart"} className={"view_bag"}>
                    view bag
                  </Link>
                  <Link
                    to={"#"}
                    className={"checkout"}
                    onClick={this.handleCheckout} /// fiixx meeeeeeee do multiple checkouts events
                  >
                    checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
