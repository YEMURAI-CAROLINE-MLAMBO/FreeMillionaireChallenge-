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
        <div className="text-center space-y-4">
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
                The application period for Season 1 runs from March 1, 2025, to July 31, 2025. The challenge officially launches on August 1, 2025, and runs for 12 months.
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
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;