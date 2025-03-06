import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../src/assets/imgs/freshcart-logo.svg";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getLinkClass = (path) =>
    location.pathname === path ? "text-green-700 font-bold" : "hover:text-green-500";

  return (
    <>
      <div className="pt-11 flex justify-center items-center">
        <nav
          className={`bg-green-100 flex items-center justify-between text-green-900 fixed z-10 w-[94%] rounded-full transition-all duration-300 ${
            isScrolled ? "py-2 shadow-lg" : "py-5"
          }`}
        >
          
          <Link to="/">
            <div className="px-5">
              <img
                src={Logo}
                alt="logo"
                className={`transition-all duration-300 ${isScrolled ? "h-8" : "h-8"}`}
              />
            </div>
          </Link>

          
          <div className="hidden lg:flex items-center space-x-7">
            {token && (
              <ul className="flex space-x-7">
                <li>
                  <Link to="/" className={getLinkClass("/")}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className={getLinkClass("/cart")}>
                    Cart
                    <span className="bg-red-600 text-white px-1 rounded">{numOfCartItems}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className={getLinkClass("/wishlist")}>
                    Wish List
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className={getLinkClass("/categories")}>
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/brands" className={getLinkClass("/brands")}>
                    Brands
                  </Link>
                </li>
                <li>
                  <Link to="/products" className={getLinkClass("/products")}>
                    Products
                  </Link>
                </li>
              </ul>
            )}
          </div>

          
          <div className="flex items-center space-x-4 px-5">
           
            <div className="hidden lg:flex space-x-3">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-tiktok"></i>
              <i className="fab fa-youtube"></i>
            </div>

            
            {token ? (
              <button
                className="text-green-900 bg-white rounded-full px-2 pb-0.5 font-medium text-center"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  className="text-green-900 bg-white rounded-full px-2 pb-0.5 font-medium text-center"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="text-green-900 bg-white rounded-full px-2 pb-0.5 font-medium text-center"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}

           
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>

      
      {menuOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-20">
    
    <div className="w-2/3 sm:w-1/3 bg-white/90 h-full p-5 shadow-lg transform translate-x-0 transition-transform duration-300">
     
      <button
        className="text-xl mb-4"
        onClick={() => setMenuOpen(false)}
      >
        <i className="fas fa-times"></i>
      </button>

      
      <ul className="flex flex-col space-y-4 text-lg">
        <li>
          <Link to="/" className={getLinkClass("/")} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className={getLinkClass("/cart")} onClick={() => setMenuOpen(false)}>
            Cart <span className="bg-red-600 text-white px-1 rounded">{numOfCartItems}</span>
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className={getLinkClass("/wishlist")} onClick={() => setMenuOpen(false)}>
            Wish List
          </Link>
        </li>
        <li>
          <Link to="/categories" className={getLinkClass("/categories")} onClick={() => setMenuOpen(false)}>
            Categories
          </Link>
        </li>
        <li>
          <Link to="/brands" className={getLinkClass("/brands")} onClick={() => setMenuOpen(false)}>
            Brands
          </Link>
        </li>
        <li>
          <Link to="/products" className={getLinkClass("/products")} onClick={() => setMenuOpen(false)}>
            Products
          </Link>
        </li>
      </ul>
    </div>
  </div>
)}
    </>
  );
}