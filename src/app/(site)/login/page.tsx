'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleLogin, handleSignup, handleGoogleLogin } from './actions';
import { useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Separator } from '@/components/ui/separator';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Processing...' : text}
    </Button>
  );
}

export default function LoginPage() {
  const [loginState, loginAction] = useActionState(handleLogin, initialState);
  const [signupState, signupAction] = useActionState(handleSignup, initialState);
  const { user, isUserLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (loginState.message) {
      toast({
        title: loginState.success ? 'Success' : 'Error',
        description: loginState.message,
        variant: loginState.success ? 'default' : 'destructive',
      });
    }
  }, [loginState, toast]);

  useEffect(() => {
    if (signupState.message) {
      toast({
        title: signupState.success ? 'Success' : 'Error',
        description: signupState.message,
        variant: signupState.success ? 'default' : 'destructive',
      });
    }
  }, [signupState, toast]);

  if (isUserLoading || user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Access your account to manage your platform content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 <form action={handleGoogleLogin}>
                  <Button variant="outline" className="w-full">
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    Sign in with Google
                  </Button>
                </form>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator className="flex-1" />
                </div>
                <form action={loginAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                  <SubmitButton text="Login" />
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create an account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form action={handleGoogleLogin}>
                  <Button variant="outline" className="w-full">
                    <GoogleIcon className="mr-2 h-4 w-4" />
                     Sign up with Google
                  </Button>
                </form>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator className="flex-1" />
                </div>
                <form action={signupAction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" required />
                  </div>
                  <SubmitButton text="Sign Up" />
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
