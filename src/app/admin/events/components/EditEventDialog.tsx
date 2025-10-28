'use client';

import { useState } from 'react';
import { editEvent } from '../actions';
import { EventForm } from './EventForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Event } from '@/lib/data';

interface EditEventDialogProps {
    children: React.ReactNode;
    event: Event;
}

export function EditEventDialog({ children, event }: EditEventDialogProps) {
  const [open, setOpen] = useState(false);
  const editEventWithId = editEvent.bind(null, event.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {event.name}</DialogTitle>
          <DialogDescription>
            Update the details for this event.
          </DialogDescription>
        </DialogHeader>
        <EventForm 
            action={editEventWithId} 
            initialData={event}
            onFormSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
