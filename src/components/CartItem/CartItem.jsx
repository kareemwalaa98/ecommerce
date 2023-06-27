import React from "react";
import "./styles.css";
export default class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }
  addToCartClickEvent = () => {
    const {
      id,
      brand,
      name,
      price,
      category,
      selectedSize,
      selectedColor,
      qty,
    } = this.props;
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    {
      console.log("qty in addevent catcher : ", qty);
    }
    window.dataLayer.push({
      event: "addToCart",
      ecommerce: {
        currencyCode: "USD",
        add: {
          products: [
            {
              id: id,
              name: name,
              price: price,
              brand: brand,
              variant: selectedSize,
              category: category,
              quantity: qty + 1,
              dimension1: `${id}-${selectedSize}-${selectedColor}`,
              dimension2: `${name} ${selectedSize} ${selectedColor}`,
            },
          ],
        },
      },
    });
  };
  removeFromCartClickEvent = () => {
    const {
      id,
      brand,
      name,
      price,
      category,
      selectedSize,
      selectedColor,
      qty,
    } = this.props;
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    {
      console.log("qty in removeevent catcher : ", qty);
    }
    window.dataLayer.push({
      event: "removeFromCart",
      ecommerce: {
        currencyCode: "USD",
        remove: {
          products: [
            {
              id: id,
              name: name,
              price: price,
              brand: brand,
              variant: selectedSize,
              category: category,
              quantity: qty - 1,
              dimension1: `${id}-${selectedSize}-${selectedColor}`,
              dimension2: `${name} ${selectedSize} ${selectedColor}`,
            },
          ],
        },
      },
    });
  };

  render() {
    const {
      id,
      brand,
      name,
      price,
      sizes,
      colors,
      selectedSize,
      selectedColor,
      image,
      qty,
      incrementInCart,
      decrementInCart,
      changeItemSize,
      changeItemColor,
    } = this.props;
    return (
      <div className={"cart_item d-flex"}>
        <div className="info">
          <div className="brand">{brand}</div>
          <div className="title">{name}</div>
          <div className="price">
            <span>$</span>
            <span>{price}</span>
          </div>
          <div className="sizes">
            <p>size:</p>
            <ul className={"d-flex"}>
              {sizes.map((size, idx) => (
                <li
                  key={idx}
                  className={`d-flex ${
                    size === selectedSize ? "selected" : ""
                  }`}
                  onClick={() => changeItemSize(id, size)}
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>
          <div className="colors">
            <p>color:</p>
            <ul className={"d-flex"}>
              {colors.map((color, idx) => (
                <li
                  key={idx}
                  className={color === selectedColor ? "selected" : ""}
                  style={{ backgroundColor: color }}
                  onClick={() => changeItemColor(id, color)}
                ></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="qty_changer d-flex">
          <div
            className="increment d-flex"
            onClick={() => {
              incrementInCart(id);
              this.addToCartClickEvent();
            }}
          >
            +
          </div>
          <div className="qty">
            {qty}
            {console.log("qty in div : ", qty)}
          </div>
          <div
            className="decrement d-flex"
            onClick={() => {
              decrementInCart(id);
              this.removeFromCartClickEvent();
            }}
          >
            -
          </div>
        </div>
        <div className="image">
          <img src={`/assets/images/products/${image}`} alt={name} />
        </div>
      </div>
    );
  }
}
