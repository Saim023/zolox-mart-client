import React from "react";
import { NavLink } from "react-router-dom";
import cardImg1 from "../../assets/cards/american-1.png";
import cardImg2 from "../../assets/cards/discover-1.png";
import cardImg3 from "../../assets/cards/visa-2.png";
import cardImg4 from "../../assets/cards/stripe-1.png";
import cardImg5 from "../../assets/cards/mastercard-gold.png";
import cardImg6 from "../../assets/cards/paypal-1.png";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { PiMapPinLineLight } from "react-icons/pi";
import DynamicDate from "../DynamicDate/DynamicDate";
import Subscribe from "../Subscribe/Subscribe";

const Footer = () => {
  return (
    <div>
      <Subscribe></Subscribe>
      {/* Footer-1 */}
      <footer className="footer sm:footer-horizontal bg-[#f7f7f7] text-base-content p-10">
        <aside className="space-y-6">
          <div className="uppercase text-3xl leading-tight">
            <span className="font-thin">Zolox</span>{" "}
            <span className="text-[#9740a3] font-thin">
              Ma<span className="font-bold">rt</span>
            </span>
          </div>
          <div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 relative group">
                <PiMapPinLineLight className="text-xl group-hover:text-[#9740a3] mt-2" />
                <div>
                  <p className="mt-1">33 New Montgomery, San Francisco</p>
                  <p className="mt-1">CA, USA 94105</p>
                </div>
              </li>
              <li className="flex items-center gap-2 relative group">
                <BsTelephone className="text-lg group-hover:text-[#9740a3] mt-[3px] pt-[2px]" />
                <span>(+00) 12 3456 890</span>
              </li>
              <li className="flex items-center gap-2 relative group">
                <TfiEmail className="text-lg group-hover:text-[#9740a3] mt-[2px] pt-[2px]" />
                <span>testing@gmail.com</span>
              </li>
            </ul>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      {/* Footer-2 */}
      <footer className="footer sm:footer-horizontal bg-[#9740a3] text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <p>
            &copy; {new Date().getFullYear()} Md. Saim Hossain. All rights
            reserved.
          </p>
        </aside>
        <div>
          <DynamicDate></DynamicDate>
        </div>
        <nav className="grid-flow-col gap-2 md:place-self-center md:justify-self-end">
          <NavLink>
            <div className="w-12">
              <img src={cardImg1} alt="" />
            </div>
          </NavLink>
          <NavLink>
            <div className="w-12">
              <img src={cardImg2} alt="" />
            </div>
          </NavLink>
          <NavLink>
            <div className="w-12">
              <img src={cardImg3} alt="" />
            </div>
          </NavLink>
          <NavLink>
            <div className="w-12">
              <img src={cardImg4} alt="" />
            </div>
          </NavLink>
          <NavLink>
            <div className="w-12">
              <img src={cardImg5} alt="" />
            </div>
          </NavLink>
          <NavLink>
            <div className="w-12 mt-[10px] py-[9px] px-1 bg-[#f2f2f2f2] rounded-sm">
              <img src={cardImg6} alt="" />
            </div>
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
