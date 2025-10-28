'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Calendar, Handshake, LayoutDashboard, Sparkles, Users, Users2 } from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/admin" className="flex items-center">
             <div className="bg-white rounded-md px-3 py-1">
                <span className="font-bold font-headline text-lg text-black">W.Chloe Limited</span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <AdminNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-6">
            <div className="flex justify-end mb-4">
                <Button asChild variant="outline">
                    <Link href="/">Back to Site</Link>
                </Button>
            </div>
          
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const AdminNav = () => {
    const pathname = usePathname();
    const menuItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/artists', label: 'Artists', icon: Users },
        { href: '/admin/events', label: 'Events', icon: Calendar },
        { href: '/admin/partners', label: 'Partners', icon: Handshake },
        { href: '/admin/users', label: 'Users', icon: Users2 },
        { href: '/admin/content-curation', label: 'Content Curation', icon: Sparkles, isAccent: true },
      ];

    return (
        <SidebarMenu>
            {menuItems.map(({ href, label, icon: Icon, isAccent }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(href) && (href !== '/admin' || pathname === '/admin')}
                  className={cn(isAccent && 'text-accent hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground')}
                >
                  <Link href={href}>
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
