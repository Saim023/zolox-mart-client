import React, { useContext, useEffect, useRef, useState } from "react";
import { SlUser } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import "../../../src/Global.css";

const Account = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const accountRef = useRef(null);
  const currencyRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }

      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="relative md:font-thin md:text-xs mr-5 text-xs font-thin text-white"
      ref={accountRef}
    >
      <div
        className=" group relative flex items-center gap-2 cursor-pointer"
        onClick={() => setIsAccountOpen(!isAccountOpen)}
      >
        {user?.photoURL ? (
          <>
            {" "}
            <img
              className="w-7 h-7 rounded-full group-hover:text-[#9740a3] transform group-hover:scale-110 transition duration-300 text-base"
              src={`${user?.photoURL}`}
              alt=""
            />
          </>
        ) : (
          <>
            <SlUser className="md:group-hover:text-[#9740a3] text-white md:text-black transform group-hover:scale-110 transition duration-300 text-base" />
          </>
        )}

        <span className="md:group-hover:text-[#9740a3] text-white md:text-black">
          Account
        </span>
      </div>
      <ul
        className={`text-xm text-black font-thin shadow-lg absolute top-full left-0 mt-4 w-[200px] bg-white transition-all duration-500 origin-top z-[9999] transform ${
          isAccountOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        {user?.email ? (
          <>
            <li className="px-4 py-2 hover:bg-gray-100 md:hover:text-[#9740a3]">
              <NavLink to="#">{user?.displayName}</NavLink>
            </li>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-100 md:hover:text-[#9740a3]"
            >
              <NavLink>LOGOUT</NavLink>
            </li>
          </>
        ) : (
          <>
            <li
              onClick={() => setIsAccountOpen(false)}
              className="px-4 py-2 hover:bg-gray-100 md:hover:text-[#9740a3]"
            >
              <NavLink to="/login">Login</NavLink>
            </li>
            <li
              onClick={() => setIsAccountOpen(false)}
              className="px-4 py-2 hover:bg-gray-100 md:hover:text-[#9740a3]"
            >
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}

        <li
          onClick={() => setIsAccountOpen(false)}
          className="px-4 py-2 hover:bg-gray-100 md:hover:text-[#9740a3]"
        >
          <NavLink to="/gift">Gift Certificate</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Account;
