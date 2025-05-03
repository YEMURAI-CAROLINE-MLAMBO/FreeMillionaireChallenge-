import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/auth-context';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Wallet, FileText, Award, Clock } from 'lucide-react';
import NFTBadgeComponent from '@/components/nft-badge';
import { formatDate } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [_, setLocation] = useLocation();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      setLocation('/auth');
    }
  }, [user, setLocation]);

  // Fetch user's participant data if they are a participant
  const { data: participantData } = useQuery({
    queryKey: ['/api/participants/user'],
    queryFn: async () => {
      if (!user || user.role !== 'participant') return null;
      try {
        const response = await fetch('/api/participants/user');
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch participant data:', error);
        return null;
      }
    },
    enabled: !!user && user.role === 'participant',
  });

  // Fetch user's ads
  const { data: userAds = [] } = useQuery({
    queryKey: ['/api/ads/user'],
    queryFn: async () => {
      if (!user) return [];
      try {
        const response = await fetch('/api/ads/user');
        if (!response.ok) return [];
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch user ads:', error);
        return [];
      }
    },
    enabled: !!user,
  });
  
  // Fetch user's NFT badge
  const { data: nftBadge } = useQuery({
    queryKey: ['/api/nft/badge'],
    queryFn: async () => {
      if (!user) return null;
      try {
        const response = await fetch('/api/nft/badge');
        if (response.status === 404) return null;
        if (!response.ok) return null;
        return await response.json();
      } catch (error) {
        console.error('Failed to fetch NFT badge:', error);
        return null;
      }
    },
    enabled: !!user,
  });

  if (!user) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gradient-gold">My Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3 text-primary/70" />
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-3 text-primary/70" />
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <div className="flex items-center">
                      <Badge className={user.role === 'participant' ? 'bg-primary' : 'bg-secondary'}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary/70" />
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{formatDate(new Date().toISOString())}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Badge Card */}
          <NFTBadgeComponent />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ads">My Ads</TabsTrigger>
              {user.role === 'participant' && (
                <TabsTrigger value="challenge">Challenge Status</TabsTrigger>
              )}
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Overview</CardTitle>
                  <CardDescription>Your activity on FreeMillionaireChallenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-black/5 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Total Ads</div>
                      <div className="text-2xl font-bold">{userAds.length}</div>
                    </div>
                    
                    <div className="bg-black/5 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Role</div>
                      <div className="text-2xl font-bold capitalize">{user.role}</div>
                    </div>
                    
                    <div className="bg-black/5 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">NFT Badge</div>
                      <div className="text-2xl font-bold">
                        {/* Will be replaced with actual badge data */}
                        Not Minted
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button className="btn-gold w-full flex items-center justify-center h-16" onClick={() => setLocation('/submit-ad')}>
                        <FileText className="mr-2 h-5 w-5" />
                        Create New Ad
                      </Button>
                      
                      <Button className="btn-silver w-full flex items-center justify-center h-16" onClick={() => setLocation('/ads')}>
                        <Award className="mr-2 h-5 w-5" />
                        View All Ads
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ads Tab */}
            <TabsContent value="ads">
              <Card>
                <CardHeader>
                  <CardTitle>My Advertisements</CardTitle>
                  <CardDescription>Manage your ad campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  {userAds.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">No Ads Yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't created any advertisements yet. Start promoting your business.
                      </p>
                      <Button className="btn-gold" onClick={() => setLocation('/submit-ad')}>
                        Create Your First Ad
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userAds.map((ad: any) => (
                        <div key={ad.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h3 className="font-medium">{ad.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{ad.description.substring(0, 100)}...</p>
                              <Badge className={
                                ad.status === 'approved' ? 'bg-green-600' : 
                                ad.status === 'pending' ? 'bg-amber-500' : 
                                'bg-red-500'
                              }>
                                {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Button variant="outline" size="sm" onClick={() => setLocation(`/ads/${ad.id}`)}>
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Challenge Status Tab (Participants Only) */}
            {user.role === 'participant' && (
              <TabsContent value="challenge">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Status</CardTitle>
                    <CardDescription>Track your progress in the FreeMillionaireChallenge</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {participantData ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-black/5 p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Participant ID</div>
                            <div className="text-xl font-bold">#{participantData.order}</div>
                          </div>
                          
                          <div className="bg-black/5 p-4 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Status</div>
                            <div className="text-xl font-bold">Active</div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">About Me</h3>
                          <p className="text-muted-foreground">{participantData.bio}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Project Goal</h3>
                          <p className="text-muted-foreground">{participantData.projectGoal}</p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Challenge Progress</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span>NFT Badge Minted</span>
                              <Badge variant="outline">
                                {/* Will be updated with real badge data */}
                                Pending
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span>Ads Published</span>
                              <Badge variant={userAds.length > 0 ? "default" : "outline"}>
                                {userAds.length > 0 ? "Completed" : "Pending"}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span>Wallet Connected</span>
                              <Badge variant={participantData.walletAddress ? "default" : "outline"}>
                                {participantData.walletAddress ? "Completed" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">Participant Data Not Found</h3>
                        <p className="text-muted-foreground mb-6">
                          We couldn't find your participant details. Please contact support.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Wallet Tab */}
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Information</CardTitle>
                  <CardDescription>Connect your crypto wallet to participate in the challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-black/5 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <Wallet className="h-6 w-6 mr-2 text-primary" />
                        <h3 className="text-lg font-medium">MetaMask Integration</h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">
                        Connect your MetaMask wallet to receive payments and mint your NFT badge on Binance Smart Chain.
                      </p>
                      
                      <Button className="btn-gold w-full" onClick={() => setLocation('/connect-wallet')}>
                        Manage Wallet Connection
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Benefits of Connecting Your Wallet</h3>
                      <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                        <li>Receive payments directly to your wallet</li>
                        <li>Mint your exclusive FreeMillionaireChallenge NFT Badge</li>
                        <li>Participate in blockchain-based voting and governance</li>
                        <li>Verify your identity on the Binance Smart Chain</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;