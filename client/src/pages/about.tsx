import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Award, 
  Users, 
  Download,
  Lightbulb,
  Target,
  Search,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  MessageSquare,
  Book,
  FileText
} from "lucide-react";

const AboutPage = () => {
  // Removed language translations as requested

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-7xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            The Free Millionaire Challenge
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Empowering the next generation of entrepreneurs and driving positive social impact through blockchain technology.
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="about">About FMC</TabsTrigger>
            <TabsTrigger value="objectives">Objectives</TabsTrigger>
            <TabsTrigger value="participants">Participation</TabsTrigger>
            <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
          </TabsList>

          {/* About Tab Content */}
          <TabsContent value="about" className="space-y-8 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-500" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The Free Millionaire Challenge (FMC) is an innovative social entrepreneurship platform built on the Binance Smart Chain. Our mission is to nurture the next generation of entrepreneurs by providing them with a global stage, supportive community, and blockchain-powered tools to document and showcase their journey toward creating impactful businesses with the potential for significant growth.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-amber-500" />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We envision a world where entrepreneurial talent can flourish regardless of geographical or socioeconomic barriers. Through transparent blockchain technology, global collaboration, and a commitment to positive social impact, we aim to create a new generation of successful entrepreneurs who balance profit with purpose.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>
                  What makes the Free Millionaire Challenge unique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Blockchain Transparency</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      All transactions and milestones are recorded on the Binance Smart Chain, ensuring complete transparency and trust.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Global Community</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Participants connect with mentors, investors, and supporters from around the world, breaking down geographical barriers.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Sustainable Growth</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Our platform is designed to support long-term sustainable business growth rather than short-term gains.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Recognition & Awards</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Three unique award categories recognize different aspects of entrepreneurial success and impact.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Educational Resources</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Access to curated resources, workshops, and mentorship opportunities to support entrepreneurial growth.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Multilingual Support</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Platform available in multiple global languages to ensure accessibility for entrepreneurs worldwide.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline</CardTitle>
                  <CardDescription>
                    Key dates for the Free Millionaire Challenge
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Application Period</span>
                    <span className="text-gray-500">May 15 - July 15, 2025</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Challenge Launch</span>
                    <span className="text-gray-500">August 1, 2025</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Monthly Updates</span>
                    <span className="text-gray-500">1st of each month</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Mid-Challenge Review</span>
                    <span className="text-gray-500">February 1, 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Final Awards Ceremony</span>
                    <span className="text-gray-500">August 1, 2026</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                  <CardDescription>
                    Resources for participants and community members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a href="/support" className="block hover:bg-gray-50 rounded-md p-2 transition-colors">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-amber-500" />
                        <div>
                          <h3 className="font-medium">Help Center</h3>
                          <p className="text-sm text-gray-600">
                            Visit our comprehensive support resources and FAQ
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="/support#self-service" className="block hover:bg-gray-50 rounded-md p-2 transition-colors">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-amber-500" />
                        <div>
                          <h3 className="font-medium">Self-Service Support</h3>
                          <p className="text-sm text-gray-600">
                            Browse our help resources and knowledge base
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="/terms" className="block hover:bg-gray-50 rounded-md p-2 transition-colors">
                      <div className="flex items-center gap-3">
                        <Book className="h-5 w-5 text-amber-500" />
                        <div>
                          <h3 className="font-medium">Terms of Service</h3>
                          <p className="text-sm text-gray-600">
                            Review our platform's terms and policies
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="/whitepaper" className="block hover:bg-gray-50 rounded-md p-2 transition-colors">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-amber-500" />
                        <div>
                          <h3 className="font-medium">Whitepaper</h3>
                          <p className="text-sm text-gray-600">
                            Read our detailed platform whitepaper
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objectives Tab Content */}
          <TabsContent value="objectives" className="space-y-8 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Objectives</CardTitle>
                <CardDescription>
                  The foundational goals that drive the Free Millionaire Challenge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="bg-amber-500 rounded-full p-2 text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Empowering Young Entrepreneurs</h3>
                    <p className="text-gray-600">
                      Support recent graduates under 35 with limited work experience to pursue entrepreneurial ventures by providing visibility, resources, and a supportive community.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-amber-500 rounded-full p-2 text-white">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Promoting Global Collaboration</h3>
                    <p className="text-gray-600">
                      Break down geographical barriers by creating a multilingual platform where entrepreneurs from diverse backgrounds can connect, share insights, and build networks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-amber-500 rounded-full p-2 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Ensuring Transparency</h3>
                    <p className="text-gray-600">
                      Leverage blockchain technology to create a transparent ecosystem where all transactions, voting, and progress updates are verifiable and immutable.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-amber-500 rounded-full p-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Documenting the Entrepreneurial Journey</h3>
                    <p className="text-gray-600">
                      Create a living archive of entrepreneurs' challenges and growth through monthly video updates, showcasing the reality of building successful ventures.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-amber-500 rounded-full p-2 text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Recognizing Various Forms of Success</h3>
                    <p className="text-gray-600">
                      Through our three award categories—Viewers' Choice, Judges' Choice, and Social Media Interaction—we recognize different paths to entrepreneurial success.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Impact Goals</CardTitle>
                <CardDescription>
                  How the Free Millionaire Challenge aims to create positive change
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Economic Empowerment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Support entrepreneurs in creating sustainable businesses that generate jobs and economic growth in their communities.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Educational Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Create a repository of knowledge and real-world experiences for aspiring entrepreneurs to learn from.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Tech Democratization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Make blockchain technology accessible and demonstrate its practical applications for entrepreneurial endeavors.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab Content */}
          <TabsContent value="participants" className="space-y-8 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>
                  Requirements for participating in the Free Millionaire Challenge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <span className="font-medium min-w-[180px]">Age Requirement:</span>
                  <span className="text-gray-600">35 years or younger</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <span className="font-medium min-w-[180px]">Education Status:</span>
                  <span className="text-gray-600">Recent graduate (within the last 3 years)</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <span className="font-medium min-w-[180px]">Work Experience:</span>
                  <span className="text-gray-600">Maximum 3 years of professional experience</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <span className="font-medium min-w-[180px]">Available Slots:</span>
                  <span className="text-gray-600">Limited to 9 participants for Season 1</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                  <span className="font-medium min-w-[180px]">Duration:</span>
                  <span className="text-gray-600">12-month commitment</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participation Requirements</CardTitle>
                <CardDescription>
                  What participants need to do throughout the challenge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Monthly Updates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">Video Documentation</h4>
                      <p className="text-sm text-gray-600">
                        Create and submit 5-10 minute video updates documenting your entrepreneurial journey each month.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">Progress Reports</h4>
                      <p className="text-sm text-gray-600">
                        Submit written progress reports detailing achievements, challenges, and future plans.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2">Platform Engagement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">Streaming Options</h4>
                      <p className="text-sm text-gray-600">
                        Participants can stream directly on the FMC platform or use social media platforms, maximizing visibility across channels.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">Community Interaction</h4>
                      <p className="text-sm text-gray-600">
                        Engage with the FMC community through comments, Q&A sessions, and collaborative opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2">NFT Badges & Recognition</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">Milestone Badges</h4>
                      <p className="text-sm text-gray-600">
                        Earn blockchain-verified NFT badges for achieving key milestones throughout your journey.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-1">Award Eligibility</h4>
                      <p className="text-sm text-gray-600">
                        Complete all requirements to be eligible for the three award categories at the end of the 12-month period.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Award Categories</CardTitle>
                <CardDescription>
                  The three ways participants can win recognition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-amber-400 shadow-md">
                    <CardHeader className="bg-amber-50">
                      <CardTitle className="text-center">Viewers' Choice</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-center text-gray-600 mb-4">
                        Awarded to the participant who receives the most votes from the FMC community and viewers.
                      </p>
                      <div className="text-center text-sm">
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          Community Voting
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-300 shadow-md">
                    <CardHeader className="bg-slate-50">
                      <CardTitle className="text-center">Judges' Choice</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-center text-gray-600 mb-4">
                        Selected by a panel of experienced entrepreneurs, investors, and industry experts.
                      </p>
                      <div className="text-center text-sm">
                        <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full">
                          Expert Evaluation
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-zinc-500 shadow-md">
                    <CardHeader className="bg-zinc-50">
                      <CardTitle className="text-center">Social Media Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-center text-gray-600 mb-4">
                        Recognizes the participant who generates the most engagement and positive impact across social platforms.
                      </p>
                      <div className="text-center text-sm">
                        <span className="bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full">
                          Engagement Metrics
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Whitepaper Tab Content */}
          <TabsContent value="tokenomics" className="space-y-8 pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>FMC Whitepaper</span>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Full PDF
                  </Button>
                </CardTitle>
                <CardDescription>
                  Comprehensive overview of the Free Millionaire Challenge for investors and strategic partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="executive-summary">
                    <AccordionTrigger>Executive Summary</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The Free Millionaire Challenge (FMC) represents an innovative blockchain-based social entrepreneurship platform designed to nurture, document, and showcase the journeys of emerging entrepreneurs. Built on the Binance Smart Chain, the platform provides a transparent, global stage for participants to build sustainable businesses while connecting with supporters, investors, and mentors.
                      </p>
                      <p>
                        With a limited cohort of 9 carefully selected participants for Season 1, the FMC creates a competitive yet collaborative environment that emphasizes sustainable business growth, positive social impact, and global reach.
                      </p>
                      <p>
                        This whitepaper outlines the technical infrastructure, business model, token economics, and growth strategy for the FMC platform, highlighting the unique value proposition for investors and strategic partners.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="market-analysis">
                    <AccordionTrigger>Market Analysis</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The convergence of entrepreneurship platforms, blockchain technology, and content creation has created a significant market opportunity. Key market indicators include:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>The global entrepreneurship education market is projected to reach $19.4 billion by 2028</li>
                        <li>Blockchain technology market is expected to grow at 66.2% CAGR from 2023-2030</li>
                        <li>Creator economy surpassed $100 billion in 2022 and continues to expand</li>
                        <li>Growth in equity crowdfunding platforms demonstrates appetite for early-stage investment opportunities</li>
                        <li>Rising interest in transparent, purpose-driven business models, particularly among younger audiences</li>
                      </ul>
                      <p>
                        The FMC platform is uniquely positioned at the intersection of these growth markets, offering a novel approach to entrepreneurship development, content creation, and blockchain utility.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="business-model">
                    <AccordionTrigger>Business Model & Revenue Streams</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The FMC platform operates on a multi-faceted business model with several revenue streams:
                      </p>
                      <h4 className="font-medium mt-4">Primary Revenue Streams:</h4>
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>
                          <span className="font-medium">Advertising Revenue:</span> Blockchain-verified ad placements on the platform, with strict content guidelines
                        </li>
                        <li>
                          <span className="font-medium">Transaction Fees:</span> Small gas fees on all platform transactions (voting, badge minting, etc.)
                        </li>
                        <li>
                          <span className="font-medium">Partnership Programs:</span> Strategic collaborations with educational institutions, accelerators, and corporate sponsors
                        </li>
                        <li>
                          <span className="font-medium">NFT Marketplace:</span> Secondary market for participant badges and achievement tokens
                        </li>
                        <li>
                          <span className="font-medium">Future Token Utility:</span> Development of FMC tokens for platform governance and rewards
                        </li>
                      </ol>
                      <p className="mt-4">
                        The platform employs a 70/30 profit distribution model, with 30% of all profits allocated to the founder and 70% reinvested into platform development, participant resources, and community growth.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="technical-infrastructure">
                    <AccordionTrigger>Technical Infrastructure</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The FMC platform is built on a robust technical foundation:
                      </p>
                      <h4 className="font-medium mt-4">Blockchain Integration:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Binance Smart Chain as the primary blockchain for transactions and smart contracts</li>
                        <li>MetaMask integration for seamless crypto payments and wallet connectivity</li>
                        <li>NFT badge system for participant verification and achievement recognition</li>
                        <li>Smart contracts managing voting mechanisms and award distribution</li>
                      </ul>
                      
                      <h4 className="font-medium mt-4">Platform Architecture:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>React.js frontend with TypeScript for enhanced type safety</li>
                        <li>Node.js backend with Express for efficient API handling</li>
                        <li>Integrated streaming capabilities for direct participant content creation</li>
                        <li>Multi-language support system for global accessibility</li>
                        <li>Content moderation algorithms for ensuring appropriate advertising</li>
                        <li>Distributed storage solutions for video content and progress updates</li>
                      </ul>
                      
                      <h4 className="font-medium mt-4">Security Measures:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Regular smart contract audits by third-party security firms</li>
                        <li>Encrypted data transmission and storage</li>
                        <li>Multi-factor authentication for admin functions</li>
                        <li>Automated content filtering for advertising compliance</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="token-economics">
                    <AccordionTrigger>Token Economics (Future Development)</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        While the initial platform operates without a native token, the FMC roadmap includes the development of FMC tokens with the following characteristics:
                      </p>
                      
                      <h4 className="font-medium mt-4">Token Utility:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Platform governance - token holders vote on challenge parameters and platform upgrades</li>
                        <li>Participant support - staking tokens for favorite entrepreneurs</li>
                        <li>Reward distribution - sharing in the success of platform graduates</li>
                        <li>Access to premium content and exclusive mentorship opportunities</li>
                      </ul>
                      
                      <h4 className="font-medium mt-4">Token Distribution:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>30% allocated to founder</li>
                        <li>20% reserved for platform operations and development</li>
                        <li>15% designated for marketing and community growth</li>
                        <li>15% allocated for participant incentives</li>
                        <li>10% for strategic partners and advisors</li>
                        <li>10% for public sale and liquidity provision</li>
                      </ul>
                      
                      <p className="mt-4">
                        The token economics are designed to align the interests of all stakeholders, create sustainable growth, and reward valuable contributions to the ecosystem.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="growth-strategy">
                    <AccordionTrigger>Growth Strategy</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The FMC platform has a clear growth strategy across multiple phases:
                      </p>
                      
                      <h4 className="font-medium mt-4">Phase 1: Launch and Establishment (2025-2026)</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Successfully run Season 1 with 9 participants</li>
                        <li>Establish brand awareness in key entrepreneurial hubs</li>
                        <li>Build strategic partnerships with educational institutions and accelerators</li>
                        <li>Optimize platform based on user feedback and performance metrics</li>
                      </ul>
                      
                      <h4 className="font-medium mt-4">Phase 2: Expansion (2026-2027)</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Launch Season 2 with increased participant capacity</li>
                        <li>Expand language offerings and global reach</li>
                        <li>Develop niche-specific challenges (tech, sustainability, etc.)</li>
                        <li>Introduce the FMC token ecosystem</li>
                        <li>Create alumni network and mentorship program</li>
                      </ul>
                      
                      <h4 className="font-medium mt-4">Phase 3: Ecosystem Development (2027-2028)</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Launch FMC Ventures to invest in promising participant businesses</li>
                        <li>Develop regional challenges and country-specific programs</li>
                        <li>Create educational content library and entrepreneurship courses</li>
                        <li>Build comprehensive entrepreneurial ecosystem with funding, resources, and support</li>
                      </ul>
                      
                      <p className="mt-4">
                        Key performance indicators will track user growth, engagement metrics, transaction volume, participant success rates, and brand recognition to measure progress against these strategic objectives.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="investment-opportunity">
                    <AccordionTrigger>Investment Opportunity</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The FMC platform represents a compelling investment opportunity for several reasons:
                      </p>
                      
                      <ul className="list-disc pl-6 space-y-4">
                        <li>
                          <span className="font-medium">First-Mover Advantage:</span> Unique combination of blockchain technology, entrepreneurship development, and content creation
                        </li>
                        <li>
                          <span className="font-medium">Scalable Business Model:</span> Multiple revenue streams with potential for significant growth as user base expands
                        </li>
                        <li>
                          <span className="font-medium">Global Market:</span> Platform designed for worldwide accessibility and adoption
                        </li>
                        <li>
                          <span className="font-medium">Social Impact:</span> Alignment with growing investor interest in purpose-driven businesses and impact measurement
                        </li>
                        <li>
                          <span className="font-medium">Token Ecosystem:</span> Future development of FMC tokens with utility and governance features
                        </li>
                        <li>
                          <span className="font-medium">Strategic Partnerships:</span> Opportunities for collaboration with educational institutions, accelerators, and corporate programs
                        </li>
                      </ul>
                      
                      <p className="mt-4">
                        Investment opportunities are available at various levels, from seed funding to strategic partnerships. Interested parties are invited to contact the FMC team for detailed financial projections and partnership discussions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="blockchain">
                    <AccordionTrigger>Blockchain Integration</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-gray-600">
                      <p>
                        The Free Millionaire Challenge operates on the Binance Smart Chain with transparent profit distribution and tokenomics:
                      </p>
                      
                      <div className="p-4 bg-gray-50 rounded-md mt-4">
                        <p>
                          <span className="font-medium">Platform Wallet:</span> 
                          <span className="text-gray-600 break-all">0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330</span>
                        </p>
                        <p><span className="font-medium">Blockchain:</span> Binance Smart Chain (BSC)</p>
                        <p className="mt-2">
                          <span className="font-medium">Revenue Distribution:</span> 30% to founder wallet / 70% to platform development and operations
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AboutPage;