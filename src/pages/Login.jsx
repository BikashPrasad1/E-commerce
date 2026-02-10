import { useContext, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const { user, login, logout, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login(email.trim());
    navigate("/orders");
  };

  return (
    <div className="pt-16">
      <div className="text-2xl mb-6">
        <Title text1={"ACCOUNT"} text2={"ACCESS"} />
      </div>

      {user ? (
        <div className="max-w-lg section-card p-6">
          <p className="text-sm text-gray-500">Logged in as</p>
          <p className="text-lg font-semibold">{user.email}</p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="btn-primary text-sm"
            >
              View Orders
            </button>
            <button
              onClick={logout}
              className="btn-secondary text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md section-card p-6"
        >
          <p className="text-sm text-gray-600 mb-4">
            Use any email and password for this demo.
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="border border-gray-300 rounded-xl px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-xl px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="btn-primary text-sm"
            >
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
