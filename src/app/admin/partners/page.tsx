'use client';

import { useMemo } from 'react';
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
import { PlusCircle, MoreHorizontal, Trash2, Edit, ExternalLink } from 'lucide-react';
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
import { AddPartnerDialog } from './components/AddPartnerDialog';
import { EditPartnerDialog } from './components/EditPartnerDialog';
import type { Partner } from '@/lib/data';
import Link from 'next/link';

export default function AdminPartnersPage() {
  const firestore = useFirestore();

  const partnersCollection = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'partners'), orderBy('name', 'asc'));
  }, [firestore]);
  
  const { data: partners, isLoading } = useCollection<Partner>(partnersCollection);

  const handleDelete = (partnerId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'partners', partnerId);
    deleteDocumentNonBlocking(docRef);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Partners</CardTitle>
          <CardDescription>
            Add, edit, or remove partners and sponsors.
          </CardDescription>
        </div>
        <AddPartnerDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Partner
          </Button>
        </AddPartnerDialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Logo</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Website</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading partners...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && partners?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                        No partners found. Get started by adding one.
                    </TableCell>
                </TableRow>
            )}
            {partners?.map(partner => (
              <TableRow key={partner.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={partner.name}
                    className="aspect-square rounded-md object-contain"
                    height="64"
                    src={partner.logoUrl}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{partner.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link href={partner.websiteURL || '#'} target="_blank" className="flex items-center gap-2 hover:underline">
                    {partner.websiteURL} <ExternalLink className="h-4 w-4"/>
                  </Link>
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
                        <EditPartnerDialog partner={partner}>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                          </DropdownMenuItem>
                        </EditPartnerDialog>
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
                          This will permanently delete the partner &quot;{partner.name}&quot; and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={() => handleDelete(partner.id)}
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
