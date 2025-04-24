import React from 'react';
import { Link } from 'wouter';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="invert">
                <Logo />
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              The future of advertising and business challenges, powered by cryptocurrency.
            </p>
            {/* Social media links removed to make the app fully autonomous */}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/ads" className="text-gray-400 hover:text-white transition">
                  Ads
                </Link>
              </li>
              <li>
                <Link href="/participants" className="text-gray-400 hover:text-white transition">
                  Participants
                </Link>
              </li>
              <li>
                <Link href="/submit-ad" className="text-gray-400 hover:text-white transition">
                  Submit Ad
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Crypto Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="text-gray-400 h-5 w-5 mt-0.5 mr-3" />
                <span className="text-gray-400">contact@freemillionaire.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-gray-400 h-5 w-5 mt-0.5 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-gray-400 h-5 w-5 mt-0.5 mr-3" />
                <span className="text-gray-400">123 Innovation Way, Tech City, TC 98765</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 FreeMillionaire Challenge. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white text-sm transition">
                Privacy Policy
              </Link>
              <Link href="/" className="text-gray-400 hover:text-white text-sm transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
