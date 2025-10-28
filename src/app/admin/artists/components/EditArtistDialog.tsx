'use client';

import { useState } from 'react';
import { editArtist } from '../actions';
import { ArtistForm } from './ArtistForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Artist } from '@/lib/data';

interface EditArtistDialogProps {
    children: React.ReactNode;
    artist: Artist;
}

export function EditArtistDialog({ children, artist }: EditArtistDialogProps) {
  const [open, setOpen] = useState(false);
  const editArtistWithId = editArtist.bind(null, artist.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {artist.name}</DialogTitle>
          <DialogDescription>
            Update the details for this artist.
          </DialogDescription>
        </DialogHeader>
        <ArtistForm 
            action={editArtistWithId} 
            initialData={artist}
            onFormSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
