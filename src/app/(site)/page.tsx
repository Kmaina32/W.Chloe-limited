
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { Artist, Event, Partner } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArtistCard } from '@/components/shared/ArtistCard';
import { EventCard } from '@/components/shared/EventCard';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const firestore = useFirestore();

  const artistsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'artists'), orderBy('name', 'asc'), limit(4));
  }, [firestore]);

  const eventsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'events'), orderBy('date', 'desc'), limit(4));
  }, [firestore]);
  
  const partnersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'partners'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: artists, isLoading: isLoadingArtists } = useCollection<Artist>(artistsQuery);
  const { data: events, isLoading: isLoadingEvents } = useCollection<Event>(eventsQuery);
  const { data: partners, isLoading: isLoadingPartners } = useCollection<Partner>(partnersQuery);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="https://cdn.prod.website-files.com/673613aae2ea8c20504cbf6e/682f3449c7de1f19b5562ca0_concert-anthony-delanoix.jpg"
            alt="Hero background image of a concert"
            fill
            className="absolute z-0 w-full h-full object-cover"
            priority
          />
          <div className="relative z-20 container px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
              Empowering African Talent
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
              A digital platform for managing artists, actors, and DJs — inspired by Africa’s creative energy.
            </p>
            <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/login">Join the Movement <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        {/* Featured Artists */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center font-headline mb-10">Featured Artists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoadingArtists && Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[250px] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
              {!isLoadingArtists && !artists?.length && <p className="col-span-full text-center">No artists to display.</p>}
              {artists?.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/artists">View All Artists</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Events */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center font-headline mb-10">Latest Events</h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoadingEvents && Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 p-4 border rounded-lg">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
              {!isLoadingEvents && !events?.length && <p className="col-span-full text-center">No events to display.</p>}
              {events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link href="/events">See All Events</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4">
            <h2 className="text-3xl font-bold text-center font-headline mb-12">Our Partners & Sponsors</h2>
            {isLoadingPartners && <Skeleton className="h-24 w-full max-w-4xl mx-auto" />}
            {partners && partners.length > 0 && (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2000,
                  }),
                ]}
                className="w-full max-w-4xl mx-auto"
              >
                <CarouselContent>
                  {partners.map((partner) => (
                    <CarouselItem key={partner.id} className="md:basis-1/2 lg:basis-1/4">
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex items-center justify-center p-6 h-24">
                             <Image src={partner.logoUrl} alt={partner.name} width={100} height={40} className="object-contain" />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
             {!isLoadingPartners && !partners?.length && <p className="text-center">No partners to display.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
