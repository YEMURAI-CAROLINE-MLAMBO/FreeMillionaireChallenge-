import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Heart,
  BarChart3,
  Lightbulb,
  GraduationCap,
  Globe,
  Users,
  FileText,
  ArrowRight,
  Scale,
  Briefcase
} from "lucide-react";

const SocialEntrepreneurshipPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 max-w-7xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">
            Social Entrepreneurship
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Building businesses that balance profit with purposeful impact on society and the environment.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-amber-500" />
                What is Social Entrepreneurship?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Social entrepreneurship is a business approach that combines commercial strategies with social impact goals. Unlike traditional businesses that measure success purely by profit, social enterprises seek to maximize both financial sustainability and positive societal change.
              </p>
              <p className="text-gray-600">
                These ventures operate across a spectrum—from nonprofit organizations with income-generating activities to for-profit companies with explicit social missions. What unites them is their commitment to addressing social, cultural, or environmental challenges through innovative business models.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-amber-500" />
                The Triple Bottom Line
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                At the heart of social entrepreneurship is the concept of the "Triple Bottom Line" or "People, Planet, Profit"—a framework that measures success beyond financial returns to include social and environmental impact.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <Users className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                  <h4 className="font-medium">People</h4>
                  <p className="text-xs text-gray-500">Social well-being and equity</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <Globe className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                  <h4 className="font-medium">Planet</h4>
                  <p className="text-xs text-gray-500">Environmental sustainability</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                  <h4 className="font-medium">Profit</h4>
                  <p className="text-xs text-gray-500">Financial sustainability</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Principles Section */}
        <Card>
          <CardHeader>
            <CardTitle>Key Principles of Social Entrepreneurship</CardTitle>
            <CardDescription>
              Core values that guide successful social ventures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Innovation</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Developing creative, often disruptive solutions to persistent social problems that traditional approaches have failed to solve effectively.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Sustainable Business Model</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Creating financially viable operations that can scale impact without relying solely on donations or grants.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Community Engagement</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Involving and empowering the communities being served as active participants rather than passive beneficiaries.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Measurable Impact</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Tracking and evaluating social outcomes alongside financial metrics to demonstrate effectiveness and guide improvements.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Systems Change</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Addressing root causes of problems rather than just symptoms, often aiming to transform broader systems and policies.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium">Hybrid Approaches</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Blending business methods with nonprofit principles to create innovative organizational structures and revenue models.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Studies Section */}
        <Card>
          <CardHeader>
            <CardTitle>Notable Case Studies</CardTitle>
            <CardDescription>
              Examining landmark social enterprises that have changed the world
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="grameen">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-1 rounded-full">
                      <Briefcase className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>Grameen Bank - Microfinance Revolution</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-600">
                    Founded by Nobel Peace Prize winner Muhammad Yunus in Bangladesh, Grameen Bank pioneered the microfinance model by providing small loans to entrepreneurs too poor to qualify for traditional bank loans, particularly women in rural areas.
                  </p>
                  <div className="pl-6 border-l-2 border-amber-200 space-y-2">
                    <h4 className="font-medium">Key Innovation:</h4>
                    <p className="text-sm text-gray-600">
                      The bank's group-lending model created social collateral, where borrowers formed small groups and became collectively responsible for each other's loans, resulting in repayment rates above 95%.
                    </p>
                    <h4 className="font-medium">Impact:</h4>
                    <p className="text-sm text-gray-600">
                      Grameen has served over 9 million borrowers (97% women), distributed billions in loans, and inspired a global microfinance movement that has reached hundreds of millions of people worldwide.
                    </p>
                    <h4 className="font-medium">Business Analysis:</h4>
                    <p className="text-sm text-gray-600">
                      Business case studies highlight how Grameen's model challenged conventional banking wisdom by demonstrating that the poor are "bankable" and that social capital can effectively replace financial collateral.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="aravind">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-1 rounded-full">
                      <Briefcase className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>Aravind Eye Care - Healthcare Innovation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-600">
                    Founded by Dr. G. Venkataswamy in India, Aravind revolutionized eye care delivery by developing a high-efficiency surgical system that provides services to paying customers while subsidizing care for those who cannot afford it.
                  </p>
                  <div className="pl-6 border-l-2 border-amber-200 space-y-2">
                    <h4 className="font-medium">Key Innovation:</h4>
                    <p className="text-sm text-gray-600">
                      Aravind standardized cataract surgery and implemented assembly-line procedures that increase surgeon productivity while maintaining quality. Their model enables them to perform surgeries at less than 1% of the cost in developed countries.
                    </p>
                    <h4 className="font-medium">Impact:</h4>
                    <p className="text-sm text-gray-600">
                      Aravind has become the largest eye care system in the world, performing over 500,000 surgeries annually, with approximately 50% provided free or at deeply subsidized rates to poor patients.
                    </p>
                    <h4 className="font-medium">Business Analysis:</h4>
                    <p className="text-sm text-gray-600">
                      Business analysts cite Aravind as a prime example of "cost innovation" and a sustainable cross-subsidization model that achieves both financial sustainability and inclusive healthcare delivery.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="toms">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-1 rounded-full">
                      <Briefcase className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>TOMS Shoes - One-for-One Model</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-600">
                    Founded by Blake Mycoskie, TOMS pioneered the "One for One" business model, where for every pair of shoes purchased, a pair is donated to a child in need.
                  </p>
                  <div className="pl-6 border-l-2 border-amber-200 space-y-2">
                    <h4 className="font-medium">Key Innovation:</h4>
                    <p className="text-sm text-gray-600">
                      TOMS integrated giving directly into its business model rather than treating it as a separate CSR initiative, creating a commercial brand identity built around social impact.
                    </p>
                    <h4 className="font-medium">Impact:</h4>
                    <p className="text-sm text-gray-600">
                      TOMS has given over 100 million pairs of shoes to children in need and expanded into providing eyewear, clean water, and safe birth services through its giving programs.
                    </p>
                    <h4 className="font-medium">Business Analysis:</h4>
                    <p className="text-sm text-gray-600">
                      Business studies note TOMS' evolution from a simple donation model to more sustainable community-based interventions, highlighting both the power and limitations of the one-for-one approach in creating lasting impact.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="digital">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 p-1 rounded-full">
                      <Briefcase className="h-4 w-4 text-amber-500" />
                    </div>
                    <span>Digital Divide Data - Impact Sourcing</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-600">
                    Founded in Cambodia, Digital Divide Data (DDD) pioneered the "impact sourcing" model by providing digital services to global clients while employing and training disadvantaged youth in developing countries.
                  </p>
                  <div className="pl-6 border-l-2 border-amber-200 space-y-2">
                    <h4 className="font-medium">Key Innovation:</h4>
                    <p className="text-sm text-gray-600">
                      DDD's "work-study" model enables employees to simultaneously earn income, gain professional experience, and pursue higher education, significantly increasing their lifetime earning potential.
                    </p>
                    <h4 className="font-medium">Impact:</h4>
                    <p className="text-sm text-gray-600">
                      DDD graduates increase their lifetime earnings by 4-5 times, with over 2,000 disadvantaged youth working their way out of poverty through the program.
                    </p>
                    <h4 className="font-medium">Business Analysis:</h4>
                    <p className="text-sm text-gray-600">
                      Researchers highlight DDD's ability to create a sustainable business model in the competitive BPO (Business Process Outsourcing) industry while simultaneously achieving significant social impact through human capital development.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Educational Resources Section */}
        <Card>
          <CardHeader>
            <CardTitle>Educational Resources</CardTitle>
            <CardDescription>
              Deepen your knowledge with these academic resources on social entrepreneurship
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCap className="h-5 w-5 text-amber-500" />
                    Key Academic Frameworks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium">Theory of Change</h4>
                    <p className="text-sm text-gray-600">
                      A comprehensive framework that maps how specific activities lead to desired social outcomes through a causal chain of intermediate changes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Shared Value Creation</h4>
                    <p className="text-sm text-gray-600">
                      A business concept that describes creating economic value in ways that also create value for society.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Social Return on Investment (SROI)</h4>
                    <p className="text-sm text-gray-600">
                      A method for measuring and accounting for the broader concept of value, incorporating social, environmental, and economic costs and benefits.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button variant="link" className="px-0 text-amber-600 flex items-center gap-1">
                      <span>Explore academic frameworks</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-amber-500" />
                    Recommended Reading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="border-b pb-2">
                    <h4 className="font-medium">How to Change the World</h4>
                    <p className="text-xs text-gray-500">by David Bornstein</p>
                    <p className="text-sm text-gray-600">
                      Explores how social entrepreneurs are solving social problems at a global scale.
                    </p>
                  </div>
                  <div className="border-b pb-2">
                    <h4 className="font-medium">Creating a World Without Poverty</h4>
                    <p className="text-xs text-gray-500">by Muhammad Yunus</p>
                    <p className="text-sm text-gray-600">
                      The Grameen Bank founder's vision for social business and economic development.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">The Power of Unreasonable People</h4>
                    <p className="text-xs text-gray-500">by John Elkington & Pamela Hartigan</p>
                    <p className="text-sm text-gray-600">
                      How social entrepreneurs create markets that change the world.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button variant="link" className="px-0 text-amber-600 flex items-center gap-1">
                      <span>View full reading list</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-700 rounded-lg p-8 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Join the FreeMillionaireChallenge</h2>
            <p className="text-lg opacity-90">
              Apply your social entrepreneurship knowledge by participating in our global challenge, designed to help young entrepreneurs create successful businesses with positive social impact.
            </p>
            <div className="pt-2">
              <Button className="bg-white text-amber-700 hover:bg-gray-100">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialEntrepreneurshipPage;