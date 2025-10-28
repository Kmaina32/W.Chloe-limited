'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, initializeFirebase } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { createUserProfile } from './actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Separator } from '@/components/ui/separator';

function handleAuthError(error: any): { message: string } {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return { message: 'Invalid credentials. Please try again.' };
      case 'auth/email-already-in-use':
        return { message: 'This email is already registered.' };
      case 'auth/weak-password':
        return { message: 'The password is too weak. Please use at least 6 characters.' };
      case 'auth/invalid-email':
        return { message: 'The email address is not valid.' };
      case 'auth/operation-not-allowed':
        return { message: 'Email/password accounts are not enabled.' };
      default:
        return { message: `An unexpected authentication error occurred: ${error.code}` };
    }
  }
  return { message: error.message || 'An unknown error occurred.' };
}

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const { auth } = initializeFirebase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Success',
        description: 'Login successful! Redirecting...',
      });
      // The onAuthStateChanged listener will handle the redirect.
    } catch (error) {
      const { message } = handleAuthError(error);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setPending(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;

      const displayName = user.displayName || signupEmail.split('@')[0];
      await updateProfile(user, { displayName });

      // Call the server action to create the Firestore document.
      await createUserProfile({ ...user, displayName });

      toast({
        title: 'Success',
        description: 'Signup successful! You are now logged in.',
      });
      // The onAuthStateChanged listener will handle the redirect.
    } catch (error) {
      const { message } = handleAuthError(error);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    setPending(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      // Firebase will handle the redirect and onAuthStateChanged will pick up the result.
    } catch (error) {
      const { message } = handleAuthError(error);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      setPending(false);
    }
  };

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
                 <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={pending}>
                    <GoogleIcon className="mr-2 h-4 w-4" />
                    {pending ? 'Redirecting...' : 'Sign in with Google'}
                  </Button>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator className="flex-1" />
                </div>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                   <Button type="submit" disabled={pending} className="w-full">
                    {pending ? 'Processing...' : 'Login'}
                  </Button>
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
                  <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={pending}>
                    <GoogleIcon className="mr-2 h-4 w-4" />
                     {pending ? 'Redirecting...' : 'Sign up with Google'}
                  </Button>
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR</span>
                  <Separator className="flex-1" />
                </div>
                <form onSubmit={handleEmailSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" name="email" type="email" placeholder="m@example.com" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" name="password" type="password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                  </div>
                   <Button type="submit" disabled={pending} className="w-full">
                    {pending ? 'Processing...' : 'Sign Up'}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
