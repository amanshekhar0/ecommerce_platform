import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " />
          <p className="w-full md:w-2/3 text-gray-600">
  Discover timeless fashion with premium quality and unbeatable style.  
  Crafted for comfort, designed for elegance – because you deserve the best!
</p>

        </div>
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVICY POLICY</li>
          </ul>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
            <li>9532410400</li>
            <li>amanshekhar000@gmail.com</li>
          
        </ul>
        </div>
     

      </div>
      <div >
    <hr />
    <p className="py-t text-sm text-center">Copywrite 2025 @ amanshekhar - All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
