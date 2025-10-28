'use client';

import { useState } from 'react';
import { addEvent } from '../actions';
import { EventForm } from './EventForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function AddEventDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new event to the platform.
          </DialogDescription>
        </DialogHeader>
        <EventForm action={addEvent} onFormSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
