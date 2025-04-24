import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { insertAdSchema } from '@shared/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/auth-context';
import { useLocation, useRoute } from 'wouter';
import PaymentForm from './payment-form';

// Extend the schema with validation
const adSubmissionSchema = insertAdSchema.extend({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }).max(100, {
    message: "Title must not exceed 100 characters",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters",
  }).max(500, {
    message: "Description must not exceed 500 characters",
  }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  imageUrl: z.string().optional(),
});

type AdSubmissionFormValues = z.infer<typeof adSubmissionSchema>;

enum FormStep {
  DETAILS = 0,
  PREVIEW = 1,
  PAYMENT = 2,
}

const AdSubmissionForm: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.DETAILS);
  const [adId, setAdId] = useState<number | null>(null);

  const form = useForm<AdSubmissionFormValues>({
    resolver: zodResolver(adSubmissionSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      imageUrl: '',
    },
  });

  const createAdMutation = useMutation({
    mutationFn: async (data: AdSubmissionFormValues) => {
      const response = await apiRequest('POST', '/api/ads', data);
      return await response.json();
    },
    onSuccess: (data) => {
      setAdId(data.id);
      toast({
        title: 'Ad Created Successfully',
        description: 'Your ad has been submitted for review. Please proceed to payment.',
      });
      setCurrentStep(FormStep.PAYMENT);
    },
    onError: (error) => {
      toast({
        title: 'Failed to Submit Ad',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: AdSubmissionFormValues) => {
    if (currentStep === FormStep.DETAILS) {
      setCurrentStep(FormStep.PREVIEW);
    } else if (currentStep === FormStep.PREVIEW) {
      createAdMutation.mutate(data);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>You must be logged in to submit an ad.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/register')}>Register or Login</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Your Advertisement</CardTitle>
        <CardDescription>
          {currentStep === FormStep.DETAILS && "Provide details about your advertisement"}
          {currentStep === FormStep.PREVIEW && "Review your advertisement details"}
          {currentStep === FormStep.PAYMENT && "Complete the payment process"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentStep === FormStep.PAYMENT ? (
          <PaymentForm adId={adId!} />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === FormStep.DETAILS && (
                <>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Advertisement Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a catchy title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your advertisement" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="design">Design Services</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            <SelectItem value="business">Business Services</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter an image URL for your ad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              
              {currentStep === FormStep.PREVIEW && (
                <div className="space-y-4 py-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{form.getValues('title')}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{form.getValues('description')}</p>
                    <div className="flex justify-between">
                      <span className="text-sm">
                        Category: <span className="font-medium capitalize">{form.getValues('category')}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>
                      By clicking Submit, your ad will be sent for review. 
                      You will need to complete the payment process after submission.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between">
                {currentStep !== FormStep.DETAILS && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(prevStep => prevStep - 1)}
                  >
                    Back
                  </Button>
                )}
                
                <div className={currentStep === FormStep.DETAILS ? 'w-full flex justify-end' : ''}>
                  <Button 
                    type="submit" 
                    disabled={createAdMutation.isPending}
                  >
                    {currentStep === FormStep.PREVIEW ? 'Submit Ad' : 'Next'}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default AdSubmissionForm;
