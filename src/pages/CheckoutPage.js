import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import emailjs from "@emailjs/browser";

function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    transactionId: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setSending(true);

    const orderDetails = cartItems
      .map(
        (item) =>
          `${item.name} - Qty: ${item.quantity} - Rs ${item.price * item.quantity}`
      )
      .join("\n");

    const emailParams = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      transactionId: form.transactionId,
      orderDetails,
    };

    emailjs
      .send(
        "service_5ifgaji",     // Replace with your EmailJS Service ID
        "template_f227eth",    // Replace with your EmailJS Template ID
        emailParams,
        "CsSoeIxb60zruvkFb"    // Replace with your EmailJS Public Key
      )
      .then(() => {
        alert("✅ Order submitted successfully and email sent!");
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          transactionId: "",
        });
        clearCart(); // ✅ Clear cart after success
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        alert("❌ Failed to send order email. Please try again.");
      })
      .finally(() => {
        setSending(false);
      });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-xl font-semibold mb-2">🧾 Order Summary</h3>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x Rs {item.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold text-right text-lg">
              Total: Rs {total}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow space-y-4"
          >
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full border p-2 rounded mt-1"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border p-2 rounded mt-1"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full border p-2 rounded mt-1"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium">Address</label>
              <textarea
                name="address"
                className="w-full border p-2 rounded mt-1"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium">Easypaisa Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                className="w-full border p-2 rounded mt-1"
                value={form.transactionId}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className={`w-full py-2 rounded text-white ${
                sending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } transition`}
            >
              {sending ? "Sending..." : "Submit Order"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
