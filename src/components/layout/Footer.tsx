import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card text-card-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
             <div className="bg-white rounded-md px-3 py-1 inline-block mb-4">
              <span className="font-bold font-headline text-lg text-black">W.Chloe Limited</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A digital platform for managing artists, actors, and DJs — inspired by Africa’s creative energy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="/artists" className="text-sm text-muted-foreground hover:text-foreground">Artists</Link></li>
              <li><Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">Events</Link></li>
              <li><Link href="/partners" className="text-sm text-muted-foreground hover:text-foreground">Partners</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:info@wchloe.com" className="hover:text-foreground">info@wchloe.com</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay up to date with our latest news and events.
            </p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Your Email" className="bg-background"/>
              <Button type="submit" size="icon" variant="outline">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} W.Chloe Limited. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
