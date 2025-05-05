import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth-context';
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
  LayoutGrid,
  HelpCircle,
  MessageSquare,
  Book,
  Headset
} from 'lucide-react';

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
        {/* Left side: Menu button and logo */}
        <div className="flex items-center">
          {/* Menu dropdown */}
          <div className="relative group mr-4">
            <button className="hover:text-primary font-medium transition flex items-center gap-1 px-3 py-2">
              <Menu className="h-5 w-5" />
              <span>Menu</span>
            </button>
            
            <div className="absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-50">
              <div className="py-1">
                <Link href="/" className={`flex items-center gap-2 px-4 py-3 text-sm ${isActive('/') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <PanelRight className="h-4 w-4 text-amber-500" />
                  <span>Home</span>
                </Link>
                
                {/* About Section */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">About</p>
                </div>
                <Link href="/about" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/about') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <Info className="h-4 w-4 text-amber-500" />
                  <span>About FMC</span>
                </Link>
                <Link href="/whitepaper" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/whitepaper') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <FileText className="h-4 w-4 text-amber-500" />
                  <span>Whitepaper</span>
                </Link>
                <Link href="/tokenomics" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/tokenomics') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <BarChart className="h-4 w-4 text-amber-500" />
                  <span>Tokenomics</span>
                </Link>
                <Link href="/social-entrepreneurship" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/social-entrepreneurship') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <Heart className="h-4 w-4 text-amber-500" />
                  <span>Social Entrepreneurship</span>
                </Link>
                
                {/* Finance Section */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Finance</p>
                </div>
                <Link href="/tokenomics" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/tokenomics') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <BarChart className="h-4 w-4 text-amber-500" />
                  <span>Tokenomics</span>
                </Link>
                <Link href="/affiliate-program" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/affiliate-program') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <Users className="h-4 w-4 text-amber-500" />
                  <span>Affiliate Program</span>
                </Link>
                
                {/* Community Section */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Community</p>
                </div>
                <Link href="/participants" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/participants') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <Users className="h-4 w-4 text-amber-500" />
                  <span>Participants</span>
                </Link>
                <Link href="/streaming" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/streaming') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <Video className="h-4 w-4 text-amber-500" />
                  <span>Live Streaming</span>
                </Link>
                {/* VR Experience link removed as requested - will be added in future updates */}
                
                {/* Advertising Section */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Advertising</p>
                </div>
                <Link href="/ads" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/ads') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <LayoutGrid className="h-4 w-4 text-amber-500" />
                  <span>Browse Ads</span>
                </Link>
                <Link href="/submit-ad" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/submit-ad') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <FileText className="h-4 w-4 text-amber-500" />
                  <span>Submit Ad</span>
                </Link>
                
                {/* Help & Support Section */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Help & Support</p>
                </div>
                <Link href="/faq" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/faq') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <HelpCircle className="h-4 w-4 text-amber-500" />
                  <span>FAQ</span>
                </Link>
                <Link href="/support" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/support') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <MessageSquare className="h-4 w-4 text-amber-500" />
                  <span>Support Center</span>
                </Link>
                <Link href="/terms" className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/terms') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}>
                  <Book className="h-4 w-4 text-amber-500" />
                  <span>Terms of Service</span>
                </Link>
                
                {/* Admin Panel - Visible only to admins */}
                {user && user.role === 'admin' && (
                  <>
                    <div className="px-4 py-2 border-t border-gray-100">
                      <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Admin</p>
                    </div>
                    <Link 
                      href="/admin" 
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${isActive('/admin') ? 'bg-gray-100 text-primary' : 'text-gray-800'} hover:bg-gray-100`}
                    >
                      <LayoutGrid className="h-4 w-4 text-amber-500" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Logo text */}
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent ml-2">
            FreeMillionaireChallenge
          </Link>
        </div>
        
        {/* Right side: Desktop auth buttons */}
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
                  <div className={`${isActive('/about') || isActive('/tokenomics') || isActive('/social-entrepreneurship') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
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
                      href="/tokenomics" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <BarChart className="h-4 w-4 text-amber-500" />
                      Tokenomics
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
                  <div className={`${isActive('/participants') || isActive('/streaming') || isActive('/vr-experience') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
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
                    {/* VR Experience link removed as requested - will be added in future updates */}
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
                
                {/* Help & Support Section */}
                <div className="py-2 border-t border-gray-100">
                  <div className={`${isActive('/faq') || isActive('/support') || isActive('/terms') ? 'text-primary' : 'text-foreground'} font-medium flex items-center gap-2`}>
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </div>
                  <div className="pl-6 mt-2 flex flex-col space-y-3">
                    <Link 
                      href="/faq" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <HelpCircle className="h-4 w-4 text-amber-500" />
                      FAQ
                    </Link>
                    <Link 
                      href="/support" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4 text-amber-500" />
                      Support Center
                    </Link>
                    <Link 
                      href="/terms" 
                      className="text-foreground/80 hover:text-primary flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Book className="h-4 w-4 text-amber-500" />
                      Terms of Service
                    </Link>
                  </div>
                </div>
                
                {/* Admin Section */}
                {user && user.role === 'admin' && (
                  <div className="py-2 border-t border-gray-100">
                    <div className="text-foreground font-medium flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4" />
                      Admin
                    </div>
                    <div className="pl-6 mt-2 flex flex-col space-y-3">
                      <Link 
                        href="/admin" 
                        className="text-foreground/80 hover:text-primary flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <LayoutGrid className="h-4 w-4 text-amber-500" />
                        Dashboard
                      </Link>
                    </div>
                  </div>
                )}
                
                {/* Auth Buttons for Mobile */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {user ? (
                    <div className="flex flex-col space-y-3">
                      <Link 
                        href="/dashboard" 
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button variant="default" className="w-full">Dashboard</Button>
                      </Link>
                      <Button variant="outline" className="w-full" onClick={handleLogout}>Log Out</Button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link 
                        href="/register" 
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        <Button variant="default" className="w-full btn-gold">Register</Button>
                      </Link>
                    </div>
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