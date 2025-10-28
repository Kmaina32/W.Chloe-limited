
'use client';

import { useMemo } from 'react';
import { useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Artist } from '@/lib/data';
import Image from 'next/image';
import { Globe, Instagram, Linkedin, Music, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ArtistDetailPage({ params }: { params: { artistId: string } }) {
  const firestore = useFirestore();

  const artistRef = useMemo(() => {
    if (!firestore || !params.artistId) return null;
    return doc(firestore, 'artists', params.artistId);
  }, [firestore, params.artistId]);

  const { data: artist, isLoading } = useDoc<Artist>(artistRef);

  if (isLoading) {
    return <div className="container py-12 text-center">Loading artist...</div>;
  }

  if (!artist) {
    return <div className="container py-12 text-center">Artist not found.</div>;
  }

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={artist.imageUrl}
              alt={`Photo of ${artist.name}`}
              fill
              className="object-cover"
              data-ai-hint={artist.imageHint}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-4">{artist.name}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-accent" />
              <span className="font-medium">{artist.genre}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="font-medium">{artist.country}</span>
            </div>
          </div>
          <p className="text-lg text-foreground/80 mb-8">{artist.description}</p>
          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Contact Artist</Button>
            <div className="flex items-center gap-3">
               <a href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-6 w-6" /></a>
               <a href="#" className="text-muted-foreground hover:text-foreground"><Instagram className="h-6 w-6" /></a>
               <a href="#" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
