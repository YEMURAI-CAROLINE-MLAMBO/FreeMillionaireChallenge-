import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Check, Users, DollarSign, FileText, Award, Medal, Shield } from 'lucide-react';

const AffiliateProgram: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-gradient-gold">Affiliate Program</h1>
        <p className="text-dark-medium text-lg">
          Join our affiliate program and earn rewards for promoting the FreeMillionaireChallenge.
        </p>
      </div>

      <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="nft-badges">NFT Badges</TabsTrigger>
          <TabsTrigger value="smart-contract">Smart Contract</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Become an affiliate partner and earn commissions for each successful referral.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Join</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up for our affiliate program and get your unique referral link.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Share</h3>
                  <p className="text-sm text-muted-foreground">
                    Promote the FreeMillionaireChallenge using your unique link.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Earn</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive commissions when your referrals submit ads or join as participants.
                  </p>
                </div>
              </div>

              <div className="bg-black/5 p-6 rounded-lg mt-8">
                <h3 className="font-medium text-lg mb-4">Commission Structure</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Ad Submission Referral</span>
                    <span className="font-medium">5% of ad payment</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span>Participant Referral</span>
                    <span className="font-medium">10% of first earnings</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span>Recurring Commission</span>
                    <span className="font-medium">2% lifetime commission</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/register">
                <Button className="btn-gold">Apply to Become an Affiliate</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Benefits</CardTitle>
              <CardDescription>
                Why you should join our affiliate program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Competitive Commission Rates</h3>
                    <p className="text-muted-foreground">
                      Earn up to 10% commission on all referrals with transparent payment structure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Smart Contract Payments</h3>
                    <p className="text-muted-foreground">
                      All commissions are secured by blockchain smart contracts, ensuring transparent and automatic payments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Marketing Materials</h3>
                    <p className="text-muted-foreground">
                      Get access to professionally designed banners, videos, and promotional content to boost your marketing efforts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Real-time Tracking</h3>
                    <p className="text-muted-foreground">
                      Monitor your referrals, clicks, and earnings in real-time through your affiliate dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Dedicated Support</h3>
                    <p className="text-muted-foreground">
                      Get priority support from our affiliate management team to help you maximize your earnings.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft-badges" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exclusive NFT Badges</CardTitle>
              <CardDescription>
                Earn and monetize unique NFT badges as an affiliate partner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <p className="text-lg mb-6">
                    As an affiliate, you'll receive exclusive NFT badges that serve as both recognition of your contribution 
                    and a revenue-generating asset you can leverage.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-300 rounded-lg p-6 shadow-sm border border-amber-200 text-center">
                    <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-amber-600 h-8 w-8" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Bronze Affiliate</h3>
                    <p className="text-sm text-amber-900/80 mb-4">
                      Entry-level badge earned after 5 successful referrals
                    </p>
                    <ul className="text-left text-sm space-y-2 text-amber-900/70">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                        <span>5% revenue sharing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                        <span>Basic affiliate dashboard</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-600" />
                        <span>Digital certificate of achievement</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg p-6 shadow-sm border border-gray-200 text-center">
                    <div className="bg-gray-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Medal className="text-gray-600 h-8 w-8" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Silver Affiliate</h3>
                    <p className="text-sm text-gray-900/80 mb-4">
                      Advanced badge earned after 15 successful referrals
                    </p>
                    <ul className="text-left text-sm space-y-2 text-gray-900/70">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>7.5% revenue sharing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>Priority support channel</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>Advanced marketing materials</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>Monetizable badge profile page</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-300 to-yellow-500 rounded-lg p-6 shadow-sm border border-yellow-400 text-center">
                    <div className="bg-yellow-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-yellow-700 h-8 w-8" />
                    </div>
                    <h3 className="font-medium text-lg mb-2">Gold Affiliate</h3>
                    <p className="text-sm text-amber-900/80 mb-4">
                      Elite badge earned after 30 successful referrals
                    </p>
                    <ul className="text-left text-sm space-y-2 text-amber-900/70">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-800" />
                        <span>10% revenue sharing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-800" />
                        <span>VIP membership benefits</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-800" />
                        <span>Custom badge design options</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-800" />
                        <span>Enhanced monetization tools</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-amber-800" />
                        <span>Early access to new features</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-black/5 p-6 rounded-lg mt-4">
                  <h3 className="font-medium text-lg mb-4">How to Monetize Your NFT Badges</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Your NFT badges aren't just for show - they're designed to help you generate additional revenue:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                          <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">Direct Revenue Sharing:</span>
                          <p className="text-sm text-muted-foreground">Each badge automatically entitles you to a percentage of all transactions from your referrals.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">Badge Profile Marketing:</span>
                          <p className="text-sm text-muted-foreground">Each badge comes with a customizable profile page where you can showcase your achievements and attract new referrals.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                          <Shield className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="font-medium">Badge Transferability:</span>
                          <p className="text-sm text-muted-foreground">NFT badges can be transferred to others, allowing you to potentially sell your position as an affiliate.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/register">
                <Button className="btn-gold">Apply for Your NFT Badge</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="smart-contract" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Rules</CardTitle>
              <CardDescription>
                Transparent and immutable rules enforced by blockchain technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-black/5 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Self-Advertising Restriction</h3>
                  <p className="text-muted-foreground mb-4">
                    FreeMillionaireChallenge participants are prohibited from advertising on their own projects. This rule is enforced by our smart contract to ensure fair competition and prevent conflicts of interest.
                  </p>
                  <div className="bg-black/10 p-4 rounded font-mono text-xs">
                    <pre className="whitespace-pre-wrap">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FMCRules {
    mapping(address => bool) public participants;
    mapping(address => bool) public advertisers;
    
    // Prevents participants from advertising their own projects
    modifier noSelfAdvertising() {
        require(!participants[msg.sender] || !advertisers[msg.sender], 
                "Participants cannot advertise their own projects");
        _;
    }
    
    // Function to submit an advertisement
    function submitAdvertisement() external noSelfAdvertising {
        // Advertisement submission logic
        advertisers[msg.sender] = true;
    }
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-black/5 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Affiliate Rewards Distribution</h3>
                  <p className="text-muted-foreground mb-4">
                    The smart contract automatically distributes affiliate rewards according to the commission structure. This ensures transparent and immediate payments to all affiliates.
                  </p>
                  <div className="bg-black/10 p-4 rounded font-mono text-xs">
                    <pre className="whitespace-pre-wrap">
{`// Affiliate commission distribution
function distributeCommission(address affiliate, uint256 amount) internal {
    uint256 commission = (amount * affiliateRate) / 100;
    payable(affiliate).transfer(commission);
    emit CommissionPaid(affiliate, commission);
}`}
                    </pre>
                  </div>
                </div>

                <div className="p-6 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 text-yellow-800">Note on Implementation</h3>
                  <p className="text-yellow-700">
                    These smart contract rules are currently implemented on the Binance Smart Chain Testnet for the current phase of FreeMillionaireChallenge. The contracts will be migrated to BSC Mainnet before the official launch on August 1, 2025.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <a href="https://testnet.bscscan.com" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full">View Contract on BSC Testnet Explorer</Button>
              </a>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-secondary/90 to-primary/90 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
        <p className="mb-6">Join our affiliate program today and become part of the FreeMillionaireChallenge ecosystem.</p>
        <Link href="/register">
          <Button variant="secondary" size="lg">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AffiliateProgram;