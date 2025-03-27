import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../G_ComponentsCSS/Toyshop.css";

const Toyshops = () => {
  const [toys, setToys] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/main/pettoys`)
      .then((result) => {
        setToys(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (selectedProduct) => {
    setAddingToCartId(selectedProduct.id);

    const { productName, image, price } = selectedProduct;

    const cartItemData = {
      productname: productName,
      productimage: image,
      productprice: price,
    };

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/main/addtocart`, cartItemData)
      .then((response) => {
        console.log("Item added to cart:", response.data);
        setCartItems((prevItems) => [...prevItems, response.data]);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      })
      .finally(() => {
        setAddingToCartId(null);
      });
  };

  const renderToys = (animal) => {
    const filteredToys = toys.filter(
      (toy) => toy.animal.toLowerCase() === animal
    );

    return (
      <>
        {filteredToys.slice(0, 2).map((toy) => {
          const isAddingToCart = addingToCartId === toy.id;

          return (
            <section
              key={toy._id}
              className="toyshop-section"
            >
              <div className="toyshop-flex-container">
                <img
                  src={toy.image}
                  alt=""
                  className="toyshop-image"
                />
                <div className="toyshop-details">
                  <div className="toyshop-info">
                    <strong className="toyshop-brand">
                      {toy.brand} | {toy.type}
                    </strong>
                    <h4 className="toyshop-title">{toy.productName}</h4>
                  </div>
                  <hr className="toyshop-divider" />
                  <p>
                    <strong className="toyshop-price">💲{toy.price}</strong>
                  </p>
                  <p className="toyshop-rating">
                    Rating: ⭐{toy.rating.stars} | Reviews:{" "}
                    {toy.rating.noOfReviews}
                  </p>
                  <hr className="toyshop-divider" />
                  <div className="toyshop-cart-actions">
                    {cartItems.some(
                      (item) => item.productname === toy.productName
                    ) ? (
                      <p className="toyshop-cart-status">Added to Cart</p>
                    ) : (
                      <button
                        className="toyshop-add-to-cart-btn"
                        onClick={() => addToCart(toy)}
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? "Adding..." : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </>
    );
  };

  return (
    <>
      <section className="toyshop-main">
        <h2 className="toyshop-header">
          Explore Our Pet's Toys
        </h2>
        <div>
          <h1 className="toyshop-subheader">
            All Cat Toys
          </h1>
          <div className="toyshop-grid">
            {renderToys("cat")}
          </div>
          <div className="toyshop-more-btn-container">
            {toys.filter(
              (toy) => toy.animal.toLowerCase() === "cat"
            ).length > 2 && (
              <Link
                to="/cat-toy"
                className="toyshop-link"
              >
                <button className="toyshop-more-btn">
                  See More...
                </button>
              </Link>
            )}
          </div>
        </div>
        <hr className="toyshop-divider" />
        <div>
          <h1 className="toyshop-subheader">
            All Dog Toys
          </h1>
          <div className="toyshop-grid">
            {renderToys("dog")}
          </div>
          <div className="toyshop-more-btn-container">
            {toys.filter(
              (toy) => toy.animal.toLowerCase() === "dog"
            ).length > 2 && (
              <Link
                to="/dog-toy"
                className="toyshop-link"
              >
                <button className="toyshop-more-btn">
                  See More...
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Toyshops;
