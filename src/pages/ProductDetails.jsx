import React from "react";
import productsData from "../data/products.json";
import { withRouter } from "react-router-dom";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: productsData.products.find(
        (p) => p.id === parseInt(this.props.match.params.id, 10)
      ),
      activeImageIndex: 0,
      selectedSize: undefined,
      selectedColor: undefined,
    };
  }

  componentDidMount() {
    // do the Product detail once when a product is clicked
    const { product } = this.state;
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "detail",
      ecommerce: {
        detail: {
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand,
              variant: product.sizes,
              category: product.category,
              dimension1: product.id,
              dimension2: product.name,
            },
          ],
        },
      },
    });
  }
  addToCartClickEvent = () => {
    const { product, selectedSize, selectedColor } = this.state;
    console.log(product.qty);
    console.log(this.props);
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "addToCart",
      ecommerce: {
        currencyCode: "USD",
        add: {
          products: [
            {
              id: product.id,
              name: product.name,
              price: product.price,
              brand: product.brand,
              variant: selectedSize,
              category: product.category,
              // quantity: ,
              dimension1: `${product.id}-${selectedSize}-${selectedColor}`,
              dimension2: `${product.name} ${selectedSize} ${selectedColor}`,
            },
          ],
        },
      },
    });
  };

  handleChangeImage = (activeImageIndex) => {
    this.setState({
      ...this.state,
      activeImageIndex: activeImageIndex,
    });
  };

  handleChangeSize = (selectedSize) => {
    this.setState({
      ...this.state,
      selectedSize: selectedSize,
    });
  };

  handleChangeColor = (selectedColor) => {
    this.setState({
      ...this.state,
      selectedColor: selectedColor,
    });
  };

  goToCart = () => {
    this.props.history.push("/cart");
  };

  render() {
    const { product, activeImageIndex, selectedSize, selectedColor } =
      this.state;
    const QTY_TEMP = 1;
    const { addToCart } = this.props;
    return (
      <div className="product_details_page">
        <div className="container">
          <div className="d-flex">
            <div className="d-flex gallary">
              <ul>
                {product.images.map((elem, index) => (
                  <li key={index} onClick={() => this.handleChangeImage(index)}>
                    <img
                      src={`/assets/images/products/${elem}`}
                      alt={product.name}
                    />
                  </li>
                ))}
              </ul>
              <div className="main_image">
                <img
                  src={`/assets/images/products/${product.images[activeImageIndex]}`}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="product_details_info">
              <div className="brand">
                <p>{product.brand}</p>
              </div>
              <div className="title">
                <p>
                  {product.name}
                  {product.out_of_stock ? <span>( out of stock )</span> : ""}
                </p>
              </div>
              <div className="sizes">
                <p>Sizes</p>
                <ul className="d-flex">
                  {product.sizes.map((s, index) => (
                    <li
                      key={index}
                      className={`product_size d-flex ${
                        s === selectedSize ? "active" : ""
                      }`}
                      onClick={() => this.handleChangeSize(s)}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="colors">
                <p>Colors</p>
                <ul className="d-flex">
                  {product.colors.map((c, index) => (
                    <li
                      key={index}
                      className={`product_color d-flex ${
                        c === selectedColor ? "active" : ""
                      }`}
                      onClick={() => this.handleChangeColor(c)}
                      style={{
                        backgroundColor: c,
                      }}
                    ></li>
                  ))}
                </ul>
              </div>
              <div className="price">
                <p>Price</p>
                <div className="d-flex">
                  <span>$</span>
                  <span>{product.price}</span>
                </div>
              </div>
              <div className="add_to_cart">
                <button
                  className={`d-flex ${
                    !selectedColor || !selectedSize || product.out_of_stock
                      ? "disabled"
                      : ""
                  }`}
                  disabled={
                    !selectedColor || !selectedSize || product.out_of_stock
                  }
                  onClick={() => {
                    addToCart({
                      ...product,
                      selectedSize: selectedSize,
                      selectedColor: selectedColor,
                      qty: 1,
                    });
                    this.goToCart();
                    this.addToCartClickEvent();
                  }}
                >
                  add to cart
                </button>
              </div>
              <div className="description">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductDetails);
