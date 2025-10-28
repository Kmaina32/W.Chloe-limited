
'use client';

import { useMemo } from 'react';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Event } from '@/lib/data';
import Image from 'next/image';
import { Calendar, MapPin, User, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const firestore = useFirestore();

  const eventRef = useMemo(() => {
    if (!firestore || !params.eventId) return null;
    return doc(firestore, 'events', params.eventId);
  }, [firestore, params.eventId]);

  const { data: event, isLoading } = useDoc<Event>(eventRef);

  if (isLoading) {
    return <div className="container py-12 text-center">Loading event...</div>;
  }

  if (!event) {
    return <div className="container py-12 text-center">Event not found.</div>;
  }

  const eventDate = new Date(`${event.date}T00:00:00Z`);

  return (
    <div className="bg-card">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src={event.imageURL || 'https://placehold.co/1200x600'}
          alt={`Promotional image for ${event.name}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
      </div>
      <div className="container relative -mt-16 md:-mt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground mb-4">{event.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="font-medium">
                {eventDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  timeZone: 'UTC',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold font-headline mb-4">About the Event</h2>
              <p className="text-lg text-foreground/80">{event.description}</p>
            </div>
            <div className="md:col-span-1">
              <div className="bg-background/50 p-6 rounded-lg border">
                <h3 className="text-xl font-bold font-headline mb-4">Get Tickets</h3>
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Ticket className="mr-2" />
                  Buy Now
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">Powered by W.Chloe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
