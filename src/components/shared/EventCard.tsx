import type { Event } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, User } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  // By appending 'T00:00:00Z', we treat the date string as UTC.
  // This ensures both server and client parse it identically, avoiding hydration mismatch.
  const eventDate = new Date(`${event.date}T00:00:00Z`);

  return (
    <Card className="transition-shadow hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <span>
            {eventDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC', // Specify UTC timezone for consistent output
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-accent" />
          <span>{event.artist}</span>
        </div>
      </CardContent>
    </Card>
  );
}
