import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate } =
    useContext(ShopContext);

  const cartData = [];
  for (const productId in cartItem) {
    for (const size in cartItem[productId]) {
      if (cartItem[productId][size] > 0) {
        cartData.push({
          _id: productId,
          size: size,
          quantity: cartItem[productId][size],
        });
      }
    }
  }
  return (
    <div className="pt-14">
      <div className="text-2xl mb-6 flex items-center justify-between">
        <Title text1={"YOUR"} text2={"CART"} />
        <p className="text-sm text-slate-500">
          {cartData.length} item{cartData.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {cartData.length === 0 ? (
            <div className="section-card py-12 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id,
              );
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="section-card p-5 text-gray-700 grid grid-cols-[3fr_1fr] sm:grid-cols-[3fr_1fr_0.5fr] items-center gap-4 mb-5"
                >
                  <div className="flex items-start gap-5">
                    <img
                      className="h-20 w-20 rounded-xl border border-slate-200 object-cover"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-semibold text-slate-900">
                        {productData.name}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-medium text-slate-700">
                          {currency}
                          {productData.price}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                          Size {item.size}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.size,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                            className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-40"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            onChange={(e) =>
                              e.target.value === "" || e.target.value === "0"
                                ? null
                                : updateQuantity(
                                    item._id,
                                    item.size,
                                    Number(e.target.value),
                                  )
                            }
                            className="w-10 bg-transparent text-center text-sm text-slate-800 outline-none"
                            type="number"
                            min={1}
                            value={item.quantity}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="px-3 py-1 text-sm text-slate-600 hover:text-slate-900"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.size, 0)}
                          className="text-md font-semibold text-slate-500 hover:text-slate-900"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-max">
          <div className="section-card p-6">
            <CartTotal />
            <div className="mt-6 w-full">
              <button
                onClick={() => navigate("/place-order")}
                className="btn-primary text-sm w-full disabled:opacity-60"
                disabled={cartData.length === 0}
              >
                PROCEED TO PAY
              </button>
              <button
                onClick={() => navigate("/collection")}
                className="btn-secondary text-sm w-full mt-3"
              >
                Continue Shopping
              </button>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            Free delivery on orders above {currency}499.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
