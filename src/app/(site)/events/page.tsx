
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Event } from '@/lib/data';
import { EventCard } from '@/components/shared/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';


export default function EventsPage() {
  const firestore = useFirestore();

  const eventsCollection = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'), orderBy('date', 'desc'));
  }, [firestore]);

  const { data: events, isLoading } = useCollection<Event>(eventsCollection);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">Upcoming Events</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find out where to experience the vibrant energy of our artists live.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <Input placeholder="Search for an event..." className="flex-grow" />
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Artist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            <SelectItem value="amara-kante">Amara Kante</SelectItem>
            <SelectItem value="dj-tunde">DJ Tunde</SelectItem>
            <SelectItem value="kwame-mensah">Kwame Mensah</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="lagos">Lagos</SelectItem>
            <SelectItem value="cape-town">Cape Town</SelectItem>
            <SelectItem value="accra">Accra</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Filter</Button>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
        {!isLoading && !events?.length && (
          <p className="col-span-full text-center text-muted-foreground">No upcoming events found.</p>
        )}
        {events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
