
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bot,
  FileScan,
  GitFork,
  Map,
  ShieldCheck,
  GitCommitVertical,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/document-analysis', icon: FileScan, label: 'Document Analysis' },
  { href: '/argument-chain', icon: GitFork, label: 'Argument Chain' },
  { href: '/evidence-mapper', icon: Map, label: 'Evidence Mapper' },
  { href: '/contradiction-finder', icon: GitCommitVertical, label: 'Contradiction Finder' },
  { href: '/chatbot', icon: Bot, label: 'AI Legal Assistant' },
  { href: '/compliance-checker', icon: ShieldCheck, label: 'Compliance Checker' },
];

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode, isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "transition-all duration-300 relative px-4 py-2 rounded-md text-sm font-medium",
        isActive 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-20 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4 w-full">
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      <Logo className="h-6 w-6 text-primary" />
                      <span className="font-headline">LegalCopilot</span>
                    </Link>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="hover:text-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          
            <Link
              href="/"
              className="hidden items-center gap-2 text-lg font-semibold md:flex"
            >
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline">LegalCopilot</span>
            </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-muted/60 p-2 border shadow-inner">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} isActive={pathname === item.href}>
                {item.label}
              </NavLink>
            ))}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
