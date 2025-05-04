import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ParticipantCard from '@/components/participant-card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { UserPlus } from 'lucide-react';

const Participants: React.FC = () => {
  // Fetch participants
  const { data: participants, isLoading } = useQuery({
    queryKey: ['/api/participants'],
  });
  
  // Fetch challenge settings
  const { data: settings } = useQuery({
    queryKey: ['/api/challenge/settings'],
  });
  
  const maxParticipants = settings?.maxParticipants ? parseInt(settings.maxParticipants) : 9;
  const remainingSlots = maxParticipants - (participants?.length || 0);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-primary font-semibold">Season 1</span>
        <h1 className="text-4xl font-bold mb-4 text-dark bg-gradient-to-r from-amber-500 via-yellow-500 to-zinc-800 bg-clip-text text-transparent">Future Change-Makers</h1>
        <p className="text-dark-medium text-lg">
          Witness the journey of {maxParticipants} extraordinary entrepreneurs transforming their visions into profitable, world-changing ventures!
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-3 text-center py-12">Loading participants...</div>
        ) : participants && participants.length > 0 ? (
          <>
            {participants.map((participant, index) => (
              <ParticipantCard 
                key={participant.id} 
                participant={participant} 
                order={index + 1} 
              />
            ))}
            
            {/* Participant Slots Remaining */}
            {remainingSlots > 0 && (
              <div className="bg-light-bg rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="text-gray-400 h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-3">Participant Slot</h3>
                  <p className="text-dark-medium mb-5">{remainingSlots} position{remainingSlots !== 1 ? 's' : ''} remaining for Season 1</p>
                  <Link href="/register">
                    <Button>Apply Now</Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-dark-medium mb-4">No participants registered yet.</p>
            <Link href="/register">
              <Button>Be the first to register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;
