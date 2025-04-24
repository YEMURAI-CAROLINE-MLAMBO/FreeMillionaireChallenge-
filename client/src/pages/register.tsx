import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/auth-context';
import { useLocation } from 'wouter';
import ParticipantForm from '@/components/forms/participant-form';

const registerSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type RegisterValues = z.infer<typeof registerSchema>;
type LoginValues = z.infer<typeof loginSchema>;

const Register: React.FC = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [_, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<string>("register");
  const [showParticipantForm, setShowParticipantForm] = useState<boolean>(false);
  
  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterValues) => {
      const response = await apiRequest('POST', '/api/auth/register', {
        ...data,
        role: 'user'
      });
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created successfully.',
      });
      login(data);
      
      // If the user wants to be a participant, show the participant form
      if (location.pathname === '/register') {
        setShowParticipantForm(true);
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: 'destructive',
      });
    },
  });
  
  const loginMutation = useMutation({
    mutationFn: async (data: LoginValues) => {
      const response = await apiRequest('POST', '/api/auth/login', data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully.',
      });
      login(data);
      
      // If the user is already a participant, redirect to participants page
      if (data.role === 'participant') {
        navigate('/participants');
      } 
      // If the user wants to be a participant, show the participant form
      else if (location.pathname === '/register') {
        setShowParticipantForm(true);
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      toast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid username or password',
        variant: 'destructive',
      });
    },
  });
  
  const onRegisterSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data);
  };
  
  const onLoginSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };
  
  if (showParticipantForm) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 text-dark">Participant Registration</h1>
          <p className="text-dark-medium text-lg">
            Complete your profile to join as a participant.
          </p>
        </div>
        
        <ParticipantForm />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-dark">Join the FreeMillionaire Challenge</h1>
        <p className="text-dark-medium text-lg">
          Create an account or log in to submit ads and participate in the challenge.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Register to participate in the FreeMillionaire Challenge.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Create a password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? 'Registering...' : 'Register'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center">
                  Already have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => setActiveTab('login')}
                  >
                    Log in
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Log in to your account to continue.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? 'Logging in...' : 'Log In'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center">
                  Don't have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto" 
                    onClick={() => setActiveTab('register')}
                  >
                    Register
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Register;
