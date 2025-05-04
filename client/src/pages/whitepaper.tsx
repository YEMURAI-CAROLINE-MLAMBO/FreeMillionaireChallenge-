import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, FileCode, FileSpreadsheet, FileImage } from "lucide-react";

const WhitepaperPage = () => {
  // Function to simulate PDF download
  const handleDownload = (fileType: string) => {
    // In a real implementation, this would download an actual PDF file
    alert(`Downloading ${fileType} - In production, this would download the actual whitepaper file.`);
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-5xl">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            FMC Whitepaper
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Comprehensive documentation for investors and strategic partners
          </p>
        </div>

        <Card className="border-2 border-amber-200">
          <CardHeader className="bg-amber-50">
            <CardTitle>Free Millionaire Challenge: A Blockchain-Powered Social Entrepreneurship Platform</CardTitle>
            <CardDescription>
              Official whitepaper v1.0 - Released July 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-2/3 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Abstract</h3>
                  <p className="text-gray-600">
                    This whitepaper introduces the Free Millionaire Challenge (FMC), a novel blockchain-based platform that empowers young entrepreneurs through a transparent, 12-month challenge documenting their journey from concept to sustainable business. Built on the Binance Smart Chain, FMC creates a unique ecosystem where participants showcase their progress, viewers engage through voting and support, and the entire process is recorded immutably on the blockchain.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Inside the Document</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-500" />
                      <span>Comprehensive business model analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileCode className="h-5 w-5 text-amber-500" />
                      <span>Technical infrastructure and blockchain integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-amber-500" />
                      <span>Token economics and growth projections</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileImage className="h-5 w-5 text-amber-500" />
                      <span>Platform mockups and user flow diagrams</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Target Audience</h3>
                  <p className="text-gray-600">
                    This document is designed for potential investors, strategic partners, blockchain technology experts, and entrepreneurship ecosystem stakeholders who are interested in the intersection of blockchain, social entrepreneurship, and content creation.
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/3 space-y-4">
                <Card className="bg-gray-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Available Formats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownload("FMC_Whitepaper.pdf")}
                    >
                      <span>PDF Document</span>
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownload("FMC_Whitepaper.docx")}
                    >
                      <span>Word Document</span>
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-between"
                      onClick={() => handleDownload("FMC_Whitepaper_Slides.pptx")}
                    >
                      <span>Presentation Slides</span>
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Request Custom Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Need specific information not covered in the whitepaper? Contact our team for customized documentation.
                    </p>
                    <a href="mailto:ymlambo21@gmail.com" style={{ display: 'block', width: '100%' }} aria-label="Contact the investment team">
                      <Button variant="default" className="w-full">
                        Contact Investment Team
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Executive Summary Preview</h3>
              <div className="p-6 bg-gray-50 rounded-lg border text-gray-600 space-y-4">
                <p>
                  The Free Millionaire Challenge (FMC) represents an innovative blockchain-based social entrepreneurship platform designed to nurture, document, and showcase the journeys of emerging entrepreneurs. Built on the Binance Smart Chain, the platform provides a transparent, global stage for participants to build sustainable businesses while connecting with supporters, investors, and mentors.
                </p>
                <p>
                  With a limited cohort of 9 carefully selected participants for Season 1, the FMC creates a competitive yet collaborative environment that emphasizes sustainable business growth, positive social impact, and global reach.
                </p>
                <p className="italic">
                  Download the full whitepaper to explore our technical infrastructure, business model, token economics, and growth strategy in detail...
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700"
                onClick={() => handleDownload("FMC_Whitepaper_Complete.pdf")}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Complete Whitepaper
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              Supplementary materials to understand the Free Millionaire Challenge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed overview of blockchain implementation, smart contracts, and platform architecture.
                  </p>
                  <Button variant="outline" size="sm" className="w-full"
                    onClick={() => handleDownload("FMC_Technical_Specifications.pdf")}>
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Financial Projections</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4">
                    Five-year revenue forecasts, growth models, and investment opportunity analysis.
                  </p>
                  <Button variant="outline" size="sm" className="w-full"
                    onClick={() => handleDownload("FMC_Financial_Projections.pdf")}>
                    Download
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Legal Framework</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4">
                    Regulatory compliance information, governance structure, and terms for participants.
                  </p>
                  <Button variant="outline" size="sm" className="w-full"
                    onClick={() => handleDownload("FMC_Legal_Framework.pdf")}>
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WhitepaperPage;