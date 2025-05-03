import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import LanguageSelector from '@/components/language-selector';
import { 
  Menu, 
  X, 
  Video,
  FileText,
  Info,
  Users,
  PanelRight,
  BarChart
} from 'lucide-react';

export const Header: React.FC = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => location === path;

  const { t } = useLanguage();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            FreeMillionaireChallenge
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`${isActive('/') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1`}>
            <PanelRight className="h-4 w-4" />
            {t('home')}
          </Link>
          
          <Link href="/about" className={`${isActive('/about') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1`}>
            <Info className="h-4 w-4" />
            {t('about')}
          </Link>
          
          <Link href="/streaming" className={`${isActive('/streaming') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1`}>
            <Video className="h-4 w-4" />
            Streaming
          </Link>
          
          <Link href="/whitepaper" className={`${isActive('/whitepaper') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1`}>
            <FileText className="h-4 w-4" />
            Whitepaper
          </Link>
          
          <Link href="/tokenomics" className={`${isActive('/tokenomics') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1`}>
            <BarChart className="h-4 w-4" />
            Tokenomics
          </Link>
          
          <div className="relative group">
            <Link href="/ads" className={`${isActive('/ads') || isActive('/submit-ad') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center`}>
              {t('ads')} <span className="ml-1">▼</span>
            </Link>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link href="/ads" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Browse Ads
                </Link>
                <Link href="/submit-ad" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Submit Ad
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="/participants" className={`${isActive('/participants') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1`}>
            <Users className="h-4 w-4" />
            {t('participants')}
          </Link>
          
          <Link href="/affiliate-program" className={`${isActive('/affiliate-program') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition`}>
            Affiliate
          </Link>
          
          {user && user.role === 'admin' && (
            <Link href="/admin" className={`${isActive('/admin') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition`}>
              Admin
            </Link>
          )}
          
          <LanguageSelector />
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-dark-medium">Hi, {user.username}</span>
              <Link href="/dashboard">
                <Button variant="default" className="mr-2">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>Log Out</Button>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button variant="default" className="btn-gold">Register</Button>
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
                <div className="text-lg font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
                  FreeMillionaireChallenge
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col space-y-4 mt-4">
                <Link 
                  href="/" 
                  className={`${isActive('/') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/whitepaper" 
                  className={`${isActive('/whitepaper') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Whitepaper
                </Link>
                <Link 
                  href="/tokenomics" 
                  className={`${isActive('/tokenomics') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Tokenomics
                </Link>
                <div className="py-2">
                  <span className={`${isActive('/ads') || isActive('/submit-ad') ? 'text-primary' : 'text-foreground'} font-medium`}>Ads</span>
                  <div className="pl-4 mt-2 flex flex-col space-y-2">
                    <Link 
                      href="/ads" 
                      className="text-foreground/80 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Browse Ads
                    </Link>
                    <Link 
                      href="/submit-ad" 
                      className="text-foreground/80 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Submit Ad
                    </Link>
                  </div>
                </div>
                <Link 
                  href="/participants" 
                  className={`${isActive('/participants') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Participants
                </Link>
                <Link 
                  href="/affiliate-program" 
                  className={`${isActive('/affiliate-program') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2`}
                  onClick={() => setIsOpen(false)}
                >
                  Affiliate Program
                </Link>
                {user && user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`${isActive('/admin') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <div className="border-t border-gray-200 my-4 pt-4">
                  {user ? (
                    <>
                      <span className="block text-dark-medium mb-2">Hi, {user.username}</span>
                      <Link href="/dashboard">
                        <Button 
                          variant="default" 
                          className="w-full mb-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                      >
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/register">
                        <Button onClick={() => setIsOpen(false)} className="w-full mb-2 btn-gold">
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
