import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard2 from "../components/ProductCard2"; // Adjust path if needed
import Title from "../components/Title";

const categories = [
  "All",
  "Books",
  "Electronics",
  "Furniture",
  "Clothing",
  "Stationery",
  "Others",
];

const Collections = () => {
  const { products, token, navigate } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products) return;

    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-zinc-100 p-6 md:p-12 mt-10">
      <Title text1={'COLLECTIONS'} text2={""}/>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? "bg-zinc-900 text-white"
                : "bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-zinc-600 text-lg">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard2
              key={product._id}
              id={product._id}
              image={product.images}
              name={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
