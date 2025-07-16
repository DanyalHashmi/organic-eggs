import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import eggHalf from "../assets/egg-half.jpg";
import eggDozen from "../assets/egg-dozen.jpg";

function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getImage = (name) => {
    if (name.toLowerCase().includes("half")) return eggHalf;
    if (name.toLowerCase().includes("dozen")) return eggDozen;
    return "";
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow flex items-center gap-4 p-4"
              >
                <img
                  src={getImage(item.name)}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded text-lg font-bold"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-green-600 font-bold">
                    Rs {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <p className="text-xl font-bold">Total: Rs {total}</p>
            <Link
              to="/checkout"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
