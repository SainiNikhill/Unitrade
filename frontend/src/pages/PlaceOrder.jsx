import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// You can replace this URL with your preferred COD icon URL or SVG component
const codIconUrl = "https://cdn-icons-png.flaticon.com/512/3081/3081150.png";

const PlaceOrder = () => {
  const { cartItem, products, token, backendUrl, setCartItem } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [meetupAddress, setMeetupAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter cart products
  const cartProducts = products.filter((p) => cartItem[p._id]);

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const handlePlaceOrder = async () => {
    if (!meetupAddress.trim()) {
      toast.error("Please enter meetup address");
      return;
    }
    if (!token) {
      toast.error("Please login to place order");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/order/placeOrder",
        { paymentMethod: "cod", meetupAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Order placed successfully");
        setCartItem({});
        navigate("/order");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Server error while placing order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="place-order-container"
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 30,
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        borderRadius: 10,
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>
        Review Your Cart
      </h2>

      {cartProducts.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: 18 }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, marginBottom: 25 }}>
            {cartProducts.map((product) => (
              <li
                key={product._id}
                style={{
                  marginBottom: 15,
                  paddingBottom: 15,
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 18,
                }}
              >
                <span>{product.title}</span>
                <span style={{ fontWeight: "bold" }}>₹{product.price}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 25,
              textAlign: "right",
              color: "#222",
            }}
          >
            Total: ₹{totalPrice}
          </div>

          <label
            htmlFor="meetupAddress"
            style={{ display: "block", marginBottom: 8, fontWeight: "600" }}
          >
            Meetup Address:
          </label>
          <textarea
            id="meetupAddress"
            rows="4"
            value={meetupAddress}
            onChange={(e) => setMeetupAddress(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              fontSize: 16,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginBottom: 30,
              resize: "vertical",
            }}
            placeholder="Enter meetup location address"
          />

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px 0",
              fontSize: 18,
              backgroundColor: "#4caf50",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#45a049";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#4caf50";
            }}
          >
            <img
              src={codIconUrl}
              alt="COD Icon"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
            {loading ? "Placing Order..." : "Place Order (COD)"}
          </button>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
