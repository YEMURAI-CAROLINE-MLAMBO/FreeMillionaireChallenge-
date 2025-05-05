import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, LifeBuoy, MessageSquare, Phone } from "lucide-react";

const SupportPage = () => {

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
          <TabsList className="grid w-full grid-cols-2 max-w-xl mx-auto">
            <TabsTrigger value="contact">Self-Service Help</TabsTrigger>
            <TabsTrigger value="help">Help Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-semibold">Self-Service Support Center</h2>
                <p className="text-gray-500">
                  Our comprehensive knowledge base has answers to most common questions about the Free Millionaire Challenge.
                  Browse the resources below to find the information you need.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-amber-500" />
                      <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Find answers to the most common questions about participating in the challenge,
                        advertising on the platform, and navigating the ecosystem.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        asChild
                      >
                        <a href="/faq">View FAQ</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-amber-500" />
                      <CardTitle className="text-lg">Community Resources</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Connect with other participants and viewers in our community forums.
                        Search existing discussions or browse by topic.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        asChild
                      >
                        <a href="/faq#community">Browse Forums</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Popular Help Topics</CardTitle>
                  <CardDescription>
                    Quick links to our most accessed support resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/faq#metamask-guide" className="block px-4 py-3 border rounded-md hover:bg-amber-50 hover:border-amber-200 transition-colors">
                      <h3 className="font-medium">Using MetaMask with FMC</h3>
                      <p className="text-sm text-gray-500">Step-by-step guide to connecting your wallet</p>
                    </a>
                    <a href="/faq#eligibility" className="block px-4 py-3 border rounded-md hover:bg-amber-50 hover:border-amber-200 transition-colors">
                      <h3 className="font-medium">Participant Eligibility Requirements</h3>
                      <p className="text-sm text-gray-500">Criteria for joining the challenge</p>
                    </a>
                    <a href="/faq#nft-badges" className="block px-4 py-3 border rounded-md hover:bg-amber-50 hover:border-amber-200 transition-colors">
                      <h3 className="font-medium">NFT Badge Registration</h3>
                      <p className="text-sm text-gray-500">Understanding participant and affiliate badges</p>
                    </a>
                    <a href="/faq#ad-guidelines" className="block px-4 py-3 border rounded-md hover:bg-amber-50 hover:border-amber-200 transition-colors">
                      <h3 className="font-medium">Advertisement Guidelines</h3>
                      <p className="text-sm text-gray-500">Content policies and submission process</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
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
                  <a href="/faq#submit-videos" className="block text-sm text-gray-600 hover:text-amber-500">• How to submit your monthly videos</a>
                  <a href="/faq#tracking" className="block text-sm text-gray-600 hover:text-amber-500">• Progress tracking guidelines</a>
                  <a href="/faq#metamask-guide" className="block text-sm text-gray-600 hover:text-amber-500">• Setting up your MetaMask wallet</a>
                  <a href="/faq#nft-badges" className="block text-sm text-gray-600 hover:text-amber-500">• Receiving your NFT badge</a>
                  <a href="/faq#resources" className="block text-sm text-gray-600 hover:text-amber-500">• Accessing learning resources</a>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/faq#participants">View All Resources</a>
                  </Button>
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
                  <a href="/faq#submit-ads" className="block text-sm text-gray-600 hover:text-amber-500">• Submitting advertisement content</a>
                  <a href="/faq#ad-specs" className="block text-sm text-gray-600 hover:text-amber-500">• Ad format specifications</a>
                  <a href="/faq#content-policy" className="block text-sm text-gray-600 hover:text-amber-500">• Content moderation guidelines</a>
                  <a href="/faq#crypto-payments" className="block text-sm text-gray-600 hover:text-amber-500">• Making crypto payments</a>
                  <a href="/faq#ad-metrics" className="block text-sm text-gray-600 hover:text-amber-500">• Advertising performance metrics</a>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/faq#advertisers">View All Resources</a>
                  </Button>
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
                  <a href="/faq#viewer-account" className="block text-sm text-gray-600 hover:text-amber-500">• Creating a viewer account</a>
                  <a href="/faq#voting" className="block text-sm text-gray-600 hover:text-amber-500">• Voting for participants</a>
                  <a href="/faq#connecting-wallet" className="block text-sm text-gray-600 hover:text-amber-500">• Connecting your wallet</a>
                  <a href="/faq#vr-support" className="block text-sm text-gray-600 hover:text-amber-500">• Accessing VR experiences</a>
                  <a href="/faq#affiliate-program" className="block text-sm text-gray-600 hover:text-amber-500">• Becoming an affiliate</a>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/faq#viewers">View All Resources</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupportPage;