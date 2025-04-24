import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { insertViewerSchema } from '@shared/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { CheckCircle } from 'lucide-react';

// Extend the schema with validation
const viewerFormSchema = insertViewerSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
}).omit({ userId: true });

type ViewerFormValues = z.infer<typeof viewerFormSchema>;

const ViewerForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const form = useForm<ViewerFormValues>({
    resolver: zodResolver(viewerFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  
  const registerViewerMutation = useMutation({
    mutationFn: async (data: ViewerFormValues) => {
      const response = await apiRequest('POST', '/api/viewers', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered as a viewer.',
      });
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: ViewerFormValues) => {
    registerViewerMutation.mutate(data);
  };
  
  if (isSubmitted) {
    return (
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Registration Complete</h2>
          <p className="text-muted-foreground">
            Thank you for registering as a viewer. You will receive updates about the challenge.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={() => setIsSubmitted(false)}>Register Another</Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={registerViewerMutation.isPending}
            >
              {registerViewerMutation.isPending ? 'Registering...' : 'Register Now'}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              By registering, you agree to our Terms and Privacy Policy.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ViewerForm;
