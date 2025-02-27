import React from "react";

const Newsletterbox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault()

    }
  return (
    <div className="text-center py-10 bg-gray-100 rounded-xl shadow-lg">
    
      <p className="text-3xl font-semibold text-gray-800 mb-2">
        Subscribe Now & Get 20% Off
      </p>

     
      <p className="text-gray-500 text-sm mb-6 px-4">
        Stay updated with our latest collections and exclusive deals.
      </p>

     
      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 mx-auto flex items-center gap-3"aria-required>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-required="true"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-6 py-3 rounded-md transition-transform duration-300 hover:scale-105"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletterbox;
