import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { CiShoppingCart } from "react-icons/ci";

const ProductCard2 = ({ id, image, name, price, description }) => {
  const { addToCart, currency, token, navigate } = useContext(ShopContext);

  const handleClick = () => {
    if (!token) {
      toast.error("Please Login");
      navigate("/login");
      return;
    }
    addToCart(id);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <img
        className="rounded-t-xl w-full h-60 object-cover cursor-pointer"
        src={image[0]}
        alt={name}
        onClick={() => navigate(`/products/${id}`)}
      />

      <div className="p-4 flex flex-col gap-2">
        <h5
          className="text-xl font-semibold text-blue-900 hover:text-blue-700 transition-colors capitalize cursor-pointer"
          onClick={() => navigate(`/products/${id}`)}
        >
          {name}
        </h5>

        <p className="text-gray-600 text-sm leading-snug line-clamp-1">
          {description}
        </p>

        <p className="text-lg font-bold text-green-700">
          {currency} {price}
        </p>

        <button
          onClick={handleClick}
          className="mt-2 w-full  cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500  rounded  transition-all"
        >
          Add To Cart
          <CiShoppingCart  className="w-8 font-extrabold-bold h-5"/>
        </button>
      </div>
    </div>
  );
};

export default ProductCard2;
