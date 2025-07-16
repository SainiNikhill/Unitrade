import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItem,
    products,
    getCartTotal,
    removeFromCart,
    currency,
    delivery_fee,
  } = useContext(ShopContext);

  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get only products that are in the cart
    const selected = products.filter((p) => cartItem[p._id]);
    setCartProducts(selected);
  }, [products, cartItem]);

  const handleShopMore = () => {
    navigate("/collection"); // or your product listing route
  };

  const handleCheckout = () => {
    navigate("/place-order"); // your checkout route
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border p-4 rounded-md shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {currency}
                      {product.price}
                    </p>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => removeFromCart(product._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4 flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">
                Total: {currency}
                {getCartTotal() + delivery_fee}
              </p>
              <p className="text-sm text-gray-500">
                Includes ₹{delivery_fee} delivery fee
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleShopMore}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Shop More
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
