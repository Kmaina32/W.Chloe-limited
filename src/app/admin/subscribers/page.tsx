'use client';

import { useMemoFirebase } from '@/firebase/provider';
import { collection, orderBy, query } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { NewsletterSubscriber } from '@/lib/data';

export default function AdminSubscribersPage() {
  const firestore = useFirestore();

  const subscribersCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'newsletterSubscribers'), orderBy('subscribedAt', 'desc'));
  }, [firestore]);
  
  const { data: subscribers, isLoading } = useCollection<NewsletterSubscriber>(subscribersCollection);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
        <CardDescription>
          A list of all users subscribed to your newsletter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Subscription Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  Loading subscribers...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !subscribers?.length && firestore && (
                <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                        No subscribers found.
                    </TableCell>
                </TableRow>
            )}
            {!isLoading && !firestore && (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  Connecting to the database...
                </TableCell>
              </TableRow>
            )}
            {subscribers?.map(subscriber => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.email}</TableCell>
                <TableCell>{new Date(subscriber.subscribedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
