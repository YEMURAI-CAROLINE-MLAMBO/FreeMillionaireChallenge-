import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { SUPPORTED_CHAINS, CHAIN_NAMES, CHAIN_CURRENCY, useWeb3 } from '@/contexts/web3-context';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import WalletSelectModal from './wallet-select-modal';
import { AlertCircle, ArrowRight, CheckCircle, ExternalLink, Loader2, RefreshCw, Wallet } from 'lucide-react';
import { ethers } from 'ethers';

// Platform wallet address for receiving payments
const PLATFORM_WALLET = '0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330';

// Percent of payment that goes to the founder
const FOUNDER_PERCENT = 30;

interface CryptoPaymentProps {
  amount: number;
  adId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

enum PaymentStatus {
  DISCONNECTED = 'disconnected',
  NETWORK_SELECT = 'network_select',
  READY = 'ready',
  PROCESSING = 'processing',
  CONFIRMED = 'confirmed',
  ERROR = 'error'
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ 
  amount, 
  adId, 
  onSuccess, 
  onCancel 
}) => {
  const { 
    active, 
    account, 
    chainId, 
    connectWallet, 
    switchNetwork, 
    isConnecting, 
    library, 
    chainCurrency,
    isNetworkSupported,
    networkName 
  } = useWeb3();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(PaymentStatus.DISCONNECTED);
  const [selectedChainId, setSelectedChainId] = useState<number | undefined>(chainId);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [loadingText, setLoadingText] = useState('Processing payment...');
  const [confirmations, setConfirmations] = useState(0);
  
  // Update payment status based on wallet connection
  useEffect(() => {
    if (!active) {
      setPaymentStatus(PaymentStatus.DISCONNECTED);
    } else if (!isNetworkSupported || !selectedChainId) {
      setPaymentStatus(PaymentStatus.NETWORK_SELECT);
    } else {
      setPaymentStatus(PaymentStatus.READY);
    }
  }, [active, chainId, isNetworkSupported, selectedChainId]);

  // Handle chain selection
  const handleChainSelect = async (value: string) => {
    const newChainId = parseInt(value);
    setSelectedChainId(newChainId);
    
    if (active && chainId !== newChainId) {
      try {
        setError(null);
        const success = await switchNetwork(newChainId);
        if (!success) {
          setError(`Failed to switch to ${CHAIN_NAMES[newChainId]}. Please try manually.`);
        }
      } catch (err) {
        console.error('Error switching network:', err);
        setError('Network switch failed. Please try manually.');
      }
    }
  };

  // Process payment
  const handlePayment = async () => {
    if (!active || !account || !library || !chainId) {
      setError('Please connect your wallet first');
      return;
    }

    if (chainId !== selectedChainId) {
      setError(`Please switch to ${CHAIN_NAMES[selectedChainId || 56]} network`);
      return;
    }

    try {
      setPaymentStatus(PaymentStatus.PROCESSING);
      setError(null);
      setLoadingText('Preparing transaction...');

      // Get the current gas price
      const gasPrice = await library.getGasPrice();
      
      // Calculate the transaction fee (estimate)
      const gasLimit = 21000; // Standard ETH transfer gas limit
      const gasFee = gasPrice.mul(gasLimit);
      
      // Check if the user has enough funds
      const balance = await library.getBalance(account);
      const amountInWei = ethers.utils.parseEther(amount.toString());
      
      if (balance.lt(amountInWei.add(gasFee))) {
        setPaymentStatus(PaymentStatus.ERROR);
        setError(`Insufficient funds. You need at least ${ethers.utils.formatEther(amountInWei.add(gasFee))} ${chainCurrency}`);
        return;
      }
      
      setLoadingText('Waiting for wallet confirmation...');
      
      // Send transaction
      const tx = await library.getSigner().sendTransaction({
        to: PLATFORM_WALLET,
        value: amountInWei,
        gasLimit
      });
      
      setTxHash(tx.hash);
      setLoadingText('Transaction submitted, waiting for confirmation...');
      
      // Wait for confirmation
      const receipt = await tx.wait(1);
      setConfirmations(1);
      
      // Notify backend of the payment
      try {
        const response = await fetch('/api/process-ad-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adId,
            txHash: tx.hash,
            amount,
            currency: chainCurrency,
            chainId,
            walletAddress: account,
            founderAmount: amount * (FOUNDER_PERCENT / 100)
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to record payment on the server');
        }
        
      } catch (serverError) {
        console.error('Server error when recording payment:', serverError);
        // We continue because the blockchain transaction was successful
      }
      
      setPaymentStatus(PaymentStatus.CONFIRMED);
      
      // Wait for more confirmations in the background
      const listen = () => {
        library.once('block', async () => {
          try {
            const currentReceipt = await library.getTransactionReceipt(tx.hash);
            if (currentReceipt) {
              setConfirmations(Math.min(currentReceipt.confirmations, 6));
              if (currentReceipt.confirmations < 6) {
                listen();
              }
            }
          } catch (err) {
            console.error('Error checking confirmations:', err);
          }
        });
      };
      
      listen();
      
    } catch (err: any) {
      console.error('Payment error:', err);
      setPaymentStatus(PaymentStatus.ERROR);
      
      // Parse user friendly error message
      if (err.code === 4001) {
        setError('Transaction rejected by user');
      } else {
        setError(err.message || 'Payment failed. Please try again.');
      }
    }
  };

  // Handle success completion
  const handleComplete = () => {
    onSuccess();
  };

  // Display transaction explorer link
  const getExplorerLink = (): string => {
    if (!txHash || !chainId) return '#';
    
    switch (chainId) {
      case 1: return `https://etherscan.io/tx/${txHash}`;
      case 5: return `https://goerli.etherscan.io/tx/${txHash}`;
      case 56: return `https://bscscan.com/tx/${txHash}`;
      case 97: return `https://testnet.bscscan.com/tx/${txHash}`;
      case 137: return `https://polygonscan.com/tx/${txHash}`;
      case 80001: return `https://mumbai.polygonscan.com/tx/${txHash}`;
      default: return '#';
    }
  };

  // Render payment step based on status
  const renderPaymentStep = () => {
    switch (paymentStatus) {
      case PaymentStatus.DISCONNECTED:
        return (
          <div className="text-center py-6">
            <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-4">
              Connect your wallet to make a payment of {amount} {chainCurrency}
            </p>
            <Button 
              onClick={() => setWalletModalOpen(true)}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : 'Connect Wallet'}
            </Button>
          </div>
        );
        
      case PaymentStatus.NETWORK_SELECT:
        return (
          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="network">Select Payment Network</Label>
              <Select 
                value={selectedChainId?.toString()} 
                onValueChange={handleChainSelect}
              >
                <SelectTrigger id="network" className="mt-1.5">
                  <SelectValue placeholder="Select blockchain network" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id.toString()}>
                      {chain.name} ({CHAIN_CURRENCY[chain.id]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1.5">
                Select the blockchain network you want to use for payment
              </p>
            </div>
            
            {selectedChainId && chainId !== selectedChainId && (
              <Alert className="mb-4 bg-amber-50 border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Network Mismatch</AlertTitle>
                <AlertDescription className="text-amber-700">
                  Your wallet is currently connected to {networkName}. 
                  Please switch to {CHAIN_NAMES[selectedChainId]}.
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              onClick={() => switchNetwork(selectedChainId || 56)}
              disabled={!selectedChainId || selectedChainId === chainId}
              className="w-full"
            >
              {selectedChainId === chainId ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Connected to {networkName}
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Switch to {selectedChainId ? CHAIN_NAMES[selectedChainId] : 'Selected Network'}
                </>
              )}
            </Button>
          </div>
        );
        
      case PaymentStatus.READY:
        return (
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">Connected to</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">
                    {networkName}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ''}
                  </span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => setWalletModalOpen(true)}>
                Change
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{amount} {chainCurrency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="text-xs">Estimated on submission</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-bold">{amount} {chainCurrency}</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground mb-4">
              <p>
                • {FOUNDER_PERCENT}% ({(amount * FOUNDER_PERCENT / 100).toFixed(4)} {chainCurrency})
                 will go to the founder of FreeMillionaireChallenge
              </p>
              <p>• The remaining amount will be used to support the platform operations</p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePayment} className="flex-1">
                Pay Now
              </Button>
            </div>
          </div>
        );
        
      case PaymentStatus.PROCESSING:
        return (
          <div className="py-6 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
            <p className="text-muted-foreground mb-4">{loadingText}</p>
            
            {txHash && (
              <div className="mt-4">
                <p className="text-xs mb-2">Transaction Hash:</p>
                <div className="flex items-center justify-center">
                  <code className="bg-muted p-2 rounded text-xs break-all">
                    {txHash}
                  </code>
                </div>
              </div>
            )}
          </div>
        );
        
      case PaymentStatus.CONFIRMED:
        return (
          <div className="py-6 text-center">
            <div className="bg-green-100 text-green-800 rounded-full p-3 inline-block mb-4">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Your payment of {amount} {chainCurrency} has been processed successfully.
            </p>
            
            <div className="mb-4">
              <p className="text-sm mb-1">Transaction Confirmations: {confirmations}/6</p>
              <Progress value={(confirmations / 6) * 100} className="h-2" />
            </div>
            
            {txHash && (
              <Button 
                variant="outline" 
                size="sm"
                className="mb-6"
                onClick={() => window.open(getExplorerLink(), '_blank')}
              >
                <ExternalLink className="mr-2 h-3 w-3" />
                View on Blockchain Explorer
              </Button>
            )}
            
            <Button onClick={handleComplete} className="w-full">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
        
      case PaymentStatus.ERROR:
        return (
          <div className="py-6">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Failed</AlertTitle>
              <AlertDescription>
                {error || 'There was an error processing your payment. Please try again.'}
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={() => setPaymentStatus(PaymentStatus.READY)} 
                className="flex-1"
              >
                Try Again
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crypto Payment</CardTitle>
        <CardDescription>
          Pay for your advertisement using cryptocurrency
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {renderPaymentStep()}
      </CardContent>
      
      {error && paymentStatus !== PaymentStatus.ERROR && (
        <CardFooter>
          <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardFooter>
      )}
      
      <WalletSelectModal 
        isOpen={walletModalOpen} 
        onClose={() => setWalletModalOpen(false)} 
      />
    </Card>
  );
};

export default CryptoPayment;