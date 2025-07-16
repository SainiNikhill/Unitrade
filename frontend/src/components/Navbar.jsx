import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { navigate, token, setToken, getCartCount ,setCartItem} = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
    setCartItem({})
  };

  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div
      className={`h-18 w-full flex items-center p-3 justify-between z-[9999] fixed bg-white/10 backdrop-blur-md shadow-md transition-all duration-500  ${
        isVisible ? "top-0" : "-top-20"
      }`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <h1 className='text-3xl font-["League_Spartan"]'>unitrade.</h1>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-xl text-gray-700">
        <NavLink to="/" className="flex flex-col items-center">
          <p>Home</p>

          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center">
          <p>Collection</p>

          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center">
          <p>About</p>

          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center">
          <p>Contact</p>

          <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Show Sign Up / Login buttons only if NO token */}
        {!token && (
          <div className="gap-4 flex -ml-30">
            <button
              onClick={() =>
                navigate("/login", { state: { authMode: "Sign Up" } })
              }
              className="px-3 py-2 rounded hover:bg-gray-200"
            >
              Sign Up
            </button>
            <button
              onClick={() =>
                navigate("/login", { state: { authMode: "Login" } })
              }
              className="bg-zinc-950 rounded-3xl text-white px-3 py-2"
            >
              Login
            </button>
          </div>
        )}

        {/* Show Create Product and Profile menu only if logged in */}
        {token && (
          <>
            <Link
              to={"/create-product"}
              className="w-10 h-10 flex text-white cursor-pointer items-center justify-center rounded-full bg-blue-600"
            >
              <FaPlus />
            </Link>

            <div className="group relative">
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
              {/* Dropdown */}
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-1000">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg">
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p className="cursor-pointer hover:text-black">Orders</p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

        <Link to="/cart" className="relative right-2">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="sm:hidden w-5 cursor-pointer"
          alt=""
        />

        {/* Hamburger menu */}
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            visible ? "w-full" : "w-0"
          } `}
        >
          <div className="flex flex-col gap-3 justify-center">
            <div className="flex items-center rounded-full p-4 ">
              <RxCross2
                onClick={() => setVisible(false)}
                className="font-bold cursor-pointer text-2xl"
              />
            </div>

            <div className="flex flex-col text-gray-700">
              <NavLink
                onClick={() => setVisible(false)}
                to="/"
                className="text-lg border-b border-t hover:text-gray-800 w-full p-2"
              >
                HOME
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/products"
                className="text-lg border-b hover:text-gray-800 w-full p-2"
              >
                PRODUCTS
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to="/contact"
                className="text-lg border-b hover:text-gray-800 w-full p-2"
              >
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
