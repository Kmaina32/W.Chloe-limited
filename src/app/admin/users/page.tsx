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
import Image from 'next/image';
import type { UserProfile } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function getInitials(name?: string | null) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}


export default function AdminUsersPage() {
  const firestore = useFirestore();

  const usersCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), orderBy('displayName', 'asc'));
  }, [firestore]);
  
  const { data: users, isLoading } = useCollection<UserProfile>(usersCollection);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>
            View and manage users on your platform.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Loading users...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !users && firestore && (
                <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                        No users found.
                    </TableCell>
                </TableRow>
            )}
            {!isLoading && !firestore && (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  Connecting to the database...
                </TableCell>
              </TableRow>
            )}
            {users?.map(user => (
              <TableRow key={user.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar>
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.displayName || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
