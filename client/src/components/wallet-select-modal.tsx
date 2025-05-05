import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/contexts/web3-context';
import { AlertCircle, ExternalLink, Wallet, Github, Smartphone, CreditCard, Bitcoin } from 'lucide-react';

interface WalletSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletSelectModal: React.FC<WalletSelectModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet, active, isConnecting } = useWeb3();
  const [error, setError] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      setError(null);
      await connectWallet();
      if (active) {
        onClose();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to connect wallet');
    }
  };

  const availableWallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: <Wallet className="h-8 w-8 text-orange-500" />,
      description: 'Connect using browser extension',
      isPopular: true,
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: <Bitcoin className="h-8 w-8 text-blue-500" />,
      description: 'Connect using browser extension',
      isPopular: true,
    },
    {
      id: 'other',
      name: 'Other Wallets',
      icon: <Github className="h-8 w-8 text-gray-500" />,
      description: 'Connect using browser extension',
      isPopular: false,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose a wallet to connect to the FreeMillionaireChallenge platform
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <div className="bg-red-50 text-red-900 p-3 rounded-md text-sm flex items-start mb-4">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            {availableWallets.filter(w => w.isPopular).map((wallet) => (
              <Card 
                key={wallet.id}
                className="cursor-pointer hover:border-primary/50 transition-colors"
                onClick={handleConnectWallet}
              >
                <CardContent className="p-4 flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    {wallet.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{wallet.name}</h3>
                    <p className="text-xs text-muted-foreground">{wallet.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Other Options</p>
            <div className="grid grid-cols-2 gap-2">
              {availableWallets.filter(w => !w.isPopular).map((wallet) => (
                <Card 
                  key={wallet.id}
                  className="cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={handleConnectWallet}
                >
                  <CardContent className="p-3 flex flex-col items-center justify-center">
                    {wallet.icon}
                    <span className="text-xs mt-1">{wallet.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <CardFooter className="flex flex-col items-center pt-2 border-t">
          <p className="text-xs text-center text-muted-foreground mb-2">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => window.open('https://metamask.io/download/', '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Don't have a wallet? Get one here
          </Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelectModal;