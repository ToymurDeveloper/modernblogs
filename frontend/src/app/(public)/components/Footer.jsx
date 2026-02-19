"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import axios from "axios";

const Footer = () => {
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const colorOptions = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-fuchsia-500",
    "bg-rose-500",
  ];

  const getRandomColor = () => {
    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/latest?limit=5&status=published`,
        );
        const blogsWithColors = response.data.blogs.map((blog) => ({
          ...blog,
          randomColor: getRandomColor(),
        }));
        setBlogs(blogsWithColors);
      } catch (error) {
        console.error("Failed to fetch latest blogs:", error);
      }
    };

    fetchLatestBlogs();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing:", email);
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Blog Posts", href: "/blogs" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Sitemap", href: "/sitemap" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms and Conditions", href: "/terms" },
  ];

  const socialLinks = [
    { icon: Facebook, name: "Facebook", href: "#", color: "hover:bg-blue-600" },
    { icon: Twitter, name: "Twitter", href: "#", color: "hover:bg-sky-500" },
    {
      icon: Instagram,
      name: "Instagram",
      href: "#",
      color: "hover:bg-pink-600",
    },
    { icon: Linkedin, name: "LinkedIn", href: "#", color: "hover:bg-blue-700" },
    { icon: Youtube, name: "YouTube", href: "#", color: "hover:bg-red-600" },
    { icon: Github, name: "GitHub", href: "#", color: "hover:bg-green-500" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="inline-block px-2.5 py-1 bg-indigo-600 rounded-lg">
                <span className="text-white font-bold text-xl">DailyMart</span>
              </div>
            </Link>
            <div className="mb-4">
              <p className="mt-4 text-gray-400 leading-relaxed">
                Your daily dose of technology, web development, and design
                insights. We help developers and designers stay updated with the
                latest trends.
              </p>
            </div>
            {/* Social Media */}
            <div className="mb-2">
              <h4 className="font-semibold text-white mb-4">Let's Connect!</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    // href={social.href}
                    href="/"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 group`}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            {/* <div className="bg-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Stay Updated
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to our newsletter for the latest posts
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-linear-to-r from-green-600 to-amber-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-amber-600"
                >
                  {isSubscribed ? "Subscribed! ✓" : "Subscribe Now"}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-3 transition-all duration-300">
                No spam. Unsubscribe anytime.{" "}
                {isSubscribed && (
                  <span className="text-green-400">✓ Welcome aboard!</span>
                )}
              </p>
            </div> */}
          </div>

          {/* Column 3: Categories */}
          <div className="mb-2">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Latest Posts
            </h3>
            <div className="space-y-2">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/60 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full shrink-0 ${blog.randomColor} animate-pulse`}
                    />
                    <span className="line-clamp-1 leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300">
                      {blog.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="mb-2">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Info
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium">Our Location</p>
                  <p className="text-gray-400 text-sm">
                    Glen Innes, northeastern New South Wales, Australia.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <a
                    href="mailto:hello@bloghub.com"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                  >
                    justin839@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium">Call / WhatsApp</p>
                  <a
                    href="tel:+11234567890"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300"
                  >
                    +61 482 376 557
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              Quick Links
              <ExternalLink className="w-4 h-4" />
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-300 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300 block">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div id="google_translate_element"></div>
            <div className="text-gray-500 text-sm flex items-center gap-3">
              <Link href="privacy" className="text-gray-300">
                Privacy Policy
              </Link>
              <Link href="terms" className="text-gray-300">
                Terms
              </Link>
              <Link href="contact" className="text-gray-300">
                Contact
              </Link>
            </div>
            <div className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Explorer. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
