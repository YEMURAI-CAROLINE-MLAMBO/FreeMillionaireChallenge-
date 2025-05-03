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
  BarChart,
  Heart,
  ChevronDown,
  LayoutGrid
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
        
        {/* Desktop Navigation - Redesigned with Dropdowns */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/" className={`${isActive('/') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2`}>
            <PanelRight className="h-4 w-4" />
            <span>Home</span>
          </Link>
          
          {/* About Dropdown */}
          <div className="relative group">
            <button className={`${isActive('/about') || isActive('/whitepaper') || isActive('/social-entrepreneurship') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2`}>
              <Info className="h-4 w-4" />
              <span>About</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link href="/about" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <Info className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">About FMC</p>
                    <p className="text-xs text-gray-500">Our mission, vision & impact</p>
                  </div>
                </Link>
                <Link href="/whitepaper" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <FileText className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Whitepaper</p>
                    <p className="text-xs text-gray-500">Technical details & roadmap</p>
                  </div>
                </Link>
                <Link href="/social-entrepreneurship" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <Heart className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Social Entrepreneurship</p>
                    <p className="text-xs text-gray-500">Educational resources & case studies</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Finance Dropdown */}
          <div className="relative group">
            <button className={`${isActive('/tokenomics') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2`}>
              <BarChart className="h-4 w-4" />
              <span>Finance</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute left-0 mt-1 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link href="/tokenomics" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <BarChart className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Tokenomics</p>
                    <p className="text-xs text-gray-500">Platform economics & profit distribution</p>
                  </div>
                </Link>
                <Link href="/affiliate-program" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <Users className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Affiliate Program</p>
                    <p className="text-xs text-gray-500">Earn through referrals & NFT badges</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Community Dropdown */}
          <div className="relative group">
            <button className={`${isActive('/participants') || isActive('/streaming') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2`}>
              <Users className="h-4 w-4" />
              <span>Community</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute left-0 mt-1 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link href="/participants" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <Users className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-xs text-gray-500">Meet our social entrepreneurs</p>
                  </div>
                </Link>
                <Link href="/streaming" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <Video className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Live Streaming</p>
                    <p className="text-xs text-gray-500">Watch participant updates & events</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Advertising Section */}
          <div className="relative group">
            <button className={`${isActive('/ads') || isActive('/submit-ad') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2`}>
              <LayoutGrid className="h-4 w-4" />
              <span>Advertise</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute left-0 mt-1 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link href="/ads" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <LayoutGrid className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Browse Ads</p>
                    <p className="text-xs text-gray-500">See current advertisements</p>
                  </div>
                </Link>
                <Link href="/submit-ad" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 hover:bg-gray-100">
                  <FileText className="h-4 w-4 text-amber-500" />
                  <div>
                    <p className="font-medium">Submit Ad</p>
                    <p className="text-xs text-gray-500">Create and publish your ad</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Admin Panel - Visible only to admins */}
          {user && user.role === 'admin' && (
            <Link 
              href="/admin" 
              className={`${isActive('/admin') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Admin</span>
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
              <div className="flex flex-col space-y-1 mt-4">
                <Link 
                  href="/" 
                  className={`${isActive('/') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2 flex items-center gap-2`}
                  onClick={() => setIsOpen(false)}
                >
                  <PanelRight className="h-4 w-4" />
                  Home
                </Link>
                
                {/* About Section */}
                <div className="py-2 border-t border-gray-100">
                  <div className={`${isActive('/about') || isActive('/whitepaper') || isActive('/social-entrepreneurship') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
                    <Info className="h-4 w-4" />
                    About
                  </div>
                  <div className="pl-6 mt-2 flex flex-col space-y-3">
                    <Link 
                      href="/about" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Info className="h-4 w-4 text-amber-500" />
                      About FMC
                    </Link>
                    <Link 
                      href="/whitepaper" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <FileText className="h-4 w-4 text-amber-500" />
                      Whitepaper
                    </Link>
                    <Link 
                      href="/social-entrepreneurship" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="h-4 w-4 text-amber-500" />
                      Social Entrepreneurship
                    </Link>
                  </div>
                </div>
                
                {/* Finance Section */}
                <div className="py-2 border-t border-gray-100">
                  <div className={`${isActive('/tokenomics') || isActive('/affiliate-program') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
                    <BarChart className="h-4 w-4" />
                    Finance
                  </div>
                  <div className="pl-6 mt-2 flex flex-col space-y-3">
                    <Link 
                      href="/tokenomics" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <BarChart className="h-4 w-4 text-amber-500" />
                      Tokenomics
                    </Link>
                    <Link 
                      href="/affiliate-program" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Users className="h-4 w-4 text-amber-500" />
                      Affiliate Program
                    </Link>
                  </div>
                </div>
                
                {/* Community Section */}
                <div className="py-2 border-t border-gray-100">
                  <div className={`${isActive('/participants') || isActive('/streaming') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
                    <Users className="h-4 w-4" />
                    Community
                  </div>
                  <div className="pl-6 mt-2 flex flex-col space-y-3">
                    <Link 
                      href="/participants" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Users className="h-4 w-4 text-amber-500" />
                      Participants
                    </Link>
                    <Link 
                      href="/streaming" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Video className="h-4 w-4 text-amber-500" />
                      Live Streaming
                    </Link>
                  </div>
                </div>
                
                {/* Advertising Section */}
                <div className="py-2 border-t border-gray-100">
                  <div className={`${isActive('/ads') || isActive('/submit-ad') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
                    <LayoutGrid className="h-4 w-4" />
                    Advertise
                  </div>
                  <div className="pl-6 mt-2 flex flex-col space-y-3">
                    <Link 
                      href="/ads" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutGrid className="h-4 w-4 text-amber-500" />
                      Browse Ads
                    </Link>
                    <Link 
                      href="/submit-ad" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <FileText className="h-4 w-4 text-amber-500" />
                      Submit Ad
                    </Link>
                  </div>
                </div>
                
                {/* Admin Section */}
                {user && user.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`${isActive('/admin') ? 'text-primary' : 'text-foreground'} hover:text-primary font-medium transition py-2 border-t border-gray-100 flex items-center gap-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutGrid className="h-4 w-4" />
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
