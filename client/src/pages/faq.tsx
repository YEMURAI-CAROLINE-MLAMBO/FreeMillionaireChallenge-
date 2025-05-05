import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageSquare, ThumbsUp } from "lucide-react";

const FAQPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-5xl">
      <div className="space-y-12">
        <div className="text-center space-y-4" id="top">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Find answers to common questions about the Free Millionaire Challenge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
            <CardHeader className="pb-3">
              <HelpCircle className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-xl">General Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Basic information about the challenge, participation, and platform goals.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
            <CardHeader className="pb-3">
              <MessageSquare className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-xl">Participation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Learn about eligibility, application process, and participant responsibilities.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-transparent border-amber-200">
            <CardHeader className="pb-3">
              <ThumbsUp className="h-8 w-8 text-amber-500 mb-2" />
              <CardTitle className="text-xl">Platform & Technology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Information about blockchain integration, tokens, and technical aspects.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">FAQ Categories</h2>
            <div className="flex flex-wrap gap-3">
              <a href="#participants" className="text-amber-500 hover:underline">For Participants</a>
              <a href="#advertisers" className="text-amber-500 hover:underline">For Advertisers</a>
              <a href="#viewers" className="text-amber-500 hover:underline">For Viewers</a>
              <a href="#community" className="text-amber-500 hover:underline">Community</a>
              <a href="#eligibility" className="text-amber-500 hover:underline">Eligibility</a>
              <a href="#metamask-guide" className="text-amber-500 hover:underline">MetaMask Guide</a>
              <a href="#nft-badges" className="text-amber-500 hover:underline">NFT Badges</a>
              <a href="#ad-guidelines" className="text-amber-500 hover:underline">Ad Guidelines</a>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                What is the Free Millionaire Challenge?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The Free Millionaire Challenge is a social entrepreneurship platform that functions as a gamified startup incubator for young entrepreneurs globally. It enables participants to document their 12-month entrepreneurial journey through short videos while receiving support, education, and potential funding opportunities. The platform is built on blockchain technology with a focus on social impact and entrepreneurial education.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                Who can participate in the challenge?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                For Season 1, participation is limited to 9 eligible contestants who are recent graduates under 35 years old with a maximum of 3 years professional experience. Participants must have an entrepreneurial mindset and be focused on social impact. The selection process evaluates applicants based on their innovative ideas, social impact potential, and commitment to the 12-month program.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                When is the application period?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The application period for Season 1 runs from May 15, 2025, to July 15, 2025. The challenge officially launches on August 1, 2025, and runs for 12 months.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                Is there a cost to participate?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No, participation is completely free. The platform is monetized through advertisement revenue, not through participant fees. This aligns with our mission to create accessible entrepreneurial opportunities for young people regardless of financial background.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                What are the video requirements for participants?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Participants must document their entrepreneurial journey through short videos of 5-10 minutes duration. These videos should showcase progress, challenges, and learnings throughout the 12-month period. The platform provides guidelines on content, format, and submission processes to ensure quality and consistency.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                What blockchain technology does the platform use?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The platform is built on Binance Smart Chain (BSC), which provides fast, low-cost transactions. Payments for advertisements and other platform transactions are processed through MetaMask integration, allowing for seamless cryptocurrency transactions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                What are the award categories?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                There are three award categories that will be given at the end of the 12-month challenge period. These awards recognize different aspects of entrepreneurial success, innovation, and social impact. The specific award categories and criteria are detailed in the challenge guidelines.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                How does the affiliate program work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Affiliates receive NFT badges that they can monetize. The program offers revenue sharing between 5-10% for affiliates who help promote the platform and attract advertisers or participants. These NFT badges serve as proof of affiliation and enable revenue tracking on the blockchain.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                What happens after the 12-month challenge?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                After completing the 12-month challenge, participants may have opportunities for angel investments and continued entrepreneurial support. The platform serves as a launching pad for promising ventures, with successful participants potentially gaining access to investor networks and additional resources.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium">
                How is content moderated on the platform?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                The platform has strict content moderation rules prohibiting NSFW content, hate speech, and scams. All advertisements undergo a moderation process before being approved, and participant content is also reviewed to ensure it meets community guidelines. An admin moderation queue system is in place to manage this process efficiently.
              </AccordionContent>
            </AccordionItem>

            {/* For Participants Section */}
            <div id="participants" className="pt-8 pb-4 border-t mt-8">
              <h2 className="text-2xl font-bold mb-4">For Participants</h2>
            </div>
            
            <AccordionItem value="participant-1" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="eligibility">
                What are the eligibility requirements?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To be eligible for the Free Millionaire Challenge Season 1, you must:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Be a recent graduate (within the last 5 years)</li>
                  <li>Be under 35 years of age</li>
                  <li>Have maximum 3 years of professional experience</li>
                  <li>Have a social entrepreneurship business idea with positive impact potential</li>
                  <li>Commit to the full 12-month program, including monthly video updates</li>
                  <li>Be selected through our application process by the creator</li>
                </ul>
                Only 9 participants will be selected for Season 1.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="participant-2" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="submit-videos">
                How do I submit my monthly videos?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                As a participant, you'll have access to a dedicated dashboard where you can upload your monthly progress videos. Videos should be 5-10 minutes in length and follow our content guidelines. You'll receive specific upload instructions and deadlines through your participant dashboard once the challenge begins.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="participant-3" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="tracking">
                How is progress tracked during the challenge?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Progress is tracked through your monthly video submissions, which document your entrepreneurial journey. You'll also have access to a progress tracking dashboard where you can set goals, track milestones, and receive feedback from viewers and mentors. All tracking data is securely stored and can be referenced throughout your journey.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="participant-4" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="nft-badges">
                How do I receive my NFT badge?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Once selected as a participant, you'll be issued an official NFT badge that verifies your participation status on the blockchain. This badge is automatically minted and assigned to your registered wallet address. You'll need to have a compatible Web3 wallet (like MetaMask) connected to your account to receive and view your badge.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="participant-5" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="resources">
                What learning resources are available to participants?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Participants have access to a comprehensive resource library that includes entrepreneurship guides, social impact case studies, financial planning tools, and marketing resources. We also provide networking opportunities with mentors and webinars on relevant topics throughout the 12-month period.
              </AccordionContent>
            </AccordionItem>

            {/* For Advertisers Section */}
            <div id="advertisers" className="pt-8 pb-4 border-t mt-8">
              <h2 className="text-2xl font-bold mb-4">For Advertisers</h2>
            </div>
            
            <AccordionItem value="advertiser-1" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="submit-ads">
                How do I submit advertisement content?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To submit an advertisement, go to the "Submit Ad" page from the main navigation menu. You'll need to create an account, provide your ad content (including text and images), select your target audience, and complete the payment process using cryptocurrency. All ads undergo a content moderation review before being approved and displayed on the platform.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advertiser-2" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="ad-specs">
                What are the ad format specifications?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We accept the following ad formats:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Banner ads: 1200x150px (desktop), 600x150px (mobile), max 200KB, JPG/PNG format</li>
                  <li>Sidebar ads: 300x250px, max 150KB, JPG/PNG format</li>
                  <li>Text ads: Up to 50 characters for headline, 150 characters for description</li>
                  <li>All ads must include a clear call-to-action and destination URL</li>
                </ul>
                We recommend using high-quality images and concise messaging for best results.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advertiser-3" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="content-policy">
                What are the content moderation guidelines?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our content moderation system prohibits:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Adult content or nudity</li>
                  <li>Hate speech or discriminatory content</li>
                  <li>Scams or fraudulent offerings</li>
                  <li>Content related to illegal activities</li>
                  <li>Violent or graphic imagery</li>
                  <li>Misleading health claims</li>
                  <li>Cryptocurrency or blockchain projects without proper disclosures</li>
                </ul>
                All ads are reviewed by our automated system and may undergo additional human review when necessary.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advertiser-4" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="crypto-payments">
                How do I make crypto payments for advertisements?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We accept payments in multiple cryptocurrencies including BNB (Binance Smart Chain), ETH (Ethereum), and MATIC (Polygon). During the ad submission process, you'll be prompted to connect your Web3 wallet (like MetaMask) and complete the payment. The system will guide you through the transaction process, including network selection and gas fee estimation.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="advertiser-5" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="ad-metrics">
                What ad performance metrics are available?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Advertisers receive detailed analytics including impressions, clicks, click-through rates, engagement time, and conversion tracking. All metrics are available in real-time through your advertiser dashboard, with options to export reports in various formats. We use blockchain technology to ensure transparent and verifiable reporting of ad performance.
              </AccordionContent>
            </AccordionItem>

            {/* For Viewers Section */}
            <div id="viewers" className="pt-8 pb-4 border-t mt-8">
              <h2 className="text-2xl font-bold mb-4">For Viewers</h2>
            </div>
            
            <AccordionItem value="viewer-1" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="viewer-account">
                How do I create a viewer account?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To create a viewer account, click on the "Register" button in the top navigation bar and select the "Join as Viewer" option. Fill out the required information, verify your email address, and set up your profile. As a viewer, you'll have access to participant videos, voting features, and community discussions without any cost.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="viewer-2" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="voting">
                How does voting for participants work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Registered viewers can vote for participants through our secure voting system. Voting periods open after each monthly update cycle, allowing you to support your favorite entrepreneurs. The Viewers' Choice Award is determined by accumulated votes over the 12-month period. One account is limited to one vote per participant per month to ensure fairness.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="viewer-3" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="connecting-wallet">
                How do I connect my cryptocurrency wallet?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To connect your wallet, click on the "Connect Wallet" button in the navigation menu. We support various wallet providers, with MetaMask being the primary option. Follow the prompts to authorize the connection. Having a connected wallet allows you to participate in voting, become an affiliate, and engage with other blockchain features of the platform.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="viewer-4" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="metamask-guide">
                How do I set up and use MetaMask with FMC?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To use MetaMask with our platform:
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Install the MetaMask extension from metamask.io</li>
                  <li>Create a new wallet or import an existing one</li>
                  <li>Add Binance Smart Chain network (we provide easy setup button)</li>
                  <li>Ensure you have a small amount of BNB for transaction fees</li>
                  <li>Click "Connect Wallet" on our platform and select MetaMask</li>
                  <li>Approve the connection request in the MetaMask popup</li>
                </ol>
                Once connected, your wallet address will appear in your profile, allowing you to interact with blockchain features.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="viewer-5" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="affiliate-program">
                How do I become an affiliate?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                To become an affiliate, navigate to the Affiliate Program page and click "Apply Now." You'll need to have a connected wallet, provide some basic information, and agree to the affiliate terms. Once approved, you'll receive your NFT badge that enables commission tracking and allows you to promote the platform using your unique affiliate link. The program offers three tiers with commission rates of 5%, 7.5%, and 10%.
              </AccordionContent>
            </AccordionItem>

            {/* Community Section */}
            <div id="community" className="pt-8 pb-4 border-t mt-8">
              <h2 className="text-2xl font-bold mb-4">Community Resources</h2>
            </div>
            
            <AccordionItem value="community-1" className="border rounded-md px-4">
              <AccordionTrigger className="text-lg font-medium" id="ad-guidelines">
                What are the advertisement guidelines?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our advertising guidelines ensure that all ads are ethical, relevant, and engaging. We particularly welcome ads related to entrepreneurship resources, business tools, educational content, and products/services aligned with social impact goals. All ads must comply with our content policy, which prohibits inappropriate content, misleading claims, and discriminatory messaging.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;