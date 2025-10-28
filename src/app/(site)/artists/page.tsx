
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Artist } from '@/lib/data';
import { ArtistCard } from '@/components/shared/ArtistCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArtistsPage() {
  const firestore = useFirestore();

  const artistsCollection = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'artists'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: artists, isLoading } = useCollection<Artist>(artistsCollection);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">Artist Directory</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover the incredible talent powering the African creative scene.
        </p>
      </div>

      <div className="mb-8 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by name, genre, or country..." className="pl-10" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[250px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
        {!isLoading && !artists?.length && (
          <p className="col-span-full text-center text-muted-foreground">No artists found.</p>
        )}
        {artists?.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
