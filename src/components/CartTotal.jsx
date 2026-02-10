import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="font-medium text-slate-800">
            {currency} {subtotal}.00
          </p>
        </div>
        <div className="my-3 h-px bg-slate-200" />
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Shipping Fee</p>
          <p className="font-medium text-slate-800">
            {currency} {deliveryFee}
          </p>
        </div>
        <div className="my-4 h-px bg-slate-200" />
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">Total</p>
          <p className="text-lg font-semibold text-slate-900">
            {currency}
            {total}
          </p>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Taxes and discounts calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
