'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Partner } from '@/lib/data';

interface PartnerFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: Partner | null;
  onFormSuccess: () => void;
}

const initialState = {
  message: '',
  success: false,
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Changes' : 'Add Partner')}
    </Button>
  );
}

export function PartnerForm({ action, initialData = null, onFormSuccess }: PartnerFormProps) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success',
          description: state.message,
        });
        onFormSuccess();
         if (!initialData) { // Reset form only when adding, not editing
          formRef.current?.reset();
        }
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSuccess, initialData]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Partner Name</Label>
        <Input id="name" name="name" defaultValue={initialData?.name} required />
      </div>

      <div>
        <Label htmlFor="logoUrl">Logo URL</Label>
        <Input id="logoUrl" name="logoUrl" defaultValue={initialData?.logoUrl} required />
      </div>
      
      <div>
        <Label htmlFor="websiteURL">Website URL</Label>
        <Input id="websiteURL" name="websiteURL" defaultValue={initialData?.websiteURL} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={initialData?.description} />
      </div>
      
      <SubmitButton isEditing={!!initialData} />
    </form>
  );
}
