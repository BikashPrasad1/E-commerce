import { useContext, useEffect, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { setShowSearch, getCartCount, user, logout, navigate } =
    useContext(ShopContext);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Collection", to: "/collection" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  /* ---------------- BODY SCROLL LOCK ---------------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  /* ---------------- HANDLERS ---------------- */
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="sticky top-3 rounded-full z-50 glass">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link to="/" aria-label="Home" className="flex items-center gap-2">
            <img src={assets.logo} alt="Brand logo" className="w-28" />
            <span className="hidden sm:inline text-xs tracking-[0.3em] text-slate-500">
              ATELIER
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative ${
                      isActive ? "text-slate-900" : "hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="tracking-wide">{item.label}</span>
                      <span
                        aria-hidden
                        className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-slate-900 transition-transform duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <button
              aria-label="Search"
              className="hover:opacity-70"
              onClick={() => {
                setShowSearch(true);
                navigate("/collection");
              }}
            >
              <img src={assets.search_icon} alt="" className="w-5" />
            </button>

            {/* Profile */}
            <div className="group relative">
              <img src={assets.profile_icon} alt="Profile" className="w-5 cursor-pointer" />
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-44 py-3 px-5 bg-white text-gray-600 shadow-lg rounded-xl border border-slate-100">
                  {user ? (
                    <>
                      <button
                        onClick={() => navigate("/orders")}
                        className="text-left hover:text-black"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={logout}
                        className="text-left hover:text-black"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="text-left hover:text-black"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative hover:opacity-70"
            >
              <img src={assets.cart_icon} alt="" className="w-5" />
              <p className="absolute right-[-6px] bottom-[-6px] w-4 text-center leading-4 bg-slate-900 text-white aspect-square rounded-full text-[8px]">
                {getCartCount()}
              </p>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={openMenu}
              className="md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <img src={assets.menu_icon} alt="" className="w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={closeMenu}
          aria-hidden
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      <aside
        id="mobile-menu"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={closeMenu} aria-label="Close menu">
            Close
          </button>
        </div>

        <nav className="flex flex-col py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `px-6 py-3 text-sm ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
