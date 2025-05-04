import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth-context';
import { VrExperience } from '@shared/schema';
import { Box, Laptop, Headset, Image, Building, Users, Link as LinkIcon, Globe } from 'lucide-react';

const VRExperiencePage: React.FC = () => {
  const { user } = useAuth();
  const [activeExperience, setActiveExperience] = useState<VrExperience | null>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const isAdmin = user?.role === 'admin';

  // Fetch VR Experiences
  const { data: vrExperiences = [], isLoading } = useQuery<VrExperience[]>({
    queryKey: ['/api/vr-experiences'],
    enabled: true,
  });

  // Generate QR code for selected experience
  useEffect(() => {
    if (activeExperience) {
      // In a real implementation, we would generate an actual QR code
      // For now, we'll use a placeholder
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '/vr/' + activeExperience.id)}`);
    }
  }, [activeExperience]);

  const selectExperience = (experience: VrExperience) => {
    setActiveExperience(experience);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Virtual Reality Experience</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in the FreeMillionaireChallenge ecosystem with our cutting-edge VR experiences. Explore participant journeys, attend virtual events, and engage with the community in a whole new dimension.
          </p>
        </div>

        <Tabs defaultValue="experiences" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="experiences">VR Experiences</TabsTrigger>
            <TabsTrigger value="how-to">How It Works</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Features</TabsTrigger>
          </TabsList>

          <TabsContent value="experiences" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Available Experiences</CardTitle>
                    <CardDescription>
                      Select a VR experience to explore
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-40">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                      </div>
                    ) : vrExperiences.length > 0 ? (
                      vrExperiences.map((exp) => (
                        <Card 
                          key={exp.id} 
                          className={`cursor-pointer transition-all ${activeExperience?.id === exp.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                          onClick={() => selectExperience(exp)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                                <Box className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{exp.title}</h3>
                                <p className="text-sm text-gray-500">{exp.description.substring(0, 60)}...</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <VrHeadset className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">No VR experiences available yet</p>
                        <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                {activeExperience ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{activeExperience.title}</CardTitle>
                      <CardDescription>
                        Immersive VR experience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center relative overflow-hidden">
                        {/* This would be a WebXR preview or a screenshot in a real implementation */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20">
                          <VrHeadset className="h-16 w-16 text-primary/60" />
                        </div>
                      </div>

                      <div className="p-4 border rounded-md bg-gray-50">
                        <h3 className="font-medium mb-2">Experience Details</h3>
                        <p className="text-gray-600 mb-4">{activeExperience.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">For all users</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Compatible with major VR headsets</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-6 mt-4">
                        <div className="md:w-1/2">
                          <h3 className="font-medium mb-3">Access on Your VR Headset</h3>
                          <div className="bg-white p-4 rounded-md border flex justify-center">
                            {qrCode && (
                              <img 
                                src={qrCode} 
                                alt="QR Code" 
                                className="w-32 h-32" 
                              />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-2 text-center">
                            Scan this QR code with your VR headset
                          </p>
                        </div>
                        <div className="md:w-1/2">
                          <h3 className="font-medium mb-3">Launch Options</h3>
                          <div className="space-y-3">
                            <Button className="w-full">
                              <VrHeadset className="mr-2 h-4 w-4" />
                              Launch in WebXR
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Laptop className="mr-2 h-4 w-4" />
                              Desktop Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-16">
                      <VrHeadset className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Select an Experience</h3>
                      <p className="text-gray-500 max-w-md">
                        Choose a VR experience from the list to view details and access options
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {isAdmin && (
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Controls</CardTitle>
                    <CardDescription>
                      Manage VR experiences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Add New VR Experience
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="how-to" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How to Access VR Experiences</CardTitle>
                <CardDescription>
                  Follow these steps to immerse yourself in our VR world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <VrHeadset className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">1. Equipment Setup</h3>
                    <p className="text-gray-600">
                      Use any WebXR-compatible VR headset such as Meta Quest, Valve Index, or HTC Vive. Enable WebXR in your device settings.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LinkIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">2. Access the Experience</h3>
                    <p className="text-gray-600">
                      Scan the QR code with your headset, or launch directly from the website in WebXR mode using a compatible browser.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">3. Join the Community</h3>
                    <p className="text-gray-600">
                      Interact with other users, participate in events, and explore the virtual spaces created by FreeMillionaireChallenge participants.
                    </p>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Compatible Devices</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-md bg-white">
                      <Image className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                      <span className="text-sm font-medium">Meta Quest</span>
                    </div>
                    <div className="text-center p-4 border rounded-md bg-white">
                      <Image className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                      <span className="text-sm font-medium">Valve Index</span>
                    </div>
                    <div className="text-center p-4 border rounded-md bg-white">
                      <Image className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                      <span className="text-sm font-medium">HTC Vive</span>
                    </div>
                    <div className="text-center p-4 border rounded-md bg-white">
                      <Image className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                      <span className="text-sm font-medium">Pico</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming VR Features</CardTitle>
                <CardDescription>
                  Exciting new features coming to our VR platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Building className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Virtual Startup Campus</h3>
                          <p className="text-gray-600">
                            Explore a dedicated virtual campus where each participant has their own space to showcase their social entrepreneurship journey, complete with interactive displays and progress trackers.
                          </p>
                          <p className="text-sm text-primary mt-2">Coming August 2025</p>
                        </div>
                      </div>
                    </div>

                    <div className="border p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">VR Community Events</h3>
                          <p className="text-gray-600">
                            Attend live presentations, workshops, and networking events in VR where participants can share knowledge, viewers can ask questions, and the community can connect in immersive environments.
                          </p>
                          <p className="text-sm text-primary mt-2">Coming September 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Globe className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Interactive Global Impact Map</h3>
                          <p className="text-gray-600">
                            Visualize the global impact of FreeMillionaireChallenge projects in an interactive 3D world map, showing how each social entrepreneurship initiative is making a difference.
                          </p>
                          <p className="text-sm text-primary mt-2">Coming October 2025</p>
                        </div>
                      </div>
                    </div>

                    <div className="border p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Cube className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">3D NFT Badge Gallery</h3>
                          <p className="text-gray-600">
                            View and showcase your NFT badges in a dedicated 3D gallery where each badge comes to life with animations and interactive elements that tell your affiliate journey.
                          </p>
                          <p className="text-sm text-primary mt-2">Coming November 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Request a Feature</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Have an idea for a VR feature that would enhance the FreeMillionaireChallenge experience? Let us know!
                  </p>
                  <div className="flex gap-2">
                    <Input placeholder="Describe your VR feature idea..." className="flex-1" />
                    <Button>Submit</Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VRExperiencePage;