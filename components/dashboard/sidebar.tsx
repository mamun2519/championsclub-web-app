'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Gamepad2, Trophy, Wallet, ShoppingBag, Settings } from 'lucide-react';
import { useRole } from '@/hooks/use-role';

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'PLAYER'],
  },
  {
    label: 'Games & Modes',
    href: '/dashboard/games',
    icon: Gamepad2,
    roles: ['ADMIN'],
  },
  {
    label: 'Tournament Rooms',
    href: '/dashboard/rooms',
    icon: Trophy,
    roles: ['ADMIN'],
  },
  {
    label: 'Wallet & Deposits',
    href: '/dashboard/wallet',
    icon: Wallet,
    roles: ['ADMIN'],
  },
  {
    label: 'E-Commerce Store',
    href: '/dashboard/store',
    icon: ShoppingBag,
    roles: ['ADMIN'],
  },
  {
    label: 'User Control',
    href: '/dashboard/users',
    icon: Users,
    roles: ['ADMIN'],
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['ADMIN', 'PLAYER'],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role, hasPermission } = useRole();

  const filteredMenu = MENU_ITEMS.filter((item) => {
    if (role === 'ADMIN') return true;
    if (item.roles && item.roles.includes(role || '')) return true;
    return false;
  });

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground font-black flex items-center justify-center text-lg shadow-md shadow-primary/30">
          CC
        </div>
        <h1 className="text-xl font-bold font-outfit text-primary">ChampionsClub</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {role?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground capitalize">{role || 'Administrator'}</span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
              System Admin
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
