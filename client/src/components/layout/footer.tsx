import React from 'react';
import { Link } from 'wouter';
import { Logo } from '@/components/ui/logo';
// Removed social media and contact icons imports as they are no longer needed

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
                <Link href="/faq" className="text-gray-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/tokenomics" className="text-gray-400 hover:text-white transition">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="/social-entrepreneurship" className="text-gray-400 hover:text-white transition">
                  Social Entrepreneurship
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gray-400">Fully autonomous blockchain challenge</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400">Launch date: August 1, 2025</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400">Limited to 9 participants for Season 1</span>
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
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
