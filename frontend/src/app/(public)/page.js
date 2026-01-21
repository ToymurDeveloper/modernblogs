import React from "react";
import BlogsPage from "./components/BlogsPage";
import Header from "./components/Header";
import Service from "./components/Service";
import About from "./components/About";
import Contact from "./components/Contact";

const HomePage = () => {
  return (
    <div>
      <Header />
      <BlogsPage />
      <Service />
      <About />
      <Contact />
    </div>
  );
};

export default HomePage;
