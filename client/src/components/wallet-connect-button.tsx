import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useWeb3 } from '@/contexts/web3-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, LogOut, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import { CHAIN_NAMES } from '@/contexts/web3-context';

interface WalletConnectButtonProps {
  buttonText?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'link' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  buttonText = 'Connect Wallet',
  variant = 'default',
  size = 'default',
  className = '',
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { account, active, connectWallet, disconnectWallet, chainId, isNetworkSupported, networkName } = useWeb3();
  
  // Truncate address for display
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle connect wallet click
  const handleConnectClick = async () => {
    if (!active) {
      await connectWallet();
    } else {
      setDialogOpen(true);
    }
  };

  // Handle disconnect wallet
  const handleDisconnect = () => {
    disconnectWallet();
    setDialogOpen(false);
  };

  // Get block explorer URL based on chainId
  const getBlockExplorerUrl = () => {
    if (!chainId || !account) return '';
    
    switch (chainId) {
      case 1: return `https://etherscan.io/address/${account}`;
      case 5: return `https://goerli.etherscan.io/address/${account}`;
      case 56: return `https://bscscan.com/address/${account}`;
      case 97: return `https://testnet.bscscan.com/address/${account}`;
      case 137: return `https://polygonscan.com/address/${account}`;
      case 80001: return `https://mumbai.polygonscan.com/address/${account}`;
      default: return '';
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleConnectClick}
      >
        {active ? (
          <>
            <span className="mr-2">{truncateAddress(account || '')}</span>
            <Wallet className="h-4 w-4" />
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {buttonText}
          </>
        )}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Wallet Information</DialogTitle>
            <DialogDescription>
              View and manage your connected wallet
            </DialogDescription>
          </DialogHeader>
          
          {active && account ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-mono break-all">{account}</p>
                </CardContent>
                <CardFooter className="border-t pt-2 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(getBlockExplorerUrl(), '_blank')}
                    disabled={!getBlockExplorerUrl()}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View on Explorer
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(account);
                    }}
                  >
                    Copy
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Network</span>
                <div className="flex items-center gap-1.5">
                  {isNetworkSupported ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  )}
                  <span className={`text-sm ${isNetworkSupported ? 'text-green-600' : 'text-amber-600'}`}>
                    {networkName}
                  </span>
                </div>
              </div>
              
              <Button 
                variant="destructive" 
                className="w-full"
                onClick={handleDisconnect}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <div className="py-6 flex flex-col items-center">
              <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-center text-muted-foreground">
                No wallet connected. Click the connect button to link your wallet.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnectButton;