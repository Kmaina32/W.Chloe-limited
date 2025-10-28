
'use client';
import { useMemo } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Handshake, Mail } from "lucide-react"
import type { Artist, Event, Partner, NewsletterSubscriber } from '@/lib/data';

export default function AdminDashboardPage() {
    const firestore = useFirestore();

    const artistsQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'artists'));
    }, [firestore]);

    const eventsQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'events'));
    }, [firestore]);
    
    const partnersQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'partners'));
    }, [firestore]);

    const subscribersQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'newsletterSubscribers'));
    }, [firestore]);

    const { data: artists, isLoading: isLoadingArtists } = useCollection<Artist>(artistsQuery);
    const { data: events, isLoading: isLoadingEvents } = useCollection<Event>(eventsQuery);
    const { data: partners, isLoading: isLoadingPartners } = useCollection<Partner>(partnersQuery);
    const { data: subscribers, isLoading: isLoadingSubscribers } = useCollection<NewsletterSubscriber>(subscribersQuery);

    const stats = [
        {
            title: "Total Artists",
            value: isLoadingArtists ? '...' : artists?.length ?? 0,
            icon: Users,
        },
        {
            title: "Upcoming Events",
            value: isLoadingEvents ? '...' : events?.length ?? 0,
            icon: Calendar,
        },
        {
            title: "Partners",
            value: isLoadingPartners ? '...' : partners?.length ?? 0,
            icon: Handshake,
        },
        {
            title: "Subscribers",
            value: isLoadingSubscribers ? '...' : subscribers?.length ?? 0,
            icon: Mail,
        },
    ]

    return (
        <div>
            <h1 className="text-3xl font-headline font-bold mb-6">Admin Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to W.Chloe Limited</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Use the navigation on the left to manage artists, events, partners, and generate engaging content using our AI-powered tool.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
