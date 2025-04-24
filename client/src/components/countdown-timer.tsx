import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer: React.FC = () => {
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fetch challenge end date from API
  const { data: settings } = useQuery({
    queryKey: ['/api/challenge/settings'],
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    const calculateCountdown = () => {
      // Default to August 1, 2025 if no date from API
      const targetDate = settings?.challengeEndDate 
        ? new Date(settings.challengeEndDate) 
        : new Date('2025-08-01T00:00:00');
        
      const currentDate = new Date();
      const timeDifference = targetDate.getTime() - currentDate.getTime();
      
      if (timeDifference > 0) {
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        setCountdown({
          days,
          hours,
          minutes,
          seconds
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [settings]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex space-x-6 mb-8">
      <div className="relative bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
        <div className="text-3xl font-bold text-white">{formatNumber(countdown.days)}</div>
        <div className="text-xs uppercase tracking-wide">Days</div>
      </div>
      <div className="relative bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
        <div className="text-3xl font-bold text-white">{formatNumber(countdown.hours)}</div>
        <div className="text-xs uppercase tracking-wide">Hours</div>
      </div>
      <div className="relative bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
        <div className="text-3xl font-bold text-white">{formatNumber(countdown.minutes)}</div>
        <div className="text-xs uppercase tracking-wide">Mins</div>
      </div>
      <div className="relative bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
        <div className="text-3xl font-bold text-white">{formatNumber(countdown.seconds)}</div>
        <div className="text-xs uppercase tracking-wide">Secs</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
