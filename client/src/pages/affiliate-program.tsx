import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Check, Users, DollarSign, FileText } from 'lucide-react';

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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
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
              <Button className="btn-gold">Apply to Become an Affiliate</Button>
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
              <Link href="https://testnet.bscscan.com" target="_blank" className="w-full">
                <Button variant="outline" className="w-full">View Contract on BSC Testnet Explorer</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-secondary/90 to-primary/90 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Earning?</h2>
        <p className="mb-6">Join our affiliate program today and become part of the FreeMillionaireChallenge ecosystem.</p>
        <Button variant="secondary" size="lg">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default AffiliateProgram;