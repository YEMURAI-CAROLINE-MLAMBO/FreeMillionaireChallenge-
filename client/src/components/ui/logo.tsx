import React from 'react';
import { Link } from 'wouter';

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="flex items-center space-x-2">
        <svg 
          className="h-10 w-10 text-primary" 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="40" rx="8" fill="currentColor" fillOpacity="0.1" />
          <path
            d="M20 8L28 12V20L20 24L12 20V12L20 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 24V32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 27L20 32L25 27"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xl font-semibold">FreeMillionaire</span>
      </a>
    </Link>
  );
};
