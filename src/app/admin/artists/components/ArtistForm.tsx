'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Artist } from '@/lib/data';

interface ArtistFormProps {
  action: (prevState: any, formData: FormData) => Promise<any>;
  initialData?: Artist | null;
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
      {pending ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Changes' : 'Add Artist')}
    </Button>
  );
}

export function ArtistForm({ action, initialData = null, onFormSuccess }: ArtistFormProps) {
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
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSuccess]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={initialData?.name} required />
      </div>

      <div>
        <Label htmlFor="genre">Genre</Label>
        <Input id="genre" name="genre" defaultValue={initialData?.genre} required />
      </div>
      
      <div>
        <Label htmlFor="country">Country</Label>
        <Input id="country" name="country" defaultValue={initialData?.country} required />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" name="imageUrl" defaultValue={initialData?.imageUrl} required />
      </div>

      <div>
        <Label htmlFor="imageHint">Image Hint</Label>
        <Input id="imageHint" name="imageHint" defaultValue={initialData?.imageHint} placeholder="e.g., 'woman portrait'"/>
      </div>
      
      <SubmitButton isEditing={!!initialData} />
    </form>
  );
}
