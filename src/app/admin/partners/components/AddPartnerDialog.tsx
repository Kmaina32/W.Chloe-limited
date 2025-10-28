'use client';

import { useState } from 'react';
import { addPartner } from '../actions';
import { PartnerForm } from './PartnerForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function AddPartnerDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Partner</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new partner to the platform.
          </DialogDescription>
        </DialogHeader>
        <PartnerForm action={addPartner} onFormSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
