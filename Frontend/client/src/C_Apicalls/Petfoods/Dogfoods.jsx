import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../A_HomeComponents/Navbars.jsx";
import "../../F_ApicallsCSS/pet_food.css"; 

function Dogfoods() {
  const [foods, setFoods] = useState([]);
  const [selectedType, setSelectedType] = useState("dog food");
  const [selectedCategory, setSelectedCategory] = useState("puppy");
  const [cartItems, setCartItems] = useState([]);
  const [addingToCartId, setAddingToCartId] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/main/petfoods`)
      .then((result) => {
        setFoods(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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

  // Filter foods based on selected type and category
  const filteredFoods = foods.filter((food) => {
    return (
      food.type.toLowerCase() === selectedType.toLowerCase() &&
      food.age.toLowerCase() === selectedCategory.toLowerCase() &&
      food.animal.toLowerCase() === "dog"
    );
  });

  return (
    <>
      <Navbar />
      <h1 className="page-title">All Dog Foods</h1>
      <div>
        <strong className="category-container">
          <p
            className={`category-option ${selectedCategory === "puppy" ? "active-category" : ""}`}
            onClick={() => handleCategoryClick("puppy")}
          >
            Puppy
          </p>
          <p
            className={`category-option ${selectedCategory === "adult dog" ? "active-category" : ""}`}
            onClick={() => handleCategoryClick("adult dog")}
          >
            Adult Dog
          </p>
          <p
            className={`category-option ${selectedCategory === "senior dog" ? "active-category" : ""}`}
            onClick={() => handleCategoryClick("senior dog")}
          >
            Senior Dog
          </p>
        </strong>
      </div>
      {filteredFoods.map((food) => {
        const isAddingToCart = addingToCartId === food.id;

        return (
          <section key={food._id} className="food-section">
            <div className="food-container">
              <img src={food.image} alt="" className="food-image" />
              <div className="food-details">
                <div className="food-info">
                  <strong className="food-meta">{food.brand} | {food.age} | {food.type}</strong>
                  <h3>{food.productName}</h3>
                </div>
                <hr className="divider" />
                <p><strong className="food-price">💲{food.price}</strong></p>
                <p className="food-rating">Rating : ⭐{food.rating.stars} | Reviews : {food.rating.numberOfReviews}</p>
                <hr className="divider" />
                <div className="cart-action">
                  {cartItems.some((item) => item.productname === food.productName) ? (
                    <p className="added-to-cart">Added to Cart</p>
                  ) : (
                    <button
                      className="add-to-cart-button"
                      onClick={() => addToCart(food)}
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <section className="navigation-footer">
        <Link to="/pet-foods" className="nav-link">
          <p><strong>&lt;&lt; Back</strong></p>
        </Link>
        <Link to="/cat-food" className="nav-link">
          <p><strong>Cat foods &gt;&gt;</strong></p>
        </Link>
      </section>
    </>
  );
}

export default Dogfoods;

