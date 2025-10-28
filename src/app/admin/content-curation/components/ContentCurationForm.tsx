'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { handleGenerateContent, type FormState } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Clipboard, Check } from 'lucide-react';
import React from 'react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : 'Generate Content'}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="icon" onClick={copy}>
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
    </Button>
  );
}

export default function ContentCurationForm() {
  const [state, formAction] = useActionState(handleGenerateContent, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'Content generated successfully!') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Content Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div>
              <Label htmlFor="contentType">Content Type</Label>
              <Select name="contentType" defaultValue="artist" required>
                <SelectTrigger id="contentType">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="e.g., Femi Kuti" required />
            </div>

            <div>
              <Label htmlFor="genre">Genre (Optional)</Label>
              <Input id="genre" name="genre" placeholder="e.g., Afrobeat, Actor" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the artist or event..." required />
            </div>

            <div>
              <Label htmlFor="keyAttributes">Key Attributes (Optional)</Label>
              <Input id="keyAttributes" name="keyAttributes" placeholder="e.g., Grammy-nominated, High-energy performance" />
            </div>

            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Description</CardTitle>
            {state.data?.description && <CopyButton textToCopy={state.data.description} />}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground min-h-[100px]">
              {state.data?.description || 'AI-generated description will appear here.'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Generated Social Media Post</CardTitle>
            {state.data?.socialMediaPost && <CopyButton textToCopy={state.data.socialMediaPost} />}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap min-h-[100px]">
              {state.data?.socialMediaPost || 'AI-generated social media post will appear here.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
