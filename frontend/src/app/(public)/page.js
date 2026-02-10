import React from "react";
import BlogsPage from "./components/BlogsPage";
import Header from "./components/Header";
import Service from "./components/Service";
import About from "./components/About";
import Contact from "./components/Contact";
import CatandTag from "./components/CatandTag";

const HomePage = () => {
  return (
    <div>
      <Header />
      <BlogsPage />
      {/* <CatandTag/> */}
      <Service />
      <About />
      <Contact />
    </div>
  );
};

export default HomePage;
