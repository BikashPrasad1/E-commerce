import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, currency, isAuthenticated } = useContext(ShopContext);

  if (!isAuthenticated) {
    return (
      <div className=" pt-16 text-center">
        <Title text1={"MY"} text2={"ORDERS"} />
        <p className="mt-6 text-gray-500">
          Please login to view your orders.
        </p>
        <Link
          to="/login"
          className="inline-block mt-4 btn-primary text-sm"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orders.length === 0 ? (
        <div className="mt-8 section-card p-10 text-center text-gray-500">
          No orders yet. Browse the collection and place your first order.
          <div className="mt-4">
            <Link
              to="/collection"
              className="inline-block btn-primary text-sm"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="section-card p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {order.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">
                    {currency}
                    {order.total}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  Items
                </p>
                <div className="flex flex-col gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={`${order.id}-${idx}`}
                      className="flex items-center gap-4 text-sm text-gray-700"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover border border-slate-200"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {currency}
                        {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
