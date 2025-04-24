import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Globe } from 'lucide-react';
import { Participant } from '@shared/schema';

interface ParticipantCardProps {
  participant: Participant;
  order: number;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, order }) => {
  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="relative">
        {participant.profileImageUrl ? (
          <img 
            src={participant.profileImageUrl} 
            alt={participant.name} 
            className="w-full h-52 object-cover"
          />
        ) : (
          <div className="w-full h-52 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No profile image</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
          {order}
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-dark mb-1">{participant.name}</h3>
        <p className="text-primary font-medium mb-3">{participant.profession}</p>
        <p className="text-dark-medium mb-4 line-clamp-3">{participant.bio}</p>
        <div className="flex space-x-3">
          {participant.socialTwitter && (
            <Button variant="ghost" size="icon" asChild className="text-dark-medium hover:text-primary transition">
              <a href={participant.socialTwitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          )}
          
          {participant.socialLinkedin && (
            <Button variant="ghost" size="icon" asChild className="text-dark-medium hover:text-primary transition">
              <a href={participant.socialLinkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          )}
          
          {participant.socialWebsite && (
            <Button variant="ghost" size="icon" asChild className="text-dark-medium hover:text-primary transition">
              <a href={participant.socialWebsite} target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
