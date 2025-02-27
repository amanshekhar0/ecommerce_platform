import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import Newsletterbox from "../components/Newsletterbox";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="Contact" text2="Us" />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-16 mb-28">
        <div className="relative">
          <img
            src={assets.contact_img}
            alt="Store Front"
            className="w-full md:max-w-[480px] rounded-lg shadow-md object-cover"
          />
          <div className="absolute inset-0 bg-black/5 rounded-lg"></div>
        </div>

        <div className="flex flex-col justify-center items-start gap-8 md:max-w-[400px]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Our Store</p>
                <p className="text-gray-600">Japlin Ganj, Ballia</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Phone className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <a 
                  href="tel:9532410400" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +91 9532410400
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Mail className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <a 
                  href="mailto:amanshekhar000@gmail.com" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  amanshekhar000@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-4"></div>

          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-full">
                <Briefcase className="w-5 h-5 text-gray-700" />
              </div>
              <p className="text-gray-600">Learn more about our team and job openings</p>
            </div>
            
            <button onClick={() => window.open("https://www.linkedin.com/in/amanshekhar000/","_blank")} className="w-full border-2 border-gray-900 px-8 py-4 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-md flex items-center justify-center gap-2 group">
              Explore jobs
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          <div className="w-full bg-gray-50 p-6 rounded-lg mt-6">
            <p className="text-sm text-gray-600">
              Store Hours: <br />
              Monday - Saturday: 10:00 AM - 8:00 PM <br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
      <Newsletterbox/>
    </div>
  );
};

export default Contact;