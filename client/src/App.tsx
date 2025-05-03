import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SubmitAd from "@/pages/submit-ad";
import Participants from "@/pages/participants";
import Ads from "@/pages/ads";
import Register from "@/pages/register";
import ViewerRegistration from "@/pages/viewer-registration";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import AffiliateProgram from "@/pages/affiliate-program";
import About from "@/pages/about";
import Whitepaper from "@/pages/whitepaper";
import Tokenomics from "@/pages/tokenomics";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/contexts/auth-context";
import { Web3ContextProvider } from "@/contexts/web3-context";
import { LanguageProvider } from "@/contexts/language-context";
import { Skeleton } from "@/components/ui/skeleton";

function Router() {
  const { user } = useAuth();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/whitepaper" component={Whitepaper} />
      <Route path="/tokenomics" component={Tokenomics} />
      <Route path="/ads" component={Ads} />
      <Route path="/submit-ad" component={SubmitAd} />
      <Route path="/participants" component={Participants} />
      <Route path="/register" component={Register} />
      <Route path="/join-as-viewer" component={ViewerRegistration} />
      <Route path="/affiliate-program" component={AffiliateProgram} />
      <Route path="/streaming">
        <Suspense fallback={
          <div className="container mx-auto py-12 px-4">
            <Skeleton className="h-12 w-64 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="aspect-video w-full mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div>
                <Skeleton className="h-10 w-full mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        }>
          {React.createElement(React.lazy(() => import("@/pages/streaming")))}
        </Suspense>
      </Route>
      {user && (
        <Route path="/dashboard" component={Dashboard} />
      )}
      {user && user.role === "admin" && (
        <Route path="/admin" component={Admin} />
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Web3ContextProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </Web3ContextProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
