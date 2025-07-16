import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch all products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch user's cart
  const getUserCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/cart/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const cart = res.data.cart.reduce((acc, product) => {
          acc[product._id] = true;
          return acc;
        }, {});
        setCartItem(cart);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching cart");
    }
  };

  // Get total number of items in cart
  const getCartCount = () => {
    return Object.keys(cartItem).length;
  };

  // Get total price of cart items
  const getCartTotal = () => {
    let total = 0;
    Object.keys(cartItem).forEach((productId) => {
      const product = products.find((p) => p._id === productId);
      if (product) {
        total += product.price;
      }
    });
    return total;
  };

  // Add item to cart
  const addToCart = async (productId) => {
    if (cartItem[productId]) {
      toast.error("Item already in cart");
      return;
    }

    setCartItem((prev) => ({ ...prev, [productId]: true }));

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Added to cart");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Error adding to cart");
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const updatedCart = { ...cartItem };
    delete updatedCart[productId];
    setCartItem(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/remove`,
          { productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Removed from cart");
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Error removing from cart"
        );
      }
    }
  };

  // Fetch products on mount
  useEffect(() => {
    getProductsData();
  }, []);

  // Fetch cart when token is set
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  // Load token from localStorage on mount
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // Shared context value
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    token,
    setToken,
    setCartItem,
    backendUrl,
    navigate,
    addToCart,
    removeFromCart,
    getUserCart,
    getCartTotal,
    getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
