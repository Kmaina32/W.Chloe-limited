'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Handshake, LayoutDashboard, Music4, Sparkles, Users } from 'lucide-react';

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

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/artists', label: 'Artists', icon: Users },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/partners', label: 'Partners', icon: Handshake },
    { href: '/admin/content-curation', label: 'Content Curation', icon: Sparkles, isAccent: true },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/admin" className="flex items-center gap-2">
            <Music4 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg text-sidebar-foreground">W.Chloe Limited</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(({ href, label, icon: Icon, isAccent }) => (
              <SidebarMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === href}
                    className={cn(isAccent && 'text-accent hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground')}
                  >
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-6">
          <Button asChild variant="outline" className="mb-4">
             <Link href="/">Back to Site</Link>
          </Button>
          {/* Main Content Area */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            {/* The page content will be rendered here */}
            {/* @ts-ignore */}
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/admin" className="flex items-center gap-2">
            <Music4 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg text-sidebar-foreground">W.Chloe Limited</span>
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
        { href: '/admin/content-curation', label: 'Content Curation', icon: Sparkles, isAccent: true },
      ];

    return (
        <SidebarMenu>
            {menuItems.map(({ href, label, icon: Icon, isAccent }) => (
              <SidebarMenuItem key={href}>
                <Link href={href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(href) && (href !== '/admin' || pathname === '/admin')}
                    className={cn(isAccent && 'text-accent hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground')}
                  >
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
