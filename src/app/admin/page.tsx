import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { artists, events, partners } from "@/lib/data"
import { Users, Calendar, Handshake } from "lucide-react"

export default function AdminDashboardPage() {
    const stats = [
        {
            title: "Total Artists",
            value: artists.length,
            icon: Users,
        },
        {
            title: "Upcoming Events",
            value: events.length,
            icon: Calendar,
        },
        {
            title: "Partners",
            value: partners.length,
            icon: Handshake,
        },
    ]

    return (
        <div>
            <h1 className="text-3xl font-headline font-bold mb-6">Admin Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                        <CardTitle>Welcome to Rhythm Root</CardTitle>
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
