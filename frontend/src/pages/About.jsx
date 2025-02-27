import React from "react";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets";

const About = () => {
  const features = [
    {
      title: "Premium Quality",
      description: "Carefully curated collection of high-quality fashion and lifestyle products from top brands",
      icon: "👕"
    },
    {
      title: "Fast Shipping",
      description: "Quick delivery with real-time tracking and hassle-free returns",
      icon: "🚚"
    },
    {
      title: "Style Expertise",
      description: "Fashion experts ready to help you find the perfect style that matches your personality",
      icon: "✨"
    },
    {
      title: "Secure Shopping",
      description: "100% secure payment processing and protection of your personal information",
      icon: "🔒"
    }
  ];

  const stats = [
    { number: "10K+", text: "Happy Customers" },
    { number: "1000+", text: "Products" },
    { number: "50+", text: "Brands" },
    { number: "24/7", text: "Support" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg object-cover"
          src={assets.about_img}
          alt="Fashion Store Display"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <h2 className="text-3xl font-bold text-gray-800">Your Style, Your Story</h2>
          <p className="text-lg">
            Welcome to your ultimate fashion destination. Since our founding, we've been passionate about bringing you the latest trends, timeless classics, and everything in between. Our carefully curated collection features premium clothing and lifestyle products that help you express your unique style.
          </p>
          <p className="text-lg">
            We believe that fashion is more than just clothing – it's about confidence, self-expression, and feeling amazing in what you wear. That's why we work directly with top brands and designers to bring you quality pieces at great values.
          </p>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Promise</h3>
            <p className="text-lg">
              We're committed to making your shopping experience exceptional. From personalized style recommendations to hassle-free returns, we ensure that finding your perfect look is always a pleasure, never a chore.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-6 rounded-xl my-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600">{stat.number}</div>
              <div className="text-gray-600 mt-2">{stat.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <Title text1={"Why"} text2={"CHOOSE US"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-lg px-6 py-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-12 rounded-xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Our Commitment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quality</h3>
            <p className="text-gray-600">Premium products from trusted brands and designers</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Sustainability</h3>
            <p className="text-gray-600">Environmentally conscious fashion choices</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <p className="text-gray-600">Dedicated support for all your fashion needs</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-12 rounded-xl mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">Shopping With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Easy Returns</h3>
            <p className="text-gray-600">
              Not quite right? No problem! We offer hassle-free returns within 30 days of purchase.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-gray-600">
              Shop with confidence using our secure payment methods and encrypted checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;