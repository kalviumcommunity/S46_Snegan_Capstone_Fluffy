import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../A_HomeComponents/Navbars.jsx";
import { useNavigate } from "react-router-dom";

const Carts = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:1001/main/yourcart");
      if (response.data && Array.isArray(response.data)) {
        const updatedItems = response.data.map((item) => ({
          ...item,
          quantity: parseInt(item.quantity, 10) || 1,
        }));
        setItems(updatedItems);
      } else {
        console.error("Invalid data format received from server");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleQuantityChange = async (productId, change) => {
    try {
      const updatedItems = items.map((item) => {
        if (item._id === productId) {
          const newQuantity = item.quantity + change;
          return {
            ...item,
            quantity: newQuantity > 0 ? newQuantity : item.quantity,
          };
        }
        return item;
      });
      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const calculateTotalCartValue = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.productprice * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1001/main/addtocart/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      await axios.delete("http://localhost:1001/main/yourcart/clear");
      setItems([]);
      alert("Checkout successful! All items will be removed from your cart.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ margin: "50px" }}>
        <h2 style={{ paddingBottom: "30px", fontSize: "4em", textAlign: "center" }}>Cart🛒</h2>
        {items && items.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Image</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Product Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Quantity</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Total Price</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td style={{ border: "1px solid black", textAlign: "center" }}>
                    <img src={item.productimage} alt={item.productname} style={{ height: "60px" }} />
                  </td>
                  <td style={{ border: "1px solid black", textAlign: "center" }}>{item.productname}</td>
                  <td style={{ border: "1px solid black", textAlign: "center", width: "10vw" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid black",
                        margin: "10px",
                      }}
                    >
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        style={{ padding: "5px 10px" }}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <p style={{ margin: "0 10px" }}>{item.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        style={{ padding: "5px 10px" }}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </td>
                  <td style={{ border: "1px solid black", textAlign: "center" }}>
                    💲{item.productprice}
                  </td>
                  <td style={{ border: "1px solid black", textAlign: "center" }}>
                    💲{(item.productprice * item.quantity).toFixed(2)}
                  </td>
                  <td style={{ border: "1px solid black", textAlign: "center" }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                      alt="Delete"
                      onClick={() => handleDelete(item._id)}
                      style={{ height: "25px", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        )}
        {items.length > 0 && (
          <>
            <p style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Cart Value: 💲{calculateTotalCartValue()}
            </p>
            <button
              onClick={handleCheckout}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#27408B",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "block",
                marginLeft: "auto",
              }}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Carts;
