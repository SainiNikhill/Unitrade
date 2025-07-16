// pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {toast} from 'react-toastify'
import { addToCart } from "../../../backend/controllers/cartController";

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, token , addToCart} = useContext(ShopContext);
  const product = products.find((p) => p._id === productId);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      {product ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-xl"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-500 mb-4">{product.category}</p>
            <p className="text-lg font-semibold text-indigo-600 mb-4">
              ₹{product.price}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <button
              onClick={() => {
                if (!token) {
                  toast.error("Please log in to add items to the cart.");
                  return;
                }
                addToCart(productId)
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
