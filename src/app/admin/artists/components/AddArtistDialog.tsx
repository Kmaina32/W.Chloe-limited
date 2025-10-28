'use client';

import { useState } from 'react';
import { addArtist } from '../actions';
import { ArtistForm } from './ArtistForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function AddArtistDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new artist to the platform.
          </DialogDescription>
        </DialogHeader>
        <ArtistForm action={addArtist} onFormSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
