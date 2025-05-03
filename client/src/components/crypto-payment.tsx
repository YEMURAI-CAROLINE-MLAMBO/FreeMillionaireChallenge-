import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useWeb3 } from '@/contexts/web3-context';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Wallet, ArrowRight, CheckCircle, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// The recipient address for all payments
// This is the wallet address provided for the FreeMillionaireChallenge
const RECIPIENT_ADDRESS = '0xDebF00937a402ebffaF25ABeF1BdE9aA8fe2c330';

interface CryptoPaymentProps {
  amount: number;
  adId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ amount, adId, onSuccess, onCancel }) => {
  const { account, connectWallet, switchToBSC, active, library, isNetworkSupported, networkName, chainId } = useWeb3();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bnbAmount, setBnbAmount] = useState("0");
  const [isBSC, setIsBSC] = useState(false);

  // Check if we're on BSC network (mainnet or testnet)
  useEffect(() => {
    if (chainId) {
      const onBSC = chainId === 56 || chainId === 97;
      setIsBSC(onBSC);
    }
  }, [chainId]);

  // Calculate BNB amount for payment (with a simple conversion for demo)
  // In a production app, you would use an oracle or price feed
  useEffect(() => {
    // Use a simple conversion ratio (1 BNB = $300 USD for example)
    // In a real app, this would come from a price oracle
    const bnbPrice = 300;
    const calculatedAmount = (amount / bnbPrice).toFixed(6);
    setBnbAmount(calculatedAmount);
  }, [amount]);

  // Handler to switch to BSC network
  const handleSwitchToBSC = async () => {
    const success = await switchToBSC();
    if (success) {
      toast({
        title: "Network Switched",
        description: "Successfully connected to Binance Smart Chain",
      });
    } else {
      toast({
        title: "Network Switch Failed",
        description: "Unable to switch to Binance Smart Chain. Please try manually in MetaMask.",
        variant: "destructive",
      });
    }
  };

  // Send transaction to the recipient address
  const handlePayment = async () => {
    if (!active || !account || !library) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your MetaMask wallet to proceed with payment.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!isBSC) {
      toast({
        title: 'BSC Network Required',
        description: 'Please switch to Binance Smart Chain to make your payment.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get the signer from the library
      const signer = library.getSigner();
      
      // Convert amount to wei (BNB has 18 decimals)
      const amountInWei = ethers.utils.parseEther(bnbAmount);
      
      // Prepare the transaction
      const tx = {
        to: RECIPIENT_ADDRESS,
        value: amountInWei,
        // Optional: include a memo/data field for tracking
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(`Ad payment: ${adId}`)),
      };

      // Send the transaction
      const transaction = await signer.sendTransaction(tx);
      
      // Wait for transaction to be mined (at least 1 confirmation)
      const receipt = await transaction.wait(1);
      
      if (receipt && receipt.status === 1) {
        // Transaction successful, update the server
        try {
          const response = await apiRequest('POST', `/api/ads/${adId}/payment`, {
            status: 'completed',
            transactionHash: transaction.hash,
            paymentMethod: 'bnb',
            amount,
            network: networkName,
          });

          if (response.ok) {
            setIsComplete(true);
            toast({
              title: 'Payment Successful',
              description: 'Your BNB payment was successfully processed!',
            });
            
            // Wait 2 seconds before calling onSuccess to show the success state
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else {
            throw new Error('Failed to update payment status on server');
          }
        } catch (error) {
          // The blockchain transaction was successful but server update failed
          toast({
            title: 'Payment Recorded on Blockchain',
            description: 'Your payment was processed, but we had trouble updating our records. Please contact support with your transaction hash.',
          });
          console.error('Server update error:', error);
          setIsComplete(true);
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } else {
        throw new Error('Transaction was not confirmed');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Transaction Failed',
        description: error?.message || 'There was an error processing your crypto transaction.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto card-premium border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-xl md:text-2xl text-gradient-gold">BNB Payment</CardTitle>
        <CardDescription>Complete your ad payment using Binance Smart Chain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {active && !isNetworkSupported && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Network Not Supported</AlertTitle>
            <AlertDescription>
              You're currently on {networkName}. Please switch to a supported network to continue.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-black/5 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Amount:</span>
            <span className="font-bold text-primary">${amount.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/70">Equivalent BNB:</span>
            <span className="font-mono text-primary">{bnbAmount} BNB</span>
          </div>
          {active && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Network:</span>
                <span className={isBSC ? "text-green-600" : "text-red-600"}>
                  {networkName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Recipient:</span>
                <span className="text-xs font-mono text-foreground/70 truncate max-w-[200px]" title={RECIPIENT_ADDRESS}>
                  {RECIPIENT_ADDRESS.slice(0, 6)}...{RECIPIENT_ADDRESS.slice(-4)}
                </span>
              </div>
            </>
          )}
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
        ) : !isBSC ? (
          <Button 
            className="w-full btn-gold py-6" 
            onClick={handleSwitchToBSC}
            disabled={isProcessing}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Switch to Binance Smart Chain
          </Button>
        ) : (
          <Button 
            className="w-full btn-gold py-6" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Transaction...
              </>
            ) : (
              <>
                Pay {bnbAmount} BNB
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