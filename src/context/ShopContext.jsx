import { createContext, useMemo, useState, useCallback, useEffect } from "react";
import { products as initialProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

const CART_KEY = "ecommers_cart";
const ORDERS_KEY = "ecommers_orders";
const USER_KEY = "ecommers_user";

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const ShopContextProvider = ({ children }) => {
  const currency = "\u20B9";
  const deliveryFee = 50;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState(() => readJSON(CART_KEY, {}));
  const [orders, setOrders] = useState(() => readJSON(ORDERS_KEY, []));
  const [user, setUser] = useState(() => readJSON(USER_KEY, null));
  const navigate = useNavigate();

  const addToCart = useCallback(
    async (itemId, size) => {
      if (!size) {
        toast.error("Select Product Size");
        return;
      }

      const cartData = structuredClone(cartItem);
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
      setCartItem(cartData);
    },
    [cartItem]
  );

  const getCartCount = useCallback(() => {
    let totalCount = 0;
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          totalCount += cartItem[itemId][size];
        }
      }
    }
    return totalCount;
  }, [cartItem]);

  const updateQuantity = useCallback(
    async (itemId, size, quantity) => {
      const cartData = structuredClone(cartItem);
      if (!cartData[itemId]) return;

      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }
      setCartItem(cartData);
    },
    [cartItem]
  );

  const getCartAmount = useCallback(() => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
      const itemInfo = initialProducts.find(
        (product) => product._id === itemId
      );
      if (!itemInfo) continue;
      for (const size in cartItem[itemId]) {
        const qty = cartItem[itemId][size];
        if (qty > 0) {
          totalAmount += itemInfo.price * qty;
        }
      }
    }
    return totalAmount;
  }, [cartItem]);

  const clearCart = useCallback(() => {
    setCartItem({});
  }, []);

  const getCartItemsArray = useCallback(() => {
    const items = [];
    for (const itemId in cartItem) {
      const itemInfo = initialProducts.find(
        (product) => product._id === itemId
      );
      if (!itemInfo) continue;
      for (const size in cartItem[itemId]) {
        const quantity = cartItem[itemId][size];
        if (quantity > 0) {
          items.push({
            productId: itemId,
            name: itemInfo.name,
            size,
            quantity,
            price: itemInfo.price,
            image: itemInfo.image?.[0] || "",
          });
        }
      }
    }
    return items;
  }, [cartItem]);

  const createOrder = useCallback(
    ({ address, paymentMethod }) => {
      const items = getCartItemsArray();
      if (!items.length) {
        toast.error("Your cart is empty");
        return null;
      }

      const subtotal = getCartAmount();
      const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        address,
        status: "Processing",
      };

      setOrders((prev) => [order, ...prev]);
      clearCart();
      return order;
    },
    [getCartAmount, getCartItemsArray, deliveryFee, clearCart]
  );

  const login = useCallback((email) => {
    const nextUser = { email };
    setUser(nextUser);
    toast.success("Logged in");
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    toast.info("Logged out");
  }, []);

  const isAuthenticated = Boolean(user && user.email);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItem));
  }, [cartItem]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const value = useMemo(
    () => ({
      products: initialProducts,
      currency,
      deliveryFee,
      search,
      setSearch,
      showSearch,
      setShowSearch,
      cartItem,
      addToCart,
      getCartCount,
      updateQuantity,
      getCartAmount,
      navigate,
      clearCart,
      orders,
      createOrder,
      user,
      login,
      logout,
      isAuthenticated,
    }),
    [
      currency,
      deliveryFee,
      search,
      showSearch,
      cartItem,
      addToCart,
      getCartCount,
      updateQuantity,
      getCartAmount,
      navigate,
      clearCart,
      orders,
      createOrder,
      user,
      login,
      logout,
      isAuthenticated,
    ]
  );

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
