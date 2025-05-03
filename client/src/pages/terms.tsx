import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, FileText, Lock, Scale, ShieldAlert } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-6xl">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Please review these terms carefully before using the Free Millionaire Challenge platform
          </p>
          <div className="flex items-center justify-center space-x-4 pt-2">
            <p className="text-sm text-gray-500">Last Updated: May 2025</p>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="terms" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="conduct">Code of Conduct</TabsTrigger>
            <TabsTrigger value="cookies">Cookies Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold">1. Introduction</h2>
                      <p className="text-gray-600 mt-2">
                        Welcome to the Free Millionaire Challenge ("the Platform"). These Terms of Service ("Terms") govern your access to and use of our website, services, applications, and tools provided by the Free Millionaire Challenge.
                      </p>
                      <p className="text-gray-600 mt-2">
                        By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not access or use our Platform. We may modify these Terms at any time, and such modifications shall be effective immediately upon posting on the Platform. Your continued use of the Platform following any modifications indicates your acceptance of the modified Terms.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Scale className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold">2. Eligibility and Registration</h2>
                      <p className="text-gray-600 mt-2">
                        2.1. <span className="font-medium">Participant Eligibility:</span> For Season 1, participation as a contestant is limited to individuals who meet the following criteria: (a) recent graduates under 35 years of age, (b) maximum of 3 years professional experience, (c) commitment to social entrepreneurship principles, and (d) ability to consistently document their entrepreneurial journey for 12 months.
                      </p>
                      <p className="text-gray-600 mt-2">
                        2.2. <span className="font-medium">Viewer Registration:</span> Anyone can register as a viewer on the Platform, subject to compliance with these Terms. Viewers may watch participant content, vote for participants, and engage with the Platform community.
                      </p>
                      <p className="text-gray-600 mt-2">
                        2.3. <span className="font-medium">Account Security:</span> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldAlert className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold">3. Platform Rules and Conduct</h2>
                      <p className="text-gray-600 mt-2">
                        3.1. <span className="font-medium">Participant Obligations:</span> Participants must (a) create and post regular video updates (5-10 minutes) documenting their entrepreneurial journey, (b) engage constructively with the community, (c) adhere to content guidelines, and (d) maintain focus on social entrepreneurship principles.
                      </p>
                      <p className="text-gray-600 mt-2">
                        3.2. <span className="font-medium">Prohibited Content:</span> Users may not post content that is (a) illegal, (b) infringing upon intellectual property rights, (c) obscene or pornographic, (d) hateful or discriminatory, (e) threatening or harassing, (f) false or misleading, or (g) promoting scams or fraudulent schemes.
                      </p>
                      <p className="text-gray-600 mt-2">
                        3.3. <span className="font-medium">Moderation:</span> All content submitted to the Platform is subject to moderation. We reserve the right to remove any content that violates these Terms or that we determine, in our sole discretion, is harmful to the Platform or its users.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
                      <p className="text-gray-600 mt-2">
                        4.1. <span className="font-medium">Platform Content:</span> All content on the Platform, including text, graphics, logos, and software, is the property of the Free Millionaire Challenge or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                      </p>
                      <p className="text-gray-600 mt-2">
                        4.2. <span className="font-medium">User Content:</span> By posting content on the Platform, you grant the Free Millionaire Challenge a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection with the Platform and the Free Millionaire Challenge's business.
                      </p>
                      <p className="text-gray-600 mt-2">
                        4.3. <span className="font-medium">Participant Business Rights:</span> Participants retain all intellectual property rights in their businesses, ideas, and innovations. The Platform does not claim ownership of participants' entrepreneurial ventures.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lock className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold">5. Blockchain and Financial Terms</h2>
                      <p className="text-gray-600 mt-2">
                        5.1. <span className="font-medium">Blockchain Integration:</span> The Platform utilizes Binance Smart Chain (BSC) for transaction processing. By using the Platform's blockchain features, you acknowledge the inherent risks associated with blockchain technology.
                      </p>
                      <p className="text-gray-600 mt-2">
                        5.2. <span className="font-medium">Financial Transactions:</span> All payments on the Platform are processed in cryptocurrency through MetaMask or other approved wallets. You are responsible for ensuring the accuracy of transaction details and maintaining adequate funds for your activities.
                      </p>
                      <p className="text-gray-600 mt-2">
                        5.3. <span className="font-medium">NFT Badges:</span> NFT badges issued by the Platform are subject to the terms specified at the time of issuance. Affiliate revenue sharing through NFT badges is governed by specific agreements between affiliates and the Platform.
                      </p>
                      <p className="text-gray-600 mt-2">
                        5.4. <span className="font-medium">Tokenomics:</span> The Platform's token economics, including the 30% founder profit distribution, are transparent and encoded in smart contracts. Users acknowledge and accept this distribution model when participating in the Platform ecosystem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Additional Terms</h3>
                  <p className="text-gray-600">
                    These Terms of Service represent only a portion of our full legal agreement. Please also review our Privacy Policy, Code of Conduct, and Cookies Policy for a complete understanding of the terms governing your use of the Platform.
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <Button variant="outline" size="sm" className="text-sm">Contact Legal Team</Button>
                    <Button variant="outline" size="sm" className="text-sm">Report a Violation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p className="text-gray-600 mb-6">
                  At the Free Millionaire Challenge, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our Platform.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">1. Information We Collect</h3>
                    <p className="text-gray-600 mt-1">
                      We collect information you provide directly to us, such as account information, profile details, content you post, and communications. We also automatically collect certain information when you visit or use our Platform, including log data, device information, and usage information.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">2. How We Use Your Information</h3>
                    <p className="text-gray-600 mt-1">
                      We use your information to provide and improve our services, communicate with you, personalize your experience, process transactions, and ensure platform security. We may also use your information for research and analytics to enhance our Platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">3. Information Sharing</h3>
                    <p className="text-gray-600 mt-1">
                      We may share your information with service providers who perform services on our behalf, business partners, and in response to legal requests. We may also share aggregated or de-identified information that cannot reasonably be used to identify you.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">4. Blockchain Data</h3>
                    <p className="text-gray-600 mt-1">
                      Transactions conducted on the blockchain are public and immutable. While we do not directly link personal information to blockchain transactions, wallet addresses and transaction details are publicly visible on the blockchain.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">5. Your Choices</h3>
                    <p className="text-gray-600 mt-1">
                      You can update your account information, opt out of certain communications, and request deletion of your account. However, certain information may be retained as required by law or for legitimate business purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conduct" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-4">Code of Conduct</h2>
                <p className="text-gray-600 mb-6">
                  Our Code of Conduct establishes the principles and standards that guide behavior on the Free Millionaire Challenge platform. All users are expected to adhere to these guidelines to maintain a positive, productive, and inclusive community.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">1. Respectful Communication</h3>
                    <p className="text-gray-600 mt-1">
                      Treat all community members with respect and dignity. Offensive language, personal attacks, harassment, or discrimination of any kind will not be tolerated. Constructive criticism should focus on ideas, not individuals.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">2. Honest Representation</h3>
                    <p className="text-gray-600 mt-1">
                      Present yourself and your business ventures honestly. Misrepresentation, false claims, or deceptive practices undermine the integrity of the platform and the community's trust.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">3. Ethical Business Practices</h3>
                    <p className="text-gray-600 mt-1">
                      Adhere to ethical business standards in all platform activities. This includes fair dealing, transparency, respecting intellectual property rights, and avoiding conflicts of interest.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">4. Social Impact Focus</h3>
                    <p className="text-gray-600 mt-1">
                      Maintain a genuine commitment to social entrepreneurship principles. Business ventures should demonstrate consideration for social, environmental, or community impact alongside commercial objectives.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">5. Community Support</h3>
                    <p className="text-gray-600 mt-1">
                      Contribute positively to the community by offering constructive feedback, sharing relevant knowledge, and supporting fellow participants in their entrepreneurial journeys.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cookies" className="space-y-6">
            <Card className="p-6">
              <CardContent className="p-0">
                <h2 className="text-2xl font-semibold mb-4">Cookies Policy</h2>
                <p className="text-gray-600 mb-6">
                  This Cookies Policy explains how the Free Millionaire Challenge uses cookies and similar technologies to recognize you when you visit our Platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">1. What Are Cookies</h3>
                    <p className="text-gray-600 mt-1">
                      Cookies are small data files placed on your device when you visit a website. Cookies serve various functions, including enabling certain features, remembering your preferences, and understanding how you interact with our Platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">2. Types of Cookies We Use</h3>
                    <p className="text-gray-600 mt-1">
                      We use essential cookies necessary for the operation of our Platform, analytical cookies that help us understand how users interact with our Platform, and functional cookies that remember your preferences and settings.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">3. Third-Party Cookies</h3>
                    <p className="text-gray-600 mt-1">
                      Some cookies are placed by third parties on our behalf. These third parties may include analytics providers, advertising networks, and social media platforms. These cookies collect information about your browsing habits and online behavior.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">4. Your Cookie Choices</h3>
                    <p className="text-gray-600 mt-1">
                      You can manage your cookie preferences through your browser settings. Most browsers allow you to refuse cookies, delete cookies, or be notified when a cookie is set. However, disabling cookies may affect the functionality of our Platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">5. Updates to This Policy</h3>
                    <p className="text-gray-600 mt-1">
                      We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide more prominent notice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TermsPage;