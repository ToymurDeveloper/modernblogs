"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Rss,
  BookOpen,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribing:", email);
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const blogCategories = [
    { name: "Technology", count: 42, color: "bg-blue-500" },
    { name: "Web Development", count: 28, color: "bg-purple-500" },
    { name: "Design", count: 35, color: "bg-pink-500" },
    { name: "Business", count: 19, color: "bg-green-500" },
    { name: "Lifestyle", count: 24, color: "bg-yellow-500" },
    { name: "Tutorials", count: 31, color: "bg-red-500" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blog Posts", href: "/blog" },
    { name: "Categories", href: "/categories" },
    { name: "Authors", href: "/authors" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Sitemap", href: "/sitemap" },
  ];

  const recentPosts = [
    { title: "Mastering Next.js 14", date: "2 days ago", views: "1.2k" },
    { title: "CSS Grid vs Flexbox", date: "1 week ago", views: "2.4k" },
    { title: "React Performance Tips", date: "2 weeks ago", views: "3.1k" },
    { title: "Building REST APIs", date: "3 weeks ago", views: "1.8k" },
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
    { icon: Rss, name: "RSS Feed", href: "/rss", color: "hover:bg-orange-500" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">BlogHub</span>
              </Link>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Your daily dose of technology, web development, and design
                insights. We help developers and designers stay updated with the
                latest trends.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gray-800/50 rounded-xl p-6 transform hover:-translate-y-1 transition-all duration-300">
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                >
                  {isSubscribed ? "Subscribed! ✓" : "Subscribe Now"}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-3 transition-all duration-300">
                No spam. Unsubscribe anytime.{" "}
                {isSubscribed && (
                  <span className="text-green-400 animate-pulse">
                    ✓ Welcome aboard!
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              Quick Links
              <ExternalLink className="w-4 h-4" />
            </h3>
            <div className="grid grid-cols-2 gap-3">
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

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Top Categories
            </h3>
            <div className="space-y-3">
              {blogCategories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/60 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${category.color} animate-pulse`}
                    />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {category.name}
                    </span>
                  </div>
                  <span className="px-2 py-1 bg-gray-900 text-xs rounded transition-all duration-300 group-hover:bg-gray-800">
                    {category.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Info
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <p className="text-white font-medium">Our Location</p>
                  <p className="text-gray-400 text-sm">
                    Bashundhara City, Dhaka.
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
                    sktaimur296@gmail.com
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
                    +880 1914 653199
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Explorer. All rights reserved.
            </div>

            <div className="flex justify-center">
              <div className="inline-flex items-center gap-4 bg-gray-800/50 px-6 py-2 rounded-full hover:bg-gray-800/70 transition-all duration-300">
                <select className="bg-transparent text-gray-400 text-sm focus:outline-none cursor-pointer hover:text-white transition-colors duration-300">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
                <div className="w-px h-4 bg-gray-700" />
              </div>
            </div>

            <div className="text-gray-500 text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Server Status: <span className="text-green-400">Operational</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
