import Link from 'next/link';
import Image from 'next/image';
import { artists, events, partners } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'event-banner-1');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <video
            src="https://videos.pexels.com/video-files/853877/853877-hd_1280_720_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-full h-full object-cover"
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
              {artists.slice(0, 4).map((artist) => (
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
              {events.slice(0, 4).map((event) => (
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
                          <p className="font-semibold text-center text-muted-foreground">
                            {partner.name}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </main>
    </div>
  );
}