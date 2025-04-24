import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { insertParticipantSchema } from '@shared/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/auth-context';
import { useLocation } from 'wouter';

// Extend the schema with validation
const participantFormSchema = insertParticipantSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  bio: z.string().min(20, {
    message: "Bio must be at least 20 characters",
  }).max(500, {
    message: "Bio must not exceed 500 characters",
  }),
  profession: z.string().min(2, {
    message: "Profession must be at least 2 characters",
  }),
  profileImageUrl: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialLinkedin: z.string().optional(),
  socialWebsite: z.string().optional(),
}).omit({ userId: true, order: true });

type ParticipantFormValues = z.infer<typeof participantFormSchema>;

const ParticipantForm: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  
  // Check if max participants has been reached
  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/challenge/settings'],
  });
  
  // Get current participants count
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['/api/participants'],
  });
  
  const isParticipantsFull = () => {
    if (settings && participants) {
      const maxParticipants = parseInt(settings.maxParticipants);
      return participants.length >= maxParticipants;
    }
    return false;
  };
  
  const form = useForm<ParticipantFormValues>({
    resolver: zodResolver(participantFormSchema),
    defaultValues: {
      name: '',
      bio: '',
      profession: '',
      profileImageUrl: '',
      socialTwitter: '',
      socialLinkedin: '',
      socialWebsite: '',
    },
  });
  
  const registerParticipantMutation = useMutation({
    mutationFn: async (data: ParticipantFormValues) => {
      const response = await apiRequest('POST', '/api/participants', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered as a participant.',
      });
      // Update user role in context
      updateUser();
      navigate('/participants');
    },
    onError: (error) => {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: ParticipantFormValues) => {
    registerParticipantMutation.mutate(data);
  };
  
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
          <CardDescription>You must be logged in to register as a participant.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/register')}>Register or Login</Button>
        </CardContent>
      </Card>
    );
  }
  
  if (settingsLoading || participantsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please wait while we check availability.</p>
        </CardContent>
      </Card>
    );
  }
  
  if (isParticipantsFull()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Registration Closed</CardTitle>
          <CardDescription>
            The maximum number of participants ({settings?.maxParticipants}) has been reached.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Please register as a viewer to follow the challenge.</p>
          <Button onClick={() => navigate('/join-as-viewer')}>Join as Viewer</Button>
        </CardContent>
      </Card>
    );
  }
  
  if (user.role === 'participant') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Already Registered</CardTitle>
          <CardDescription>You are already registered as a participant.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/participants')}>View Participants</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register as a Participant</CardTitle>
        <CardDescription>
          Join as one of our exclusive participants for the FreeMillionaire Challenge.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Digital Marketing Specialist" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about yourself and your expertise" 
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
              name="profileImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a URL for your profile image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="socialTwitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialLinkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={registerParticipantMutation.isPending}
            >
              {registerParticipantMutation.isPending ? 'Registering...' : 'Register as Participant'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ParticipantForm;
