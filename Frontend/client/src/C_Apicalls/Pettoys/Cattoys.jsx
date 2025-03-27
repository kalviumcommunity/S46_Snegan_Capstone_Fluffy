import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../A_HomeComponents/Navbars";
import "../../F_ApicallsCSS/pet_toy.css"; 


function Cattoys() {
  const [toys, setToys] = useState([]);
  const [selectedToyCategory, setSelectedToyCategory] = useState("Scratch Post");
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

  const handleToyCategoryClick = (category) => {
    setSelectedToyCategory(category);
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

  const filteredToys = selectedToyCategory
    ? toys.filter((toy) => toy.type === selectedToyCategory && toy.animal === "cat")
    : toys.filter((toy) => toy.animal === "cat");

  return (
    <div>
      <Navbar />
      <h1 className="toy-page-title">All Cat Toys</h1>
      <div className="toy-category-container">
          <p
            className={`toy-category-option ${
              selectedToyCategory === "Scratch Post" ? "toy-active-category" : ""
            }`}
            onClick={() => handleToyCategoryClick("Scratch Post")}
          >
            Scratch Post
          </p>
          <p
            className={`toy-category-option ${
              selectedToyCategory === "Interactive Toy" ? "toy-active-category" : ""
            }`}
            onClick={() => handleToyCategoryClick("Interactive Toy")}
          >
            Interactive Toy
          </p>
          <p
            className={`toy-category-option ${
              selectedToyCategory === "Feather Toy" ? "toy-active-category" : ""
            }`}
            onClick={() => handleToyCategoryClick("Feather Toy")}
          >
            Feather Toy
          </p>
          <p
            className={`toy-category-option ${
              selectedToyCategory === "Catnip Toy" ? "toy-active-category" : ""
            }`}
            onClick={() => handleToyCategoryClick("Catnip Toy")}
          >
            Catnip Toy
          </p>
      </div>

      {filteredToys.map((toy) => {
        const isAddingToCart = addingToCartId === toy.id;

        return (
          <section key={toy._id} className="toy-section">
            <div className="toy-container">
              <img src={toy.image} alt="" className="toy-image" />
              <div className="toy-details">
                <div className="toy-info">
                  <strong className="toy-meta">
                    {toy.brand} | {toy.type}
                  </strong>
                  <h3>{toy.productName}</h3>
                </div>
                <hr className="toy-divider" />
                <p>
                  <strong className="toy-price">💲{toy.price}</strong>
                </p>
                <p className="toy-rating">
                  Rating: ⭐{toy.rating.stars} | Reviews: {toy.rating.numberOfReviews}
                </p>
                <hr className="toy-divider" />
                <div className="toy-cart-action">
                  {cartItems.some((item) => item.productname === toy.productName) ? (
                    <p className="toy-added-to-cart">Added to Cart</p>
                  ) : (
                    <button
                      className="toy-add-to-cart-button"
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
      <section className="toy-navigation-footer">
        <Link to="/pet-toys" className="toy-nav-link">
          <p>
            <strong>&lt;&lt; Back</strong>
          </p>
        </Link>
        <Link to="/dog-toy" className="toy-nav-link">
          <p>
            <strong>Dog Toys &gt;&gt;</strong>
          </p>
        </Link>
      </section>
    </div>
  );
}

export default Cattoys;
