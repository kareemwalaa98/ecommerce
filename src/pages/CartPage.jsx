import React from "react";
import CartItem from "../components/CartItem/CartItem";
import { Link } from "react-router-dom";

export default class CartPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getTax = () => {
    const total = this.props.cart.reduce(
      (partialSum, item) => partialSum + item.price * item.qty,
      0
    );
    return (total * 14) / 100;
  };
  getTotalQty = () => {
    return this.props.cart.reduce(
      (partialSum, item) => partialSum + item.qty,
      0
    );
  };
  getTotal = () => {
    return this.props.cart.reduce(
      (partialSum, item) => partialSum + item.price * item.qty,
      0
    );
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
      incrementInCart,
      decrementInCart,
      changeItemSize,
      changeItemColor,
    } = this.props;

    return (
      <div className="cart_page container">
        <h1 className="page_title">cart</h1>
        <hr />
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
        <div className="calculations">
          <table>
            <tbody>
              <tr>
                <td className={"title"}>Tax 14%:</td>
                <td className={"value"}>${this.getTax()}</td>
              </tr>
              <tr>
                <td className={"title"}>Quantity:</td>
                <td className={"value"}>{this.getTotalQty()}</td>
              </tr>
              <tr>
                <td className={"title total"}>Total:</td>
                <td className={"value"}>${this.getTotal() + this.getTax()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cta">
          <Link
            to={"#"}
            className={"order_button"}
            onClick={this.handleCheckout}
          >
            order
          </Link>
        </div>
      </div>
    );
  }
}
