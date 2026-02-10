import { useContext, useMemo, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { createOrder, navigate, isAuthenticated, getCartAmount } =
    useContext(ShopContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const isCartEmpty = useMemo(() => getCartAmount() === 0, [getCartAmount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "street",
      "city",
      "state",
      "zip",
      "country",
      "phone",
    ];

    for (const field of required) {
      if (!form[field].trim()) {
        toast.error("Please fill all fields");
        return false;
      }
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Enter a valid email");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (isCartEmpty) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validate()) return;

    const order = createOrder({
      address: form,
      paymentMethod: method,
    });

    if (order) {
      toast.success("Order placed successfully");
      navigate("/orders");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh]">
      <div className="flex flex-col gap-4 w-full sm:max-w-120 section-card p-6">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {!isAuthenticated && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            You are not logged in.{" "}
            <Link to="/login" className="font-semibold underline">
              Login to continue
            </Link>
            .
          </div>
        )}

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <input
          className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
        />
        <input
          className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
          type="text"
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder="Zipcode"
          />
          <input
            className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
        <input
          className="border border-gray-300 rounded-xl py-2 px-3.5 w-full"
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
      </div>

      <div className="mt-6 sm:mt-0">
        <div className="mt-8 min-w-80 section-card p-6">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button
              type="button"
              onClick={() => setMethod("stripe")}
              className={`group flex items-center justify-between rounded-2xl border p-4 transition ${
                method === "stripe"
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full border ${
                    method === "stripe"
                      ? "border-white bg-white"
                      : "border-slate-300"
                  }`}
                  aria-hidden
                />
                <img
                  className={`h-4 ${
                    method === "stripe" ? "brightness-0 invert" : ""
                  }`}
                  src={assets.stripe_logo}
                  alt="Stripe"
                />
              </div>
              <span className="text-xs uppercase tracking-widest">
                Card
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("razorpay")}
              className={`group flex items-center justify-between rounded-2xl border p-4 transition ${
                method === "razorpay"
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full border ${
                    method === "razorpay"
                      ? "border-white bg-white"
                      : "border-slate-300"
                  }`}
                  aria-hidden
                />
                <img
                  className={`h-4 ${
                    method === "razorpay" ? "brightness-0 invert" : ""
                  }`}
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
              </div>
              <span className="text-xs uppercase tracking-widest">
                UPI
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`group flex items-center justify-between rounded-2xl border p-4 transition ${
                method === "cod"
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full border ${
                    method === "cod" ? "border-white bg-white" : "border-slate-300"
                  }`}
                  aria-hidden
                />
                <span className="text-sm font-semibold tracking-wide">
                  Cash on Delivery
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest">
                COD
              </span>
            </button>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="btn-primary text-sm disabled:opacity-60"
              disabled={isCartEmpty}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
