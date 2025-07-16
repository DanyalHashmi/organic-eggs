import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import eggHalf from "../assets/egg-half.jpg";
import eggFull from "../assets/egg-dozen.jpg";

function HomePage() {
  const { addToCart } = useContext(CartContext);
  const [addedMsg, setAddedMsg] = useState("");

  const products = [
    {
      id: 1,
      name: "Organic Eggs - Half Dozen",
      price: 180,
      image: eggHalf,
    },
    {
      id: 2,
      name: "Organic Eggs - Dozen",
      price: 350,
      image: eggFull,
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMsg(`${product.name} added to cart!`);
    setTimeout(() => setAddedMsg(""), 2000); // Hide after 2 seconds
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        Buy Organic Eggs
      </h1>

      {addedMsg && (
        <p className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 shadow">
          {addedMsg}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-green-700 font-bold mb-3">
                Rs {product.price}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
