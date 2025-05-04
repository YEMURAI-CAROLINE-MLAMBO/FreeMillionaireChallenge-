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
  
  // This will be populated by real data in the future
  const mockStreams: Stream[] = [];
  
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
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2 md:text-5xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            FMC Streaming Platform
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Watch participants share their entrepreneurial journey through monthly video updates
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="max-w-md mx-auto p-6 text-center">
                <Calendar className="h-16 w-16 mx-auto text-amber-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming August 1, 2025</h2>
                <p className="text-gray-600 mb-6">
                  Our streaming platform will launch when the challenge begins. Participants will share their entrepreneurial journey through monthly video updates.
                </p>
                
                <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium">Launching Soon</span>
                </div>
              </div>
            </div>
            
            <div className="max-w-xl mx-auto space-y-4">
              <h3 className="text-xl font-semibold">Features Coming Soon:</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <Video className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Live streaming and video upload capabilities for participants</span>
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Interactive viewer experience with live chat and reactions</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Community engagement through comments and feedback</span>
                </li>
                <li className="flex items-start">
                  <Grid3X3 className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                  <span className="text-gray-600">Library of past streams organized by participant and progress month</span>
                </li>
              </ul>
            </div>
            
            {isParticipant && userParticipant && (
              <Card className="mt-8 border-amber-200 bg-amber-50">
                <CardHeader className="pb-3">
                  <CardTitle>Participant Video Guidelines</CardTitle>
                  <CardDescription>
                    Prepare for your monthly video updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      As a participant, you'll be required to create monthly video updates (5-10 minutes) documenting your entrepreneurial journey. Here are some tips:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Focus on sharing progress, challenges, and learnings</li>
                      <li>• Include business metrics and growth indicators</li>
                      <li>• Discuss your social impact initiatives</li>
                      <li>• Maintain consistent video quality and presentation</li>
                    </ul>
                    <p className="text-sm font-medium">
                      The streaming interface will be available once the challenge begins on August 1, 2025.
                    </p>
                  </div>
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