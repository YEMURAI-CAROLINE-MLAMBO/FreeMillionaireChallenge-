import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Video,
  X,
  Settings,
  Camera,
  Mic,
  ScreenShare,
  Share2,
  ThumbsUp,
  MessageSquare,
  Link as LinkIcon,
  ExternalLink,
  Edit,
  BookOpen,
  Calendar,
  Info,
  Users
} from 'lucide-react';

interface StreamPlayerProps {
  streamUrl?: string;
  title: string;
  description: string;
  participantId: number;
  participantName: string;
  isLive: boolean;
  canStream?: boolean;
  thumbnailUrl?: string;
}

const StreamPlayerEnhanced: React.FC<StreamPlayerProps> = ({
  streamUrl,
  title,
  description,
  participantId,
  participantName,
  isLive,
  canStream = false,
  thumbnailUrl
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isStreamStarted, setIsStreamStarted] = useState<boolean>(false);
  const [streamTitle, setStreamTitle] = useState<string>(title);
  const [streamDescription, setStreamDescription] = useState<string>(description);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  
  // For engagement features
  const [viewerCount, setViewerCount] = useState<number>(isLive ? Math.floor(Math.random() * 50) + 10 : 0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(Math.floor(Math.random() * 100));
  const [comments, setComments] = useState<{id: number, user: string, text: string, time: string}[]>([
    {id: 1, user: 'Alex', text: 'Your approach to sustainable business is inspiring!', time: '2 min ago'},
    {id: 2, user: 'Jordan', text: 'How did you validate your initial market research?', time: '5 min ago'},
    {id: 3, user: 'Taylor', text: 'Love the progress updates, keep going!', time: '12 min ago'},
  ]);
  
  // Resource links
  const [resources, setResources] = useState<{title: string, url: string}[]>([
    {title: 'Business Plan Template', url: 'https://example.com/template'},
    {title: 'Market Research Report', url: 'https://example.com/research'},
    {title: 'Pitch Deck', url: 'https://example.com/pitch'},
  ]);
  const [newResourceTitle, setNewResourceTitle] = useState<string>('');
  const [newResourceUrl, setNewResourceUrl] = useState<string>('');
  
  // Upcoming events
  const [events, setEvents] = useState<{title: string, date: string, description: string}[]>([
    {
      title: 'Monthly Progress Update',
      date: '2025-09-01T18:00:00Z',
      description: 'Live streaming of monthly progress and Q&A session'
    },
    {
      title: 'Investor Pitch Demo',
      date: '2025-09-15T16:00:00Z',
      description: 'Practice pitch session with mentor feedback'
    }
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Start streaming
  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreamStarted(true);
        setIsPlaying(true);
      }
    } catch (error) {
      alert("Unable to access camera and microphone. Please check permissions.");
    }
  };
  
  // Stop streaming
  const stopStreaming = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
      setIsStreamStarted(false);
      setIsPlaying(false);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Toggle controls visibility
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      
      if (isPlaying) {
        timeout = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);
  
  // Submit stream info changes
  const saveStreamInfo = () => {
    // In a real implementation, this would send data to your backend
    setIsEditing(false);
  };
  
  // Add a new comment
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'You',
        text: chatMessage,
        time: 'Just now'
      };
      setComments([...comments, newComment]);
      setChatMessage('');
    }
  };
  
  // Add a new resource link
  const handleAddResource = () => {
    if (newResourceTitle && newResourceUrl) {
      setResources([...resources, {
        title: newResourceTitle,
        url: newResourceUrl
      }]);
      setNewResourceTitle('');
      setNewResourceUrl('');
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Video player */}
        <div className="aspect-video bg-black relative overflow-hidden">
          {!isStreamStarted && !streamUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {thumbnailUrl ? (
                <img 
                  src={thumbnailUrl} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Video className="h-16 w-16 text-gray-500" />
              )}
              
              {canStream && !isLive && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Button onClick={startStreaming} className="bg-amber-500 hover:bg-amber-600">
                    Start Streaming
                  </Button>
                </div>
              )}
              
              {isLive && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
                    <span className="h-2 w-2 mr-1.5 bg-red-500 rounded-full"></span>
                    LIVE
                  </span>
                </div>
              )}
            </div>
          )}
          
          <video
            ref={videoRef}
            className={`w-full h-full ${!isStreamStarted && !streamUrl ? 'hidden' : ''}`}
            src={streamUrl}
            playsInline
          />
          
          {/* Stream control overlay */}
          {canStream && isStreamStarted && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="bg-black/50 text-white border-gray-600 hover:bg-black/70"
                onClick={stopStreaming}
              >
                <X className="h-4 w-4 mr-1" />
                End Stream
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="bg-black/50 text-white border-gray-600 hover:bg-black/70"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          {/* Player controls */}
          {(isStreamStarted || streamUrl) && (
            <div 
              className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={togglePlay}
                    className="text-white focus:outline-none"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </button>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={toggleMute}
                      className="text-white focus:outline-none"
                    >
                      {isMuted ? (
                        <VolumeX className="h-6 w-6" />
                      ) : (
                        <Volume2 className="h-6 w-6" />
                      )}
                    </button>
                    
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{viewerCount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Stream info */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing && canStream ? (
              <div className="space-y-2">
                <Input
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  className="font-bold text-lg"
                  placeholder="Stream title"
                />
                <Textarea
                  value={streamDescription}
                  onChange={(e) => setStreamDescription(e.target.value)}
                  placeholder="Stream description"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={saveStreamInfo} size="sm">Save</Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between">
                  <CardTitle className="mr-2">{streamTitle}</CardTitle>
                  {canStream && (
                    <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <CardDescription className="flex-1">By {participantName}</CardDescription>
                  {isLive && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{likesCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{viewerCount} watching</span>
                      </div>
                      <Button 
                        variant={isFollowing ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={isFollowing ? "bg-amber-500 hover:bg-amber-600" : ""}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {canStream && !isStreamStarted && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-1" /> Camera
              </Button>
              <Button variant="outline" size="sm">
                <Mic className="h-4 w-4 mr-1" /> Microphone
              </Button>
              <Button variant="outline" size="sm">
                <ScreenShare className="h-4 w-4 mr-1" /> Screen
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <Tabs defaultValue="about" className="w-full">
        <CardContent>
          <TabsList className="mb-4">
            <TabsTrigger value="about">
              <Info className="h-4 w-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-0">
            <p className="text-gray-600">{streamDescription}</p>
            
            {/* Stream preparation area */}
            {canStream && !isStreamStarted && (
              <div className="mt-4 border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium mb-2">Streaming Setup</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Make sure your camera and microphone are connected.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Camera:</span>
                    <Button variant="outline" size="sm">
                      Check
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Microphone:</span>
                    <Button variant="outline" size="sm">
                      Test
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            <div className="h-64 overflow-y-auto border rounded-md p-4 mb-4">
              {comments.map(comment => (
                <div key={comment.id} className="mb-3">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <div className="space-y-4">
              <ul className="divide-y">
                {resources.map((resource, index) => (
                  <li key={index} className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-amber-500" />
                        <span>{resource.title}</span>
                      </div>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-700 flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              
              {canStream && (
                <div className="mt-4 border rounded-md p-4 bg-gray-50">
                  <h3 className="font-medium mb-2">Add Resource</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Title</label>
                      <Input
                        value={newResourceTitle}
                        onChange={(e) => setNewResourceTitle(e.target.value)}
                        placeholder="Resource title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">URL</label>
                      <Input
                        value={newResourceUrl}
                        onChange={(e) => setNewResourceUrl(e.target.value)}
                        placeholder="https://"
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleAddResource} className="w-full">Add Resource</Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="mt-0">
            <div className="space-y-4">
              {events.map((event, index) => {
                const eventDate = new Date(event.date);
                return (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <span className="text-sm text-amber-600">
                        {eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm">Add to Calendar</Button>
                      <Button variant="outline" size="sm">Set Reminder</Button>
                    </div>
                  </div>
                );
              })}
              
              {canStream && (
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Event
                </Button>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      {/* Social and engagement section */}
      {isLive && (
        <CardFooter className="border-t py-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                className="flex items-center gap-1"
                onClick={() => setLikesCount(likesCount + 1)}
              >
                <ThumbsUp className="h-5 w-5" />
                Like
              </Button>
              <Button variant="ghost" className="flex items-center gap-1">
                <MessageSquare className="h-5 w-5" />
                Comment
              </Button>
              <Button variant="ghost" className="flex items-center gap-1">
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
            {canStream && (
              <Button variant="default" className="bg-amber-500 hover:bg-amber-600">
                Manage Stream
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StreamPlayerEnhanced;