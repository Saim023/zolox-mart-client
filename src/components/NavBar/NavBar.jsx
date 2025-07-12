import React, { useContext, useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoChevronDown, GoGift } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { BsTelephone, BsSearch, BsList } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import { topsData, denimsData } from "../CategoryDropdown/CategoryDropdown";
import { AuthContext } from "../../providers/AuthProvider";
import Account from "../Account/Account";
import useCart from "../../hooks/useCart";

// Currency Data
const currencies = ["BDT", "USD", "GBP"];

const NavBar = () => {
  const [cart] = useCart();

  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [activeDropdown, setActiveDropdown] = useState("");
  const [mobileTopsOpen, setMobileTopsOpen] = useState(false);
  const [mobileDenimsOpen, setMobileDenimsOpen] = useState(false);

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
    <div className="w-full">
      <header className="uppercase w-full">
        {/* Desktop Header */}
        <div
          id="wrapper"
          className="sticky top-0 z-[50] md:flex hidden w-full bg-white shadow-sm"
        >
          <div
            id="header-left"
            className="flex items-center justify-center text-[#9740a3] cursor-pointer"
          >
            <div className="flex flex-col items-end px-4">
              <NavLink to="/" className="text-6xl flex items-center">
                <span className="font-thin">Zol</span>
                <span className="font-bold">ox</span>
              </NavLink>
              <p className="text-base font-thin">Mart</p>
            </div>
          </div>

          <div id="header-right" className="flex-1">
            {/* Header Top */}
            <div className="flex items-center justify-end bg-[#9740a3] text-white text-xs tracking-widest w-full">
              <div className="flex items-center">
                <p className="ml-8 px-4 py-1">
                  New Offer! This Weekend Only! Hurry & Shop Now!
                </p>
                <span className="mx-3">|</span>
                <div
                  id="currency-wrapper"
                  ref={currencyRef}
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="relative flex items-center gap-1 pr-3"
                >
                  <button className="pl-3 py-4 uppercase">
                    Select Currency: {currency}
                  </button>
                  <IoIosArrowDown />

                  <ul
                    className={`text-xs absolute top-11 right-0 mt-2 w-[200px] bg-white shadow-md transition-all duration-500 origin-top z-[9999] transform ${
                      isCurrencyOpen
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 pointer-events-none"
                    }`}
                  >
                    {currencies.map((cur) => (
                      <li
                        key={cur}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrency(cur);
                          setIsCurrencyOpen(false);
                        }}
                        className={`px-4 py-2 hover:bg-gray-100 text-slate-700 hover:text-[#9740a3] cursor-pointer flex justify-between items-center ${
                          currency === cur ? "font-semibold text-[#9740a3]" : ""
                        }`}
                      >
                        {cur}
                        {currency === cur && (
                          <span className="text-[#9740a3] ml-2">✔</span>
                        )}
                      </li>
                    ))}
                    <div className="pyramid-shape"></div>
                  </ul>
                </div>
              </div>
            </div>

            {/* Header Bottom */}
            <div className="flex w-full">
              {/* Nav Links */}
              <div className="h-16 flex-grow flex content-center justify-center items-center px-5 pt-9 text-xs tracking-widest">
                <ul className="flex items-center gap-4">
                  <CategoryDropdown
                    label="Tops"
                    basePath="tops"
                    data={topsData}
                    leftOffset="left-52"
                  />
                  <CategoryDropdown
                    label="Denims"
                    basePath="denims"
                    data={denimsData}
                    leftOffset="left-[142px]"
                  />

                  {/* static links */}
                  <li>
                    <NavLink to="#" className="hover:text-[#9740a3]">
                      Accessories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/party" className="hover:text-[#9740a3]">
                      Party
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#" className="hover:text-[#9740a3]">
                      More
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to="/dashboard/admin"
                      className="hover:text-[#9740a3]"
                    >
                      Admin
                    </NavLink>
                  </li> */}
                </ul>
              </div>

              {/* Right Section */}
              <div className="grid grid-cols-2 gap-4 h-32 pr-5 text-xs tracking-widest">
                {/* Shipping Info */}
                <div className="px-1 w-[350px] hidden special-section">
                  <div className="h-12 border-l-2 border-r-2 flex w-full">
                    <ul className="flex w-full items-center">
                      <li className="group relative flex items-center px-3 py-1 gap-2 border-r-2 flex-1 justify-center">
                        <LiaShippingFastSolid className="group-hover:text-[#9740a3] transform group-hover:scale-110 transition duration-300 text-lg" />
                        <NavLink className="group-hover:text-[#9740a3] truncate">
                          Free Shipping
                        </NavLink>
                      </li>
                      <li className="group relative flex items-center px-3 py-1 gap-2 flex-1 justify-center">
                        <GoGift className="group-hover:text-[#9740a3] transform group-hover:scale-110 transition duration-300 text-lg" />
                        <NavLink className="group-hover:text-[#9740a3] truncate">
                          Special Offer
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="h-12 border-l-2 border-r-2 border-t-2 flex w-full items-center justify-start pl-5 py-1 gap-2">
                    <BsTelephone className="group-hover:text-[#9740a3] transform group-hover:scale-110 transition duration-300 text-base" />
                    <span className="truncate">
                      Customer Care:{" "}
                      <span className="text-gray-400">(+00) 12 3456 890</span>
                    </span>
                  </div>
                </div>

                {/* Account & Cart */}
                <div className="w-[333px] pl-4 relative z-[999] hidden account-section account-section-two account-section-three">
                  <div className="h-12 pt-2 pl-2">
                    <div className="flex items-center gap-4 relative">
                      {/* Account Dropdown */}
                      <Account></Account>

                      {/* Cart */}
                      <div className="group relative flex items-center gap-2 whitespace-nowrap">
                        <IoCartOutline className="group-hover:text-[#9740a3] transform group-hover:scale-110 transition duration-300 text-lg" />
                        <NavLink
                          to="/cart"
                          className="group-hover:text-[#9740a3]"
                        >
                          View Cart{" "}
                          <div className="badge badge-sm bg-[#c081c8] text-white">
                            +{cart.length}
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="h-12 my-2 pr-7 account-section-four">
                    <div className="flex items-center hover:text-[#9740a3] justify-between pr-4 gap-4 bg-[#f7f7f7] text-xs tracking-widest whitespace-nowrap">
                      <input
                        className="bg-[#f7f7f7] text-gray-400 outline-none px-3 py-2 whitespace-nowrap"
                        type="text"
                        placeholder="SEARCH THE STORE"
                      />
                      <BsSearch className="text-lg whitespace-nowrap" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden h-[60px]">
          <div className="flex items-stretch h-full">
            <div
              id="mobile-left"
              className="text-[#9740a3] cursor-pointer bg-white w-1/5 flex items-center px-3"
            >
              <NavLink to="/" className="whitespace-nowrap">
                <span className="text-2xl">Zol</span>
                <span className="text-2xl font-bold">ox</span>{" "}
                <span className="text-xs">Mart</span>
              </NavLink>
            </div>

            <div
              id="mobile-right"
              className="bg-[#9740a3] w-4/5 flex items-center justify-end h-full px-3"
            >
              {/*Mobile Account */}
              <Account></Account>

              {/*Mobile Cart */}
              <div className="group relative flex items-center gap-1 mr-5 text-white font-thin text-xs">
                <IoCartOutline className=" transform group-hover:scale-110 transition duration-300 text-lg" />
                <NavLink className="">
                  Cart{" "}
                  <div className="badge badge-sm bg-[#c081c8] text-white">
                    +{cart.length}
                  </div>
                </NavLink>
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <BsList className="text-2xl text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#f7f7f7] p-4 absolute top-[60px] left-0 w-full z-50 shadow-md font-thin">
            {/* Search Bar */}
            <div className="px-4 py-1 mb-5 border bg-white w-full shadow-sm">
              <div className="flex items-center hover:text-[#9740a3] justify-between pr-4 gap-2 text-xs tracking-widest">
                <input
                  className=" text-gray-400 outline-none px-3 py-2 w-full"
                  type="text"
                  placeholder="SEARCH THE STORE"
                />
                <BsSearch className="text-lg" />
              </div>
            </div>
            <ul className="flex flex-col space-y-2">
              {/* Tops */}
              <li className="group relative">
                <div
                  onClick={() => setMobileTopsOpen(!mobileTopsOpen)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="group-hover:text-[#9740a3]">Tops</span>
                  <GoChevronDown
                    className={`group-hover:text-[#9740a3] transition-transform duration-300 ${
                      mobileTopsOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {mobileTopsOpen && (
                  <ul
                    id="mobile-dropdown-group"
                    className="pl-4 mt-2 space-y-1"
                  >
                    {topsData.map((section) => (
                      <li key={section.category} className="group relative">
                        <div
                          onClick={() => {
                            if (activeDropdown === section.category) {
                              setActiveDropdown("");
                            } else {
                              setActiveDropdown(section.category);
                            }
                          }}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <span className="text-sm text-gray-700">
                            {section.category}
                          </span>
                          <GoChevronDown
                            className={`text-xs transition-transform duration-300 ${
                              activeDropdown === section.category
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </div>
                        {activeDropdown === section.category && (
                          <ul className="pl-4 mt-1 space-y-1">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="text-xs text-gray-600 py-1"
                              >
                                <NavLink
                                  to={`/tops/${section.category
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}/${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {item}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Denims */}
              <li className="group relative">
                <div
                  onClick={() => setMobileDenimsOpen(!mobileDenimsOpen)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="group-hover:text-[#9740a3]">Denims</span>
                  <GoChevronDown
                    className={`group-hover:text-[#9740a3] transition-transform duration-300 ${
                      mobileDenimsOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {mobileDenimsOpen && (
                  <ul
                    id="mobile-dropdown-group"
                    className="pl-4 mt-2 space-y-1"
                  >
                    {denimsData.map((section) => (
                      <li key={section.category} className="group relative">
                        <div
                          onClick={() => {
                            if (activeDropdown === section.category) {
                              setActiveDropdown("");
                            } else {
                              setActiveDropdown(section.category);
                            }
                          }}
                          className="flex items-center gap-1 cursor-pointer"
                        >
                          <span className="text-sm text-gray-700">
                            {section.category}
                          </span>
                          <GoChevronDown
                            className={`text-xs transition-transform duration-300 ${
                              activeDropdown === section.category
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </div>
                        {activeDropdown === section.category && (
                          <ul className="pl-4 mt-1 space-y-1">
                            {section.items.map((item) => (
                              <li
                                key={item}
                                className="text-xs text-gray-600 py-1"
                              >
                                <NavLink
                                  to={`/denims/${section.category
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}/${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {item}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Other links */}
              <li>
                <NavLink
                  to="#"
                  className="hover:text-[#9740a3]"
                  onClick={() => setMenuOpen(false)}
                >
                  Accessories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/party"
                  className="hover:text-[#9740a3]"
                  onClick={() => setMenuOpen(false)}
                >
                  Party
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="hover:text-[#9740a3]"
                  onClick={() => setMenuOpen(false)}
                >
                  More
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/secret"
                  className="hover:text-[#9740a3]"
                  onClick={() => setMenuOpen(false)}
                >
                  Secret
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="hover:text-[#9740a3]"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className="hover:text-[#9740a3]"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
