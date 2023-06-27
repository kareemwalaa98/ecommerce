import React from "react";
import { withRouter } from "react-router-dom";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard/ProductCard";

class HomePage extends React.Component {
  constructor(props) {
    window.dataLayer = window.dataLayer || [];
    super(props);
    this.state = {
      selectedCategory: this.props.match.params.category || "women",
    };
    if (!this.props.match.params.category) {
      this.props.history.push("/women");
    }
  }

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  Impressions(products) {
    const chunkSize = 6; // set the maximum number of products per chunk
    let chunkIndex = 0;
    const numChunks = Math.ceil(products.length / chunkSize);
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    while (chunkIndex < numChunks) {
      const chunkStart = chunkIndex * chunkSize;
      const chunkEnd = Math.min(chunkStart + chunkSize, products.length);
      const chunk = products.slice(chunkStart, chunkEnd);

      const impressions = chunk.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        variant: product.sizes,
        category: product.category,
        list: product.list,
        position: product.position,
      }));

      window.dataLayer.push({
        event: "impressions",
        ecommerce: {
          currencyCode: "USD",
          impressions: impressions,
        },
      });

      chunkIndex++;
    }
  }
  //OLD Method sending all at once
  // Impressions(products) {
  //   const impressions = products.map((product) => ({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     brand: product.brand,
  //     variant: product.sizes,
  //     category: product.category,
  //     list: product.list,
  //     postion: product.position,
  //     dimension1: product.dimension1,
  //     dimension2: product.dimension2,
  //   }));

  //   window.dataLayer.push({
  //     event: "impressions",
  //     ecommerce: {
  //       currencyCode: "USD",
  //       impressions: impressions,
  //     },
  //   });
  // }
  componentDidMount() {
    this.unlisten = this.props.history.listen((location) => {
      console.log(location);
      this.setState({
        selectedCategory: location.pathname.replace("/", ""),
      });
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { selectedCategory } = this.state;
    const filteredProducts =
      selectedCategory === "all"
        ? productsData.products
        : productsData.products.filter(
            (product) => product.category === selectedCategory
          );
    this.Impressions(filteredProducts);
    return (
      <div>
        <div className="container">
          <div className="d-flex flex-column">
            <h1 className="page_title">{this.state.selectedCategory}</h1>
            <div className="product-list d-flex">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={this.shuffle(product.images)[0]}
                  price={product.price}
                  brand={product.brand}
                  sizes={product.sizes}
                  category={product.category}
                  position={product.position}
                  dimension1={product.dimension1}
                  dimension2={product.dimension2}
                  outOfStock={product.out_of_stock}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
