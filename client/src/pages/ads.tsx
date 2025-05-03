import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdCard from '@/components/ad-card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Filter, 
  SortDesc, 
  Search,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const Ads: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('approved');
  
  // Fetch ads
  const { data: allAds, isLoading } = useQuery({
    queryKey: ['/api/ads'],
  });
  
  // Filter ads based on search, category, and status
  const filteredAds = React.useMemo(() => {
    if (!allAds) return [];
    
    return allAds.filter(ad => {
      const matchesSearch = searchTerm === '' || 
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = category === 'all' || ad.category === category;
      const matchesStatus = status === 'all' || ad.status === status;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allAds, searchTerm, category, status]);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-dark">Current Advertisements</h1>
        <p className="text-dark-medium text-lg">
          Browse through ads submitted by our participants and community members.
        </p>
      </div>
      
      {/* Filters Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search ads..."
                className="pl-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="design">Design Services</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="business">Business Services</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Ads Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-primary mb-4" />
          <p>Loading advertisements...</p>
        </div>
      ) : filteredAds.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map(ad => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-dark-medium mb-4">No advertisements found matching your criteria.</p>
          <Link href="/submit-ad">
            <Button>Submit Your Ad</Button>
          </Link>
        </div>
      )}
      
      {/* Submit Ad CTA */}
      <div className="mt-12 bg-gradient-to-r from-secondary/90 to-primary/90 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Showcase Your Business?</h2>
        <p className="mb-6">Submit your ad today and reach our growing audience of participants and viewers.</p>
        <Link href="/submit-ad">
          <Button variant="secondary" size="lg">
            Submit Your Ad
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Ads;
