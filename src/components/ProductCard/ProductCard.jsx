import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    const {
      id,
      name,
      price,
      brand,
      sizes,
      category,
      position,
      dimension1,
      dimension2,
    } = this.props;

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "productClick",
      ecommerce: {
        click: {
          actionField: {
            list: "",
          },
          products: [
            {
              id,
              name,
              price,
              brand,
              variant: sizes,
              category,
              position,
              dimension1,
              dimension2,
            },
          ],
        },
      },
    });
  };

  render() {
    const { id, name, image, price, brand, outOfStock } = this.props;

    return (
      <Link
        to={`/products/${id}`}
        className="card_link"
        onClick={this.handleClick}
      >
        <div className="card">
          <div className="image_container">
            <img src={`/assets/images/products/${image}`} />
            {outOfStock ? (
              <div className="out_of_stock">out of stock</div>
            ) : null}
          </div>
          <div className="card-body">
            <h2>
              {brand} {name}
            </h2>
            <h5>
              <span>$</span> {price}
            </h5>
          </div>
        </div>
      </Link>
    );
  }
}
