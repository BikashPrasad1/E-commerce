import { useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname !== "/collection") {
          setShowSearch(false);
        }
    }, [location.pathname, setShowSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/collection");
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== "/collection") {
      navigate("/collection");
    }
  };

  return showSearch ? (
    <div className="border-t border-slate-200 bg-white/80 text-center backdrop-blur">
      <form
        className="inline-flex items-center justify-center border border-slate-300 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2 shadow-sm bg-white"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search products..."
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <button type="submit" aria-label="Search">
          <img src={assets.search_icon} alt="" className="w-4" />
        </button>
      </form>
      <img
        src={assets.cross_icon}
        alt=""
        className="inline w-3 cursor-pointer opacity-70 hover:opacity-100"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
