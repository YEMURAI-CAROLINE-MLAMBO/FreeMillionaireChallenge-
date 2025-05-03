import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useQuery } from '@tanstack/react-query';
import StreamPlayerEnhanced from '@/components/stream-player-enhanced';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  Grid3X3, 
  Search, 
  Filter, 
  Video,
  BadgeCheck 
} from 'lucide-react';
import { Participant } from '@shared/schema';
import { useLanguage } from '@/contexts/language-context';
import { Skeleton } from '@/components/ui/skeleton';

interface Stream {
  id: number;
  participantId: number;
  participantName: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  isLive: boolean;
  scheduledFor?: string;
  viewers: number;
  month?: number;
}

const StreamingPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Check if the current user is a participant
  const isParticipant = user?.role === 'participant';
  
  // Fetch participants
  const { data: participants, isLoading: isLoadingParticipants } = useQuery({
    queryKey: ['/api/participants'],
    enabled: true,
    retry: 1,
  });
  
  // In a real implementation, we would fetch streams from the backend
  // This is a mock implementation
  const mockStreams: Stream[] = [
    {
      id: 1,
      participantId: 1,
      participantName: "Emma Johnson",
      title: "Month 3 Update: Scaling Our Sustainable Fashion Startup",
      description: "Join me as I share our journey scaling production while maintaining our commitment to eco-friendly practices.",
      thumbnailUrl: "https://placehold.co/800x450/9333ea/ffffff?text=Sustainable+Fashion",
      isLive: true,
      viewers: 215,
      month: 3
    },
    {
      id: 2,
      participantId: 2,
      participantName: "Marcus Chen",
      title: "Building Our EdTech Platform - Technical Challenges",
      description: "Discussing the backend infrastructure we've developed and how we're solving scalability issues.",
      thumbnailUrl: "https://placehold.co/800x450/3b82f6/ffffff?text=EdTech+Platform",
      isLive: false,
      scheduledFor: "2025-08-15T18:00:00Z",
      viewers: 0,
      month: 2
    },
    {
      id: 3,
      participantId: 3,
      participantName: "Sofia Patel",
      title: "How We Secured Our First 100 Customers",
      description: "The marketing strategies and pivots that helped us reach our first milestone.",
      thumbnailUrl: "https://placehold.co/800x450/ef4444/ffffff?text=Marketing+Strategies",
      isLive: false,
      viewers: 0,
      month: 1
    },
    {
      id: 4,
      participantId: 4,
      participantName: "Alexandre Dubois",
      title: "Renewable Energy Startup: Month 4 Progress Report",
      description: "Updates on our solar energy solution and recent partnerships with local communities.",
      thumbnailUrl: "https://placehold.co/800x450/eab308/ffffff?text=Renewable+Energy",
      isLive: true,
      viewers: 189,
      month: 4
    },
    {
      id: 5,
      participantId: 5,
      participantName: "Naomi Williams",
      title: "Fundraising Journey: From Bootstrapping to Seed Round",
      description: "The ups and downs of securing our first investment and what we learned along the way.",
      thumbnailUrl: "https://placehold.co/800x450/84cc16/ffffff?text=Fundraising",
      isLive: false,
      scheduledFor: "2025-08-12T14:30:00Z",
      viewers: 0,
      month: 5
    }
  ];
  
  // Filter streams based on search query
  const filteredStreams = mockStreams.filter(stream => 
    stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stream.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Set first stream as selected if none is selected
  useEffect(() => {
    if (filteredStreams.length > 0 && !selectedStream) {
      setSelectedStream(filteredStreams[0]);
    }
  }, [filteredStreams, selectedStream]);
  
  // Find participant stream for current user
  const userParticipant = participants?.find((p: Participant) => p.userId === user?.id);
  const userStream = userParticipant ? mockStreams.find(s => s.participantId === userParticipant.id) : null;
  
  // Handle stream selection
  const handleSelectStream = (stream: Stream) => {
    setSelectedStream(stream);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Loading state
  if (isLoadingParticipants) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <Skeleton className="h-12 w-full max-w-xl mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-video w-full mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <Skeleton className="h-12 w-full mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 md:text-4xl">
            FMC Streaming
          </h1>
          <p className="text-gray-500 max-w-3xl">
            Watch participants share their entrepreneurial journey or start your own stream
          </p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main stream player */}
          <div className="lg:col-span-2">
            {selectedStream ? (
              <StreamPlayerEnhanced 
                streamUrl={undefined} // In production, this would be a real stream URL
                title={selectedStream.title}
                description={selectedStream.description}
                participantId={selectedStream.participantId}
                isLive={selectedStream.isLive}
                canStream={isParticipant && userParticipant && selectedStream.participantId === userParticipant.id}
                participantName={selectedStream.participantName}
                thumbnailUrl={selectedStream.thumbnailUrl}
              />
            ) : (
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Please select a stream to watch</p>
              </div>
            )}
          </div>
          
          {/* Stream list and filters */}
          <div className="space-y-6">
            <Tabs defaultValue="live">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="live">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Live
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="all">All Videos</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search streams..."
                    className="pl-9 pr-4 py-2 w-full border rounded-md text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="live" className="space-y-4">
                {filteredStreams.filter(stream => stream.isLive).length > 0 ? (
                  filteredStreams
                    .filter(stream => stream.isLive)
                    .map(stream => (
                      <StreamCard 
                        key={stream.id}
                        stream={stream}
                        isSelected={selectedStream?.id === stream.id}
                        onClick={() => handleSelectStream(stream)}
                      />
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Video className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>No live streams available at the moment</p>
                    <p className="text-sm mt-2">Check back later or view upcoming streams</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4">
                {filteredStreams.filter(stream => !stream.isLive && stream.scheduledFor).length > 0 ? (
                  filteredStreams
                    .filter(stream => !stream.isLive && stream.scheduledFor)
                    .map(stream => (
                      <UpcomingStreamCard 
                        key={stream.id}
                        stream={stream}
                      />
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>No upcoming streams scheduled</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="all" className="space-y-4">
                {filteredStreams.length > 0 ? (
                  filteredStreams.map(stream => (
                    <StreamCard 
                      key={stream.id}
                      stream={stream}
                      isSelected={selectedStream?.id === stream.id}
                      onClick={() => handleSelectStream(stream)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Grid3X3 className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p>No videos found</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {/* Participant streaming section */}
            {isParticipant && userParticipant && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Your Streaming Hub</CardTitle>
                  <CardDescription>
                    Share your entrepreneurial journey with the FMC community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userStream ? (
                    <div className="space-y-4">
                      <p className="text-sm">You have an active stream:</p>
                      <div className="p-3 border rounded-md bg-gray-50">
                        <h3 className="font-medium">{userStream.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {userStream.isLive ? (
                            <span className="text-red-600 font-medium">● LIVE NOW</span>
                          ) : (
                            userStream.scheduledFor ? (
                              <span>Scheduled for {new Date(userStream.scheduledFor).toLocaleString()}</span>
                            ) : (
                              <span>Recorded video</span>
                            )
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleSelectStream(userStream)} className="flex-1">
                          {userStream.isLive ? 'Manage Stream' : 'View Video'}
                        </Button>
                        <Button variant="outline">Schedule New</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm">You haven't created any streams yet. Start sharing your journey with the FMC community.</p>
                      <div className="flex gap-2">
                        <Button className="flex-1">Start Streaming</Button>
                        <Button variant="outline">Schedule Stream</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StreamCardProps {
  stream: Stream;
  isSelected?: boolean;
  onClick: () => void;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream, isSelected, onClick }) => {
  return (
    <div 
      className={`cursor-pointer border rounded-md overflow-hidden hover:border-amber-300 transition-colors ${
        isSelected ? 'border-amber-500 bg-amber-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-32 md:w-40 aspect-video flex-shrink-0">
          <img 
            src={stream.thumbnailUrl || "https://placehold.co/800x450/333/white?text=Video"} 
            alt={stream.title}
            className="w-full h-full object-cover"
          />
          {stream.isLive && (
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-medium bg-red-100 text-red-800">
                <span className="w-1.5 h-1.5 mr-1 bg-red-500 rounded-full"></span>
                LIVE
              </span>
            </div>
          )}
          {stream.month && (
            <div className="absolute bottom-2 right-2">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-medium bg-black/60 text-white">
                Month {stream.month}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 flex-1">
          <h3 className="font-medium text-sm truncate">{stream.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-gray-500">{stream.participantName}</span>
            <BadgeCheck className="h-3 w-3 text-amber-500" />
          </div>
          {stream.isLive && (
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <Users className="h-3 w-3 mr-1" />
              <span>{stream.viewers} watching</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface UpcomingStreamCardProps {
  stream: Stream;
}

const UpcomingStreamCard: React.FC<UpcomingStreamCardProps> = ({ stream }) => {
  if (!stream.scheduledFor) return null;
  
  const scheduledDate = new Date(stream.scheduledFor);
  
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-32 md:w-40 aspect-video flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <Calendar className="h-6 w-6 text-gray-400" />
        </div>
        <div className="p-3 flex-1">
          <h3 className="font-medium text-sm">{stream.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-gray-500">{stream.participantName}</span>
          </div>
          <div className="mt-2 text-xs text-amber-600 font-medium">
            {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <Button variant="outline" size="sm" className="mt-2 text-xs">
            Set Reminder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamingPage;