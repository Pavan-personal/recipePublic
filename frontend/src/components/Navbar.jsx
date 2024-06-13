import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { authExp } from "../firebase/config";
import axios from "axios";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { loadAtom } from "../recoil/loadAtom";
import { triggerAtom } from "../recoil/triggerAtom";
import BuyCoins from "./BuyCoins";
import { FiMenu, FiX } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { searchAtom } from "../recoil/searchAtom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const [load, setLoad] = useRecoilState(loadAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useRecoilState(searchAtom);
  const ISSERVER = typeof window === "undefined";
  const handleGoogleAuthentication = async () => {
    setLoad(true);
    const googleAuth = new GoogleAuthProvider();
    const googleResponse = await signInWithPopup(authExp, googleAuth);
    if (!ISSERVER) {
      const response = await axios.post("https://recipe-app-opal-five.vercel.app/user/signin", {
        name: googleResponse.user.displayName,
        email: googleResponse.user.email,
        photoURL: googleResponse.user.photoURL,
      });
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setLoad(false);
        setIsMenuOpen(false);
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    toast.success("Logged out successfully!");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search functionality here, you can navigate to a search results page or filter recipes
    console.log("Search query:", searchQuery.trim(), location.pathname);
  };

  return (
    <nav className="py-6 bg-[rgba(0,0,0,0.4)]">
      <div className="mx-auto flex justify-between lg:justify-around items-center px-4 md:px-8">
        <Link to={"/"} className="text-3xl font-extrabold text-white">
          Recipe Zone
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <div
          className={`flex-col md:flex md:flex-row items-center md:gap-8 font-semibold text-white md:block ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <form
            onSubmit={handleSearch}
            className={`relative flex opacity-95 items-center mt-4 md:mt-0 md:mr-4 ${
              location.pathname !== "/recipes" ? "hidden" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full w-64 px-4 bg-[rgba(0,0,0,0.2)] border-slate-400 border py-2 text-slate-100"
            />
            <button
              type="submit"
              className="absolute right-0 mr-3 text-slate-100"
            >
              <FaSearch />
            </button>
          </form>
          <Link
            className="border-b-[3px] pb-[0.05rem] border-transparent hover:border-slate-100 duration-500 cursor-pointer mt-4 md:mt-0"
            to="/recipes"
            onClick={() => {
              setTrigger(!trigger);
              setIsMenuOpen(false);
            }}
          >
            Recipes
          </Link>
          {localStorage.getItem("token") ? (
            <>
              <Link
                className="border-b-[3px] pb-[0.05rem] border-transparent hover:border-slate-100 duration-500 cursor-pointer mt-4 md:mt-0"
                to={"/add"}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Recipes
              </Link>
              <div className="mt-4 md:mt-0">
                <BuyCoins />
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div
                  className="border-b-2 border-transparent duration-500 cursor-pointer font-bold text-sm px-2.5 py-1 scale-95 shadow-xl rounded-md bg-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </>
          ) : (
            <div
              className="border-b-2 border-transparent hover:border-blue-400 duration-500 cursor-pointer mt-4 md:mt-0"
              onClick={handleGoogleAuthentication}
            >
              Sign in
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
