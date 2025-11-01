"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { PatronLogo } from "./patron-logo";

const footerLinks = {
  services: [
    { name: "Buyers", href: "/buying" },
    { name: "Sellers", href: "/selling" },
    { name: "My Home Value", href: "/home-value" },
    { name: "Rent/Property Mgmt", href: "/property-management" },
  ],
  company: [
    { name: "Local Communities", href: "/communities" },
    { name: "Blog", href: "/blog" },
    { name: "FabFriday", href: "/videos" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <PatronLogo size="medium" showLink={false} />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Fabiola Patron - Serving Greater Los Angeles with 20+ years of
              experience. Licensed Broker & Owner. DRE #02178767
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-lime-500" />
                <a
                  href="tel:3233503137"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  (323) 350-3137
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MessageSquare className="w-4 h-4 text-lime-500" />
                <a
                  href="sms:3233503137"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  Text (323) 350-3137
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-lime-500" />
                <a
                  href="mailto:patronrealestateservices@gmail.com"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  patronrealestateservices@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-lime-500" />
                <span>10209 Tujunga Canyon Blvd #164, Tujunga, CA 91042</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <a
                  href="https://www.patronrealestateservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  www.patronrealestateservices.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-lime-500 rounded-lg flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lime-500">
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lime-500">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-lime-400 transition-colors duration-200 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Patron Real Estate. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-lime-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
