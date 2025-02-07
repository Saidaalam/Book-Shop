import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import React from "react";
import Footer from "../components/Footer";
import Blog from "../components/Blog";
import Faq from "../components/Faq";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar/>
      <Banner />
      <Blog />
      <Testimonial />
      <Faq />
      <Newsletter />
      <Footer/>
    </div>
  );
};

export default Home;
