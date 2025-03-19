import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../G_ComponentsCSS/Foodshops.css";

const Foodshops = () => {
  const [foods, setFoods] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1001/main/petfoods")
      .then((result) => {
        setFoods(result.data);
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
      .post("http://localhost:1001/main/addtocart", cartItemData)
      .then((response) => {
        setCartItems((prevItems) => [...prevItems, response.data]);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      })
      .finally(() => {
        setAddingToCartId(null);
      });
  };

  const renderFoods = (animal, type) => {
    const filteredFoods = foods.filter(
      (food) =>
        food.animal.toLowerCase() === animal &&
        (type === "treat"
          ? food.type.toLowerCase() === `${animal} treat`
          : food.type.toLowerCase() === `${animal} food`)
    );

    return (
      <>
        {filteredFoods.slice(0, 2).map((food) => {
          const isAddingToCart = addingToCartId === food.id;

          return (
            <section className="foodshop-item" key={food._id}>
              <div className="foodshop-item-content">
                <img src={food.image} alt="" className="foodshop-item-image" />
                <div className="foodshop-item-details">
                  <div className="foodshop-item-info">
                    <strong className="foodshop-item-description">
                      {food.brand} | {food.age} | {food.type}
                    </strong>
                    <h4 className="foodshop-item-name">{food.productName}</h4>
                  </div>
                  <hr className="foodshop-item-divider" />
                  <p className="foodshop-item-price">
                    <strong>💲{food.price}</strong>
                  </p>
                  <p className="foodshop-item-rating">
                    Rating: ⭐{food.rating.stars} | Reviews:{" "}
                    {food.rating.numberOfReviews}
                  </p>
                  <hr className="foodshop-item-divider" />
                  <div className="foodshop-item-cart">
                    {cartItems.some(
                      (item) => item.productname === food.productName
                    ) ? (
                      <p className="foodshop-item-added">Added to Cart</p>
                    ) : (
                      <button
                        className="foodshop-add-to-cart-button"
                        onClick={() => addToCart(food)}
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
    <section className="foodshop-container">
      <h2 className="foodshop-heading">Explore Our Pet's Foods</h2>
      
      <div>
        <h1 className="foodshop-subheading">All Cat Foods</h1>
        <div className="foodshop-grid">{renderFoods("cat", "food")}</div>
        <div className="foodshop-button-container">
          {foods.filter(food => food.animal.toLowerCase() === "cat" && food.type.toLowerCase() === "cat food").length > 2 && (
            <Link to="/cat-food" className="foodshop-link">
              <button className="foodshop-see-more-button">See More..</button>
            </Link>
          )}
        </div>
      </div>
      
      <hr className="foodshop-divider" />

      <div>
        <h1 className="foodshop-subheading">All Cat Treats</h1>
        <div className="foodshop-grid">{renderFoods("cat", "treat")}</div>
        <div className="foodshop-button-container">
          {foods.filter(food => food.animal.toLowerCase() === "cat" && food.type.toLowerCase() === "cat treat").length > 2 && (
            <Link to="/cat-treat" className="foodshop-link">
              <button className="foodshop-see-more-button">See More..</button>
            </Link>
          )}
        </div>
      </div>
      
      <hr className="foodshop-divider" />

      <div>
        <h1 className="foodshop-subheading">All Dog Foods</h1>
        <div className="foodshop-grid">{renderFoods("dog", "food")}</div>
        <div className="foodshop-button-container">
          {foods.filter(food => food.animal.toLowerCase() === "dog" && food.type.toLowerCase() === "dog food").length > 2 && (
            <Link to="/dog-food" className="foodshop-link">
              <button className="foodshop-see-more-button">See More..</button>
            </Link>
          )}
        </div>
      </div>

      <hr className="foodshop-divider" />

      <div>
        <h1 className="foodshop-subheading">All Dog Treats</h1>
        <div className="foodshop-grid">{renderFoods("dog", "treat")}</div>
        <div className="foodshop-button-container">
          {foods.filter(food => food.animal.toLowerCase() === "dog" && food.type.toLowerCase() === "dog treat").length > 2 && (
            <Link to="/dog-treat" className="foodshop-link">
              <button className="foodshop-see-more-button">See More..</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Foodshops;
