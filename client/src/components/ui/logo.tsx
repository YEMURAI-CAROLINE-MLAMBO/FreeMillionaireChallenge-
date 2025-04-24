import React from 'react';
import { Link } from 'wouter';
import logoImg from '../../assets/fmc-logo-2025.jpg'; // Updated to use the new 2025 logo

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <img
        src={logoImg}
        alt="FreeMillionaire Challenge 2025"
        className="h-12 md:h-14 w-auto object-contain"
      />
    </Link>
  );
};
