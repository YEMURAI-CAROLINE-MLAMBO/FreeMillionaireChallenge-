import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Upload, Coins, Trophy } from 'lucide-react';
import CountdownTimer from '@/components/countdown-timer';
import AdCard from '@/components/ad-card';
import { useAuth } from '@/contexts/auth-context';

const Home: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch a few ads to display
  const { data: ads, isLoading: adsLoading } = useQuery({
    queryKey: ['/api/ads'],
  });
  
  // Fetch participants
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['/api/participants'],
  });
  
  // Check if participants are full
  const { data: settings } = useQuery({
    queryKey: ['/api/challenge/settings'],
  });
  
  const isParticipantsFull = () => {
    if (settings && participants) {
      const maxParticipants = parseInt(settings.maxParticipants);
      return participants.length >= maxParticipants;
    }
    return false;
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-accent to-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-gradient-gold mb-6 text-4xl md:text-5xl lg:text-6xl font-extrabold">#FreeMillionaire Challenge</h1>
            <p className="text-lg md:text-xl mb-8 text-silver">Unleash Your Potential! Join the most exciting global business challenge where crypto meets opportunity. Transform your vision into reality at zero cost.</p>
            
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg mb-4 text-silver">Season 1 begins in:</p>
              
              {/* Countdown Timer */}
              <CountdownTimer />
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/submit-ad">
                  <Button className="px-8 py-6 btn-gold shadow-lg">
                    Submit Your Ad
                  </Button>
                </Link>
                <Link href={isParticipantsFull() ? "/viewer-registration" : "/register"}>
                  <Button className="px-8 py-6 btn-silver shadow-lg">
                    {isParticipantsFull() ? "Join as Viewer" : "Join as Participant"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-dark">How It Works</h2>
            <p className="text-dark-medium text-lg">Experience the revolutionary fusion of advertising power, cryptocurrency innovation, and entrepreneurial spirit. Our platform isn't just a marketplace—it's your gateway to financial freedom.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6 bg-light-bg rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark">Upload Your Ad</h3>
              <p className="text-dark-medium">Showcase your vision to the world! Our intuitive platform makes creating and submitting stunning ads a breeze.</p>
            </div>
            
            <div className="text-center p-6 bg-light-bg rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark">Pay with Crypto</h3>
              <p className="text-dark-medium">Embrace the future of finance! Seamlessly connect your wallet and make secure transactions with cutting-edge blockchain technology.</p>
            </div>
            
            <div className="text-center p-6 bg-light-bg rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark">Join the Challenge</h3>
              <p className="text-dark-medium">Become one of our exclusive 9 participants for Season 1 or follow as a viewer.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Ads Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dark">Current Ads</h2>
            <Link href="/ads">
              <Button variant="outline">View All Ads</Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {adsLoading ? (
              <div className="col-span-3 text-center py-12">Loading ads...</div>
            ) : ads && ads.length > 0 ? (
              ads.slice(0, 3).map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-dark-medium mb-4">No ads available yet.</p>
                <Link href="/submit-ad">
                  <Button>Be the first to submit an ad</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary/90 to-primary/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Submit Your Ad?</h2>
            <p className="text-lg mb-8">Join our platform today and showcase your business to a global audience through our innovative advertising system.</p>
            <Link href="/submit-ad">
              <Button className="px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition">
                Submit Your Ad Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Viewer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-dark">Follow the Challenge</h2>
            <p className="text-dark-medium text-lg">Register as a viewer to receive updates and follow the progress of our participants.</p>
          </div>
          
          <div className="text-center">
            <Link href="/join-as-viewer">
              <Button size="lg" className="px-8 py-6">
                Join as a Viewer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
