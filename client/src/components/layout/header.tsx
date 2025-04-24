import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth-context';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/">
            <a className={`${isActive('/') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition`}>
              Home
            </a>
          </Link>
          <Link href="/ads">
            <a className={`${isActive('/ads') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition`}>
              Ads
            </a>
          </Link>
          <Link href="/participants">
            <a className={`${isActive('/participants') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition`}>
              Participants
            </a>
          </Link>
          <Link href="/submit-ad">
            <a className={`${isActive('/submit-ad') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition`}>
              Submit Ad
            </a>
          </Link>
          {user && user.role === 'admin' && (
            <Link href="/admin">
              <a className={`${isActive('/admin') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition`}>
                Admin
              </a>
            </Link>
          )}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-dark-medium">Hi, {user.username}</span>
              <Button variant="outline" onClick={handleLogout}>Log Out</Button>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button variant="default">Register</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center py-4">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4 mt-4">
                <Link href="/">
                  <a 
                    className={`${isActive('/') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>
                </Link>
                <Link href="/ads">
                  <a 
                    className={`${isActive('/ads') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    Ads
                  </a>
                </Link>
                <Link href="/participants">
                  <a 
                    className={`${isActive('/participants') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    Participants
                  </a>
                </Link>
                <Link href="/submit-ad">
                  <a 
                    className={`${isActive('/submit-ad') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    Submit Ad
                  </a>
                </Link>
                {user && user.role === 'admin' && (
                  <Link href="/admin">
                    <a 
                      className={`${isActive('/admin') ? 'text-primary' : 'text-dark-medium'} hover:text-primary font-medium transition py-2`}
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </a>
                  </Link>
                )}
                <div className="border-t border-gray-200 my-4 pt-4">
                  {user ? (
                    <>
                      <span className="block text-dark-medium mb-2">Hi, {user.username}</span>
                      <Button variant="outline" onClick={() => { handleLogout(); setIsOpen(false); }}>
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/register">
                        <Button onClick={() => setIsOpen(false)} className="w-full mb-2">
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};
