'use client';

import { useState } from 'react';
import { editPartner } from '../actions';
import { PartnerForm } from './PartnerForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Partner } from '@/lib/data';

interface EditPartnerDialogProps {
    children: React.ReactNode;
    partner: Partner;
}

export function EditPartnerDialog({ children, partner }: EditPartnerDialogProps) {
  const [open, setOpen] = useState(false);
  const editPartnerWithId = editPartner.bind(null, partner.id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {partner.name}</DialogTitle>
          <DialogDescription>
            Update the details for this partner.
          </DialogDescription>
        </DialogHeader>
        <PartnerForm 
            action={editPartnerWithId} 
            initialData={partner}
            onFormSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
