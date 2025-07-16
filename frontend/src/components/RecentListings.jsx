import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductCard2 from "./ProductCard2";

const RecentListings = () => {
  const { products ,navigate } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 flex flex-col items-center ">
      <div className="text-center  py-8 text-3xl">
        <Title text1={"RECENT"} text2={"PRODUCTS"} />
      </div>

      {/* rendering the products  */}
      <div className=" p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductCard2
            key={index}
            id={item._id}
            image={item.images}
            name={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>

      {/* button */}
      <div onClick={() => navigate('/collection')} className="flex items-center justify-center text-white cursor-pointer">
        <div className="relative bg-black flex items-center justify-between px-4 rounded w-50  h-12 font-['Neue_Montreal'] transition-all duration-300 backdrop-blur-md hover:bg-zinc-900 group">
          <h1 className="z-10">More Products</h1>
          <div className="relative flex items-center justify-center mt-1">
            {/* Dot with Arrow */}
            <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-6 group-hover:h-6 flex items-center justify-center">
              <svg
                className="opacity-0 group-hover:opacity-100 w-4 h-4 transition-opacity duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentListings;
