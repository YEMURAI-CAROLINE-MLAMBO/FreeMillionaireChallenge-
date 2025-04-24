import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/auth-context';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { formatDate, getStatusColor } from '@/lib/utils';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  Settings,
  User,
  Users,
  FileText
} from 'lucide-react';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [challengeEndDate, setChallengeEndDate] = useState<string>('');
  const [maxParticipants, setMaxParticipants] = useState<string>('');

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  // Fetch all ads for admin
  const { data: ads, isLoading: adsLoading } = useQuery({
    queryKey: ['/api/admin/ads'],
  });

  // Fetch all participants
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['/api/admin/participants'],
  });

  // Fetch all viewers
  const { data: viewers, isLoading: viewersLoading } = useQuery({
    queryKey: ['/api/admin/viewers'],
  });

  // Fetch challenge settings
  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['/api/challenge/settings'],
    onSuccess: (data) => {
      setChallengeEndDate(new Date(data.challengeEndDate).toISOString().split('T')[0]);
      setMaxParticipants(data.maxParticipants);
    }
  });

  // Update ad status mutation
  const updateAdStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest('PATCH', `/api/ads/${id}/status`, { status });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Status Updated',
        description: 'Ad status has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/ads'] });
    },
    onError: (error) => {
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update ad status',
        variant: 'destructive',
      });
    }
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (data: { key: string; value: string; description?: string }) => {
      const response = await apiRequest('POST', '/api/admin/settings', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Settings Updated',
        description: 'Challenge settings have been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/challenge/settings'] });
    },
    onError: (error) => {
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update settings',
        variant: 'destructive',
      });
    }
  });

  // Handle ad status change
  const handleStatusChange = (id: number, status: string) => {
    updateAdStatusMutation.mutate({ id, status });
  };

  // Handle settings update
  const handleSettingsUpdate = () => {
    // Update challenge end date
    updateSettingsMutation.mutate({
      key: 'challengeEndDate',
      value: new Date(challengeEndDate).toISOString(),
      description: 'The end date for the challenge'
    });

    // Update max participants
    updateSettingsMutation.mutate({
      key: 'maxParticipants',
      value: maxParticipants,
      description: 'Maximum number of participants allowed'
    });

    toast({
      title: 'Settings Updating',
      description: 'Your settings are being updated...',
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="ads" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-xl">
          <TabsTrigger value="ads">
            <FileText className="mr-2 h-4 w-4" />
            Ads
          </TabsTrigger>
          <TabsTrigger value="participants">
            <Users className="mr-2 h-4 w-4" />
            Participants
          </TabsTrigger>
          <TabsTrigger value="viewers">
            <User className="mr-2 h-4 w-4" />
            Viewers
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Ads Management Tab */}
        <TabsContent value="ads">
          <Card>
            <CardHeader>
              <CardTitle>Ad Management</CardTitle>
              <CardDescription>Review and manage ad submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {adsLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary mb-2" />
                  <p>Loading ads...</p>
                </div>
              ) : ads && ads.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ads.map((ad: any) => (
                        <TableRow key={ad.id}>
                          <TableCell>{ad.id}</TableCell>
                          <TableCell className="font-medium">{ad.title}</TableCell>
                          <TableCell>{ad.category}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(ad.status)}>
                              {ad.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(ad.paymentStatus)}>
                              {ad.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(ad.createdAt)}</TableCell>
                          <TableCell>
                            <Select 
                              defaultValue={ad.status}
                              onValueChange={(value) => handleStatusChange(ad.id, value)}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue placeholder="Change status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approve</SelectItem>
                                <SelectItem value="rejected">Reject</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No ads found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Participants Management Tab */}
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Participant Management</CardTitle>
              <CardDescription>Manage challenge participants</CardDescription>
            </CardHeader>
            <CardContent>
              {participantsLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary mb-2" />
                  <p>Loading participants...</p>
                </div>
              ) : participants && participants.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Profession</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Date Joined</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((participant: any) => (
                        <TableRow key={participant.id}>
                          <TableCell>{participant.id}</TableCell>
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>{participant.profession}</TableCell>
                          <TableCell>#{participant.order}</TableCell>
                          <TableCell>{formatDate(participant.createdAt)}</TableCell>
                          <TableCell>
                            <Badge variant={participant.isActive ? "default" : "outline"}>
                              {participant.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No participants registered yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Viewers Management Tab */}
        <TabsContent value="viewers">
          <Card>
            <CardHeader>
              <CardTitle>Viewer Management</CardTitle>
              <CardDescription>Manage registered viewers</CardDescription>
            </CardHeader>
            <CardContent>
              {viewersLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary mb-2" />
                  <p>Loading viewers...</p>
                </div>
              ) : viewers && viewers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Date Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {viewers.map((viewer: any) => (
                        <TableRow key={viewer.id}>
                          <TableCell>{viewer.id}</TableCell>
                          <TableCell className="font-medium">{viewer.name}</TableCell>
                          <TableCell>{viewer.email}</TableCell>
                          <TableCell>{viewer.userId || 'N/A'}</TableCell>
                          <TableCell>{formatDate(viewer.createdAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p>No viewers registered yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Challenge Settings</CardTitle>
              <CardDescription>Manage global settings for the challenge</CardDescription>
            </CardHeader>
            <CardContent>
              {settingsLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin text-primary mb-2" />
                  <p>Loading settings...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="challenge-end-date" className="text-sm font-medium">
                        Challenge End Date
                      </label>
                      <Input
                        id="challenge-end-date"
                        type="date"
                        value={challengeEndDate}
                        onChange={(e) => setChallengeEndDate(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="max-participants" className="text-sm font-medium">
                        Maximum Participants
                      </label>
                      <Input
                        id="max-participants"
                        type="number"
                        min="1"
                        max="100"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleSettingsUpdate}
                    disabled={updateSettingsMutation.isPending}
                  >
                    {updateSettingsMutation.isPending ? 'Updating...' : 'Save Settings'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
