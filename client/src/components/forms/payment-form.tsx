import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import { CheckCircle } from 'lucide-react';
import CryptoPayment from '@/components/crypto-payment';

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
    <div className="space-y-6">
      <CryptoPayment 
        amount={25} 
        adId={adId} 
        onSuccess={() => setIsComplete(true)}
        onCancel={() => navigate('/ads')}
      />
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        This is a simulated payment using MetaMask for demonstration purposes.
        No actual cryptocurrency transaction will occur.
      </p>
    </div>
  );
};

export default PaymentForm;
