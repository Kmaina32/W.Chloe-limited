import { artists } from '@/lib/data';
import { ArtistCard } from '@/components/shared/ArtistCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ArtistsPage() {
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
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
