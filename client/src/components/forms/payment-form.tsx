import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { Bitcoin, Brackets, CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  adId: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ adId }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('bitcoin');
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  const [_, navigate] = useLocation();

  const processPaymentMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', `/api/ads/${adId}/payment`, { 
        paymentMethod 
      });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Payment Processed',
        description: 'Your payment has been successfully processed.',
      });
      setIsComplete(true);
    },
    onError: (error) => {
      toast({
        title: 'Payment Failed',
        description: error instanceof Error ? error.message : 'Payment processing failed',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processPaymentMutation.mutate();
  };

  if (isComplete) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Complete</h2>
        <p className="text-muted-foreground mb-6">
          Your ad has been submitted and payment has been processed successfully.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => navigate('/')}>
            Return to Home
          </Button>
          <Button variant="outline" onClick={() => navigate('/ads')}>
            View All Ads
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition ${paymentMethod === 'bitcoin' ? 'border-primary bg-primary/5' : 'border-border'}`}>
            <RadioGroupItem value="bitcoin" id="bitcoin" className="sr-only" />
            <Label htmlFor="bitcoin" className="flex items-center cursor-pointer">
              <Bitcoin className="h-5 w-5 text-warning mr-2" />
              <span>Bitcoin</span>
            </Label>
          </div>
          
          <div className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition ${paymentMethod === 'ethereum' ? 'border-primary bg-primary/5' : 'border-border'}`}>
            <RadioGroupItem value="ethereum" id="ethereum" className="sr-only" />
            <Label htmlFor="ethereum" className="flex items-center cursor-pointer">
              <Brackets className="h-5 w-5 text-primary mr-2" />
              <span>Brackets</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="mt-8 p-6 bg-light-bg rounded-lg">
        <h4 className="font-semibold mb-4 text-dark">Payment Summary</h4>
        <div className="flex justify-between mb-2">
          <span className="text-dark-medium">Ad Submission Fee</span>
          <span className="text-dark font-medium">
            {paymentMethod === 'bitcoin' ? '0.001 BTC' : '0.01 ETH'}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-dark-medium">Processing Fee</span>
          <span className="text-dark font-medium">
            {paymentMethod === 'bitcoin' ? '0.0001 BTC' : '0.001 ETH'}
          </span>
        </div>
        <div className="border-t border-border my-3"></div>
        <div className="flex justify-between font-semibold">
          <span className="text-dark">Total</span>
          <span className="text-dark">
            {paymentMethod === 'bitcoin' ? '0.0011 BTC' : '0.011 ETH'}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          type="submit" 
          className="w-full"
          disabled={processPaymentMutation.isPending}
        >
          {processPaymentMutation.isPending ? 'Processing...' : 'Complete Payment'}
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        This is a simulated payment for demonstration purposes.
        No actual cryptocurrency transaction will occur.
      </p>
    </form>
  );
};

export default PaymentForm;
