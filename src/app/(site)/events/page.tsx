import { events } from '@/lib/data';
import { EventCard } from '@/components/shared/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EventsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">Upcoming Events</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find out where to experience the vibrant energy of our artists live.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <Input placeholder="Search for an event..." className="flex-grow" />
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Artist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Artists</SelectItem>
            <SelectItem value="amara-kante">Amara Kante</SelectItem>
            <SelectItem value="dj-tunde">DJ Tunde</SelectItem>
            <SelectItem value="kwame-mensah">Kwame Mensah</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="lagos">Lagos</SelectItem>
            <SelectItem value="cape-town">Cape Town</SelectItem>
            <SelectItem value="accra">Accra</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Filter</Button>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
