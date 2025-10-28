import { partners } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export default function PartnersPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline tracking-tight">Partners & Sponsors</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          We are proud to collaborate with leading brands in the African entertainment industry.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <Card key={partner.id} className="bg-card/50 hover:bg-card transition-colors">
            <CardContent className="p-6 flex items-center justify-center h-full">
              <p className="text-center font-medium text-muted-foreground group-hover:text-foreground">
                {partner.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
