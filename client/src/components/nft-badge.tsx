import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface NFTBadge {
  id: number;
  userId: number;
  tokenId: string;
  contractAddress: string;
  tokenUri: string;
  badgeType: string;
  network: string;
  imageUrl: string | null;
  mintDate: string;
  transactionHash: string | null;
}

const NFTBadgeComponent: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch user's NFT badge
  const { data: badge, isLoading, isError } = useQuery<NFTBadge>({
    queryKey: ['/api/nft/badge'],
    queryFn: async () => {
      try {
        const res = await apiRequest('GET', '/api/nft/badge');
        return await res.json();
      } catch (error) {
        // If the user doesn't have a badge yet, this will fail with 404
        // We'll handle this quietly
        return null;
      }
    }
  });

  // Mutation to create a new NFT badge
  const createBadgeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/nft/badge');
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'NFT Badge Created',
        description: `Your ${data.badgeType} badge has been created successfully!`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/nft/badge'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Creating Badge',
        description: error.message || 'There was an error creating your NFT badge.',
        variant: 'destructive',
      });
    }
  });

  // Mutation to mint the NFT badge (simulate blockchain transaction)
  const mintBadgeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/nft/badge/mint');
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'NFT Badge Minted',
        description: 'Your badge has been minted on BSC Testnet!',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/nft/badge'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error Minting Badge',
        description: error.message || 'There was an error minting your NFT badge.',
        variant: 'destructive',
      });
    }
  });

  // Format the badge type for display
  const formatBadgeType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Handle creating a new badge
  const handleCreateBadge = () => {
    createBadgeMutation.mutate();
  };

  // Handle minting the badge on blockchain
  const handleMintBadge = () => {
    mintBadgeMutation.mutate();
  };

  // Generate BSC explorer URL for the transaction
  const getBscExplorerUrl = (transactionHash: string) => {
    // Using testnet explorer by default
    return `https://testnet.bscscan.com/tx/${transactionHash}`;
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!badge && !isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-gradient-gold">NFT Badge</CardTitle>
          <CardDescription>
            Mint your FreeMillionaireChallenge NFT badge on Binance Smart Chain
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4 py-6">
          <Award className="h-24 w-24 text-primary/20" />
          <p className="text-center text-muted-foreground">
            You don't have an NFT badge yet. Create one to show your participation in the FreeMillionaireChallenge!
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full btn-gold" 
            onClick={handleCreateBadge}
            disabled={createBadgeMutation.isPending}
          >
            {createBadgeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Badge...
              </>
            ) : (
              <>Create NFT Badge</>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-gradient-gold">
          {badge?.badgeType ? `${formatBadgeType(badge.badgeType)} Badge` : 'NFT Badge'}
        </CardTitle>
        <CardDescription>
          Your unique FreeMillionaireChallenge NFT on BSC
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {badge?.imageUrl ? (
          <img 
            src={badge.imageUrl} 
            alt="NFT Badge" 
            className="w-40 h-40 object-contain rounded-lg" 
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center bg-black/10 rounded-lg">
            <Award className="h-20 w-20 text-primary/40" />
          </div>
        )}
        
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{badge?.badgeType ? formatBadgeType(badge.badgeType) : '-'}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Token ID:</span>
            <span className="font-mono text-xs truncate max-w-[150px]" title={badge?.tokenId}>
              {badge?.tokenId ? `${badge.tokenId.slice(0, 6)}...${badge.tokenId.slice(-4)}` : '-'}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network:</span>
            <span>{badge?.network || 'BSC Testnet'}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className={badge?.transactionHash ? 'text-green-600 flex items-center' : 'text-amber-600'}>
              {badge?.transactionHash ? (
                <>
                  Minted <CheckCircle className="ml-1 h-3.5 w-3.5" />
                </>
              ) : 'Not Minted'}
            </span>
          </div>
          
          {isExpanded && badge?.transactionHash && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tx Hash:</span>
                <a 
                  href={getBscExplorerUrl(badge.transactionHash)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-blue-600 hover:underline flex items-center truncate max-w-[180px]"
                  title={badge.transactionHash}
                >
                  {`${badge.transactionHash.slice(0, 6)}...${badge.transactionHash.slice(-4)}`}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Contract:</span>
                <span className="font-mono text-xs truncate max-w-[150px]" title={badge.contractAddress}>
                  {`${badge.contractAddress.slice(0, 6)}...${badge.contractAddress.slice(-4)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(badge.mintDate).toLocaleDateString()}</span>
              </div>
            </>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2 text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      </CardContent>
      
      {badge && !badge.transactionHash && (
        <CardFooter>
          <Button 
            className="w-full btn-gold" 
            onClick={handleMintBadge}
            disabled={mintBadgeMutation.isPending}
          >
            {mintBadgeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting on BSC...
              </>
            ) : (
              <>Mint on Blockchain</>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NFTBadgeComponent;