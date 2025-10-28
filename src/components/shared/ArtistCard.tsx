
import Image from 'next/image';
import Link from 'next/link';
import type { Artist } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Music } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`} className="flex">
        <Card className="w-full flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
        <CardHeader className="p-0">
            <div className="aspect-square relative">
            <Image
                src={artist.imageUrl}
                alt={`Photo of ${artist.name}`}
                fill
                className="object-cover"
                data-ai-hint={artist.imageHint}
            />
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <CardTitle className="text-xl font-headline mb-2">{artist.name}</CardTitle>
            <div className="text-muted-foreground space-y-2 text-sm">
            <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-accent" />
                <span>{artist.genre}</span>
            </div>
            <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>{artist.country}</span>
            </div>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" tabIndex={-1}>View Profile</Button>
        </CardFooter>
        </Card>
    </Link>
  );
}
