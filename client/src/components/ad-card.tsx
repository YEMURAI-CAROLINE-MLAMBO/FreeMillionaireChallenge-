import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import { Link } from 'wouter';
import { Ad } from '@shared/schema';

interface AdCardProps {
  ad: Ad;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-success/10 text-success';
    case 'pending':
      return 'bg-warning/10 text-warning';
    case 'rejected':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted/10 text-muted-foreground';
  }
};

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="h-48 bg-muted">
        {ad.imageUrl ? (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-dark">{ad.title}</h3>
          <Badge variant="outline" className={getStatusColor(ad.status)}>
            {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
          </Badge>
        </div>
        <p className="text-dark-medium mb-4 line-clamp-3">{ad.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-dark-medium flex items-center">
            <User className="h-4 w-4 mr-1" />
            User #{ad.userId}
          </span>
          <Link href={`/ads/${ad.id}`}>
            <a className="text-primary hover:text-primary/80 font-medium text-sm">View Details</a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdCard;
