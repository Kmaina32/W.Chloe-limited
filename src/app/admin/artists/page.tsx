'use client';

import { useMemoFirebase } from '@/firebase/provider';
import { collection, orderBy, query } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Button } from '@/components/ui/button';
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
import { PlusCircle, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { AddArtistDialog } from './components/AddArtistDialog';
import { EditArtistDialog } from './components/EditArtistDialog';
import type { Artist } from '@/lib/data';

export default function AdminArtistsPage() {
  const firestore = useFirestore();

  const artistsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'artists'), orderBy('name', 'asc'));
  }, [firestore]);
  
  const { data: artists, isLoading } = useCollection<Artist>(artistsCollection);

  const handleDelete = (artistId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'artists', artistId);
    deleteDocumentNonBlocking(docRef);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Artists</CardTitle>
          <CardDescription>
            Add, edit, or remove artists from your platform.
          </CardDescription>
        </div>
        <AddArtistDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Artist
          </Button>
        </AddArtistDialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="hidden md:table-cell">Country</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading artists...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && artists?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No artists found. Get started by adding one.
                    </TableCell>
                </TableRow>
            )}
            {artists?.map(artist => (
              <TableRow key={artist.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={artist.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={artist.imageUrl}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{artist.name}</TableCell>
                <TableCell>{artist.genre}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {artist.country}
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <EditArtistDialog artist={artist}>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                          </DropdownMenuItem>
                        </EditArtistDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem className="text-destructive hover:!text-destructive focus:!text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the artist &quot;{artist.name}&quot; and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={() => handleDelete(artist.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
