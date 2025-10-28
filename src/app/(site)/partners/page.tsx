import Image from 'next/image';
import { partners } from '@/lib/data';
import { Card } from '@/components/ui/card';

export default function PartnersPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">Partners & Sponsors</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          We are proud to collaborate with leading brands in the African entertainment industry.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className="p-6 flex items-center justify-center aspect-video bg-card/50 hover:bg-card transition-colors">
            <div className="relative h-full w-full grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all">
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                fill
                className="object-contain"
                data-ai-hint={partner.imageHint}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
