import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row border border-gray-200 bg-white h-auto sm:h-[600px]">
   
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-16 px-6 sm:px-10">
        <div className="text-[#414141] space-y-4">
         
          <div className="flex items-center gap-2">
            <div className="w-8 h-[1.5px] bg-[#414141]"></div>
            <p className="font-medium text-sm tracking-wide">Our best sellers</p>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-light leading-tight prata-regular">
              Latest 
              <span className="block mt-1">Arrivals</span>
            </h1>
            <p className="text-gray-600 max-w-md text-sm">
              Discover our newest collection of premium fashion
            </p>
          </div>

          <div className="pt-3">
            <button className="group flex items-center gap-2 hover:gap-3 transition-all duration-300">
              <span className="font-semibold text-sm tracking-wide">SHOP NOW</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-6 grid grid-cols-3 gap-6 border-t border-gray-100 mt-8">
            <div>
              <p className="text-xl font-semibold">50+</p>
              <p className="text-xs text-gray-600">Brands</p>
            </div>
            <div>
              <p className="text-xl font-semibold">1000+</p>
              <p className="text-xs text-gray-600">Products</p>
            </div>
            <div>
              <p className="text-xl font-semibold">5k+</p>
              <p className="text-xs text-gray-600">Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-6">
        <img 
          className="max-h-[60vh] w-auto max-w-full object-contain" 
          src={assets.rohit} 
          alt="Latest Fashion Collection" 
        />
      </div>
    </div>
  );
};

export default Hero;
