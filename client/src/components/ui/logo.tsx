import React from 'react';
import { Link } from 'wouter';
import logoImg from '../../assets/logo.png';

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <img
        src={logoImg}
        alt="FreeMillionaire Challenge Logo"
        className="h-10 w-auto"
      />
      <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-gray-300 text-transparent bg-clip-text">#FreeMillionaire</span>
    </Link>
  );
};
