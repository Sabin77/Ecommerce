import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <>
      <div className="relative bg-[#4A3BB5] ">
        <Link to={"/"}>
          {" "}
          <span className=" absolute left-10 bottom-4 text-xl font-bold">
            HamroStore
          </span>{" "}
        </Link>
        <div className="flex justify-center border-b-2">
          <ul className="flex justify-center space-x-10 font-bold py-4 relative">
            <Link to="/">
              <li>Home</li>
            </Link>
            <div
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
              className="cursor-pointer relative  "
            >
              Products
              {dropdown && (
                <div
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                  className="absolute bg-[#4A3BB5] py-2  -left-5 rounded shadow-md z-10 "
                >
                  <Link
                    to="/category/jewelery"
                    className="block px-4 py-2 hover:bg-[#dfe3f0]"
                  >
                    Jewellery
                  </Link>
                  <Link
                    to="/category/electronics"
                    className="block px-4 py-2 hover:bg-[#dfe3f0]"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/category/men's clothing"
                    className="block px-4 py-2 hover:bg-[#dfe3f0]"
                  >
                    Men Clothing
                  </Link>
                  <Link
                    to="/category/women's clothing"
                    className="block px-4 py-2 hover:bg-[#dfe3f0]"
                  >
                    Women Clothing
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about-us">
              <li>About Us</li>
            </Link>
            <Link to="/contact-us">
              <li>Contact Us</li>
            </Link>
          </ul>
          <Link to="/carts">
            <button className="absolute items-center justify-center gap-2 right-20 top-2 mx-2">
              <IoCartOutline size={30} />
            </button>
          </Link>
          <span className="absolute right-10 text-4xl mx-2 text-red-500 pb-1">
            &hearts;
          </span>
          <div className=" absolute right-3 top-3 text-2xl cursor-pointer">
            <FaUserCircle
              onClick={() => setProfileDropdown(!profileDropdown)}
            />
          </div>
          {profileDropdown && <ProfileDropdown />}
        </div>
      </div>
    </>
  );
}
function ProfileDropdown() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const token = localStorage.getItem("token");

  const handleProfile = () => {};

  const handleLogOut = () => {
    localStorage.removeItem("token");
    // if (!token) {
    // }
    setIsVisible(false);
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={` absolute top-12 right-2 h-28 w-40 border-2 rounded-md shadow-xl z-10 bg-white ${
        isVisible ? "" : "hidden"
      } `}
    >
      <ul>
        <Link to="/profile">
          <li
            onClick={() => {
              handleProfile();
              handleToggleVisibility();
            }}
            className=" block text-xl mt-1 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Profile
          </li>
        </Link>
        <div className=" relative">
          <li
            onClick={() => {
              handleLogOut();
              handleToggleVisibility();
            }}
            className=" block text-xl py-2 hover:bg-gray-100 cursor-pointer"
          >
            Log Out
          </li>
          <MdLogout className=" absolute bottom-3 right-2.5 text-lg " />
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
