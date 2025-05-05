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
  projectDescription: z.string().min(50, {
    message: "Project description must be at least 50 characters",
  }).max(1000, {
    message: "Project description must not exceed 1000 characters",
  }),
}).omit({ userId: true, order: true, socialTwitter: true, socialLinkedin: true, socialWebsite: true });

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

  // Check participant eligibility status
  const { data: eligibilityStatus, isLoading: eligibilityLoading } = useQuery({
    queryKey: ['/api/participants/eligibility'],
    enabled: !!user // Only run this query if user is logged in
  });
  
  const isParticipantsFull = () => {
    if (settings && participants && Array.isArray(participants)) {
      const maxParticipants = settings.maxParticipants ? parseInt(settings.maxParticipants) : 9;
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
      projectDescription: '',
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
  
  if (settingsLoading || participantsLoading || eligibilityLoading) {
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
  
  // Check if user is eligible to register as a participant
  if (eligibilityStatus && typeof eligibilityStatus === 'object' && 'eligible' in eligibilityStatus && !eligibilityStatus.eligible) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Registration Restricted</CardTitle>
          <CardDescription>
            {eligibilityStatus.message || "The Free Millionaire Challenge is invitation-only."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Only selected participants chosen by the challenge creator can register.</p>
            <p className="mb-4">You can still register as a viewer to follow the challenge.</p>
            <Button onClick={() => navigate('/join-as-viewer')}>Join as Viewer</Button>
          </div>
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
          Join as one of our exclusive participants for the FreeMillionaire Challenge. Application deadline: July 15, 2025.
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
            
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Entrepreneurship Project Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your social entrepreneurship project idea in detail. What problem are you solving? How will it create positive social impact?" 
                      rows={6}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
