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
import Admin from "@/pages/admin";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/contexts/auth-context";

function Router() {
  const { user } = useAuth();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ads" component={Ads} />
      <Route path="/submit-ad" component={SubmitAd} />
      <Route path="/participants" component={Participants} />
      <Route path="/register" component={Register} />
      <Route path="/join-as-viewer" component={ViewerRegistration} />
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
    </QueryClientProvider>
  );
}

export default App;
