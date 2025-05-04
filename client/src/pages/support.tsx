import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtSign, HelpCircle, LifeBuoy, Mail, MessageSquare, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportPage = () => {
  const { toast } = useToast();

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond within 48 hours.",
    });
    // Reset form (would be handled by form library in a real implementation)
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-6xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            Support Center
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Get the help you need to succeed in the Free Millionaire Challenge
          </p>
        </div>

        <Tabs defaultValue="contact" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="help">Help Topics</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Support</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Get in Touch</h2>
                  <p className="text-gray-500">
                    Have questions about the Free Millionaire Challenge? We're here to help!
                    Fill out the form, and our support team will get back to you within 48 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your full name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Please describe your issue or question in detail..." required className="min-h-[150px]" />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
                  <p className="text-gray-500">
                    Choose the method that works best for you. Our support team is available 
                    Monday through Friday, 9:00 AM to 5:00 PM UTC.
                  </p>
                </div>

                <div className="grid gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-amber-500" />
                        <CardTitle className="text-lg">Email Support</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Send us an email for non-urgent inquiries
                      </p>
                      <p className="text-sm font-medium mt-1">
                        <a href="mailto:ymlambo21@gmail.com" className="text-amber-600 hover:text-amber-800 transition-colors">
                          Contact Support
                        </a>
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-5 w-5 text-amber-500" />
                        <CardTitle className="text-lg">Live Chat</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Chat with our support team in real-time
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Available on weekdays, 9AM-5PM UTC
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <AtSign className="h-5 w-5 text-amber-500" />
                        <CardTitle className="text-lg">Social Media</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Reach out to us on our social platforms
                      </p>
                      <div className="flex space-x-3 mt-2">
                        <a href="#" className="text-gray-600 hover:text-amber-500">Twitter</a>
                        <a href="#" className="text-gray-600 hover:text-amber-500">LinkedIn</a>
                        <a href="#" className="text-gray-600 hover:text-amber-500">Instagram</a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-amber-500" />
                    <span>For Participants</span>
                  </CardTitle>
                  <CardDescription>
                    Help for challenge contestants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• How to submit your monthly videos</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Progress tracking guidelines</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Setting up your MetaMask wallet</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Receiving your NFT badge</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Accessing learning resources</a>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Resources</Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LifeBuoy className="h-5 w-5 text-amber-500" />
                    <span>For Advertisers</span>
                  </CardTitle>
                  <CardDescription>
                    Help with platform advertising
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Submitting advertisement content</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Ad format specifications</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Content moderation guidelines</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Making crypto payments</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Advertising performance metrics</a>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Resources</Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-amber-500" />
                    <span>For Viewers</span>
                  </CardTitle>
                  <CardDescription>
                    Help for platform viewers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Creating a viewer account</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Voting for participants</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Connecting your wallet</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Accessing VR experiences</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-amber-500">• Becoming an affiliate</a>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Resources</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Support</CardTitle>
                <CardDescription>
                  Use these channels for urgent issues requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="text-lg font-medium flex items-center space-x-2 mb-2">
                    <Phone className="h-5 w-5 text-amber-500" />
                    <span>Priority Support Line</span>
                  </h3>
                  <p className="text-gray-600 mb-2">
                    For urgent technical issues or account compromises, please contact our emergency support line:
                  </p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Available 24/7 for emergency situations only
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="text-lg font-medium flex items-center space-x-2 mb-2">
                    <Mail className="h-5 w-5 text-amber-500" />
                    <span>Urgent Email Support</span>
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Send an email with "URGENT" in the subject line for priority handling:
                  </p>
                  <p className="font-medium">
                    <a href="mailto:ymlambo21@gmail.com?subject=URGENT:" className="text-amber-600 hover:text-amber-800 transition-colors">
                      Contact Emergency Support
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    24-hour response time for urgent matters
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Please note: Emergency channels are for genuine urgent matters only. 
                    Non-emergency inquiries sent through these channels may experience delays.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupportPage;