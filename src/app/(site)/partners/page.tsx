
'use client';

import { useMemo } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Partner } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

export default function PartnersPage() {
  const firestore = useFirestore();

  const partnersCollection = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'partners'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: partners, isLoading } = useCollection<Partner>(partnersCollection);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">Partners & Sponsors</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          We are proud to collaborate with leading brands in the African entertainment industry.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading && Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
        {!isLoading && !partners?.length && (
          <p className="col-span-full text-center text-muted-foreground">No partners found.</p>
        )}
        {partners?.map((partner) => (
          <Link key={partner.id} href={partner.websiteURL || '#'} target="_blank" rel="noopener noreferrer">
            <Card className="bg-card/50 hover:bg-card transition-colors h-full group">
              <CardContent className="p-6 flex items-center justify-center h-full">
                <Image src={partner.logoUrl} alt={partner.name} width={120} height={60} className="object-contain contrast-0 group-hover:contrast-100 transition-all" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
