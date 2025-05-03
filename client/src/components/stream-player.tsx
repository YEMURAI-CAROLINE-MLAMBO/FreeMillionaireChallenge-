import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  MessageSquare, 
  ThumbsUp, 
  Share, 
  Camera, 
  Video,
  UploadCloud 
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface StreamPlayerProps {
  streamUrl?: string;
  title: string;
  description?: string;
  participantId?: number;
  isLive?: boolean;
  canStream?: boolean;
  participantName?: string;
  thumbnailUrl?: string;
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({
  streamUrl,
  title,
  description,
  participantId,
  isLive = false,
  canStream = false,
  participantName,
  thumbnailUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{user: string, message: string}>>([]);
  const [messageInput, setMessageInput] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const streamMode = canStream ? 'stream' : 'watch';
  
  const { t } = useLanguage();
  
  // Mock streaming functionality
  const startStreaming = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsStreaming(true);
            setIsPlaying(true);
          }
        })
        .catch(err => {
          console.error("Error accessing media devices:", err);
          alert("Unable to access camera and microphone. Please check permissions.");
        });
    } else {
      alert("Your browser doesn't support media devices access.");
    }
  };
  
  const stopStreaming = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setIsPlaying(false);
    }
  };
  
  // Handle play/pause
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
  
  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (videoRef.current) {
      videoRef.current.volume = volumeValue / 100;
    }
    
    if (volumeValue === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Handle sending chat message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      const newMessage = {
        user: 'You',
        message: messageInput
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
      
      // Simulate response after a delay (remove in production)
      setTimeout(() => {
        const responses = [
          "Great point!",
          "I totally agree with your approach.",
          "How interesting! Tell us more.",
          "That's a unique perspective on the challenge.",
          "Thanks for sharing your experience!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage = {
          user: participantName || 'Participant',
          message: randomResponse
        };
        setChatMessages(prevMessages => [...prevMessages, responseMessage]);
      }, 2000);
    }
  };
  
  // Cleanup function
  useEffect(() => {
    return () => {
      if (isStreaming) {
        stopStreaming();
      }
    };
  }, [isStreaming]);
  
  return (
    <Card className="w-full max-w-5xl mx-auto overflow-hidden border-2" ref={playerRef}>
      <Tabs defaultValue={streamMode} className="w-full">
        <div className="flex justify-between items-center px-4 pt-4">
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          {canStream && (
            <TabsList>
              <TabsTrigger value="watch">Watch</TabsTrigger>
              <TabsTrigger value="stream">Stream</TabsTrigger>
            </TabsList>
          )}
        </div>
        
        <TabsContent value="watch" className="mt-0">
          <div className="relative bg-black aspect-video">
            {streamUrl || isStreaming ? (
              <video 
                ref={videoRef}
                className="w-full h-full"
                src={streamUrl}
                poster={thumbnailUrl || "https://placehold.co/800x450/333/white?text=Video+Stream"}
                controls={false}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  {isLive ? (
                    <div>
                      <div className="animate-pulse mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                          LIVE
                        </span>
                      </div>
                      <p>Live stream is loading...</p>
                    </div>
                  ) : (
                    <div>
                      <p>No stream available</p>
                      <p className="text-sm">Check back later for upcoming streams</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Player controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  
                  <div className="w-24 hidden sm:block">
                    <Slider 
                      value={[volume]} 
                      max={100} 
                      step={1}
                      onValueChange={handleVolumeChange}
                      className="h-1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isLive && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                      LIVE
                    </span>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <CardContent className="p-4">
            {description && (
              <CardDescription className="mb-4">
                {description}
              </CardDescription>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-medium mb-2">Live Chat</h3>
                <div className="bg-gray-50 rounded-md p-3 h-60 overflow-y-auto mb-2">
                  {chatMessages.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm">No messages yet</p>
                  ) : (
                    <div className="space-y-2">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className="text-sm">
                          <span className="font-medium">{msg.user}: </span>
                          <span>{msg.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input 
                    type="text" 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 px-3 py-2 border rounded-md text-sm"
                  />
                  <Button type="submit" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </form>
              </div>
              
              <div className="sm:w-48">
                <h3 className="text-sm font-medium mb-2">Engagement</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="stream" className="mt-0">
          {!isStreaming ? (
            <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center p-6">
              <div className="text-center space-y-4 max-w-md">
                <h3 className="text-lg font-medium">Start Streaming</h3>
                <p className="text-gray-500 text-sm">
                  Share your entrepreneurial journey with viewers around the world.
                  Make sure your camera and microphone are connected.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button onClick={startStreaming} className="flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Start Stream
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    Schedule Stream
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-black aspect-video">
              <video 
                ref={videoRef}
                className="w-full h-full"
                autoPlay
                muted
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                      LIVE
                    </span>
                    <span className="text-sm text-white/80">Streaming now</span>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={stopStreaming}
                  >
                    Stop Stream
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Stream Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Stream Title</label>
                    <input 
                      type="text" 
                      defaultValue={title}
                      className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                      placeholder="Enter a title for your stream"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      defaultValue={description}
                      className="w-full px-3 py-2 border rounded-md text-sm mt-1"
                      placeholder="Describe what you'll be sharing in this stream"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Streaming Tips</h3>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li>Ensure you have a stable internet connection</li>
                  <li>Find a quiet location with good lighting</li>
                  <li>Keep your videos between 5-10 minutes for monthly updates</li>
                  <li>Focus on your entrepreneurial journey and insights</li>
                  <li>Engage with viewers in the chat during live streams</li>
                  <li>Remember that all content must follow community guidelines</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="border-t px-6 py-4">
        <div className="flex items-center text-sm text-gray-500">
          {participantName && (
            <span className="font-medium text-gray-700 mr-2">{participantName}</span>
          )}
          {isLive ? (
            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
              Live Now
            </span>
          ) : (
            <span>
              {isStreaming ? "Broadcasting live" : "Not currently streaming"}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StreamPlayer;