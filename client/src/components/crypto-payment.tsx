import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/contexts/web3-context';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Wallet, ArrowRight, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CryptoPaymentProps {
  amount: number;
  adId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ amount, adId, onSuccess, onCancel }) => {
  const { account, connectWallet, active, library, isNetworkSupported, networkName } = useWeb3();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Convert the amount to ETH for display (this is just a simulation)
  // In a real app, you would use an oracle or API to get the current exchange rate
  const ethAmount = (amount / 2000).toFixed(6); // Simple conversion for demo purposes

  const handlePayment = async () => {
    if (!active || !account || !library) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your MetaMask wallet to proceed with payment.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!isNetworkSupported) {
      toast({
        title: 'Unsupported Network',
        description: `You're currently on ${networkName}. Please switch to a supported network.`,
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // In a real application, we would:
      // 1. Get the recipient address from the server
      // 2. Perform the actual transaction using the wallet
      
      // For simulation purposes, we'll just wait 2 seconds
      // and then complete the payment without actually transferring funds
      setTimeout(async () => {
        try {
          // Update ad payment status on the server
          const response = await apiRequest('POST', `/api/ads/${adId}/payment`, {
            status: 'completed',
            transactionHash: `0x${Math.random().toString(16).substring(2, 42)}`, // Simulated transaction hash
            paymentMethod: 'ethereum',
            amount,
            network: networkName, // Add network information
          });

          if (response.ok) {
            setIsComplete(true);
            toast({
              title: 'Payment Successful',
              description: 'Your crypto payment was successful!',
            });
            // Wait 2 seconds before calling onSuccess to show the success state
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else {
            throw new Error('Failed to process payment on server');
          }
        } catch (error) {
          toast({
            title: 'Payment Error',
            description: 'There was an error processing your payment on the server.',
            variant: 'destructive',
          });
          setIsProcessing(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Transaction Failed',
        description: 'There was an error processing your crypto transaction.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-premium border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-xl md:text-2xl text-gradient-gold">Crypto Payment</CardTitle>
        <CardDescription>Complete your ad payment using MetaMask</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-black/5 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Amount:</span>
            <span className="font-bold text-primary">${amount.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Equivalent ETH:</span>
            <span className="font-mono text-primary">{ethAmount} ETH</span>
          </div>
        </div>

        {!active ? (
          <Button 
            className="w-full btn-gold py-6" 
            onClick={connectWallet}
            disabled={isProcessing}
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect MetaMask Wallet
          </Button>
        ) : isComplete ? (
          <div className="p-4 bg-success/10 text-success rounded-lg flex items-center justify-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Payment Complete!</span>
          </div>
        ) : (
          <Button 
            className="w-full btn-gold py-6" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Pay with MetaMask
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isProcessing || isComplete}
          className="text-sm"
        >
          Cancel Payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CryptoPayment;