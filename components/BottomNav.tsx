'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { asset } from '@/lib/basePath';

const navItems = [
  { label: 'Markets', href: '/', icon: '/images/nav/marketsicon.png' },
  { label: 'Friends', href: '/friends', icon: '/images/nav/friendsicon.png', passUserId: true },
  { label: 'Picks', href: '/picks', icon: '/images/nav/picksicon.png', passUserId: true },
  { label: 'TrendIQ', href: '/trendiq', icon: '/images/nav/TrendIQicon.png', passUserId: true },
  { label: 'Profile', href: '/profile', icon: '/images/nav/profileicon.png', passUserId: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 w-full max-w-md bg-white border-t border-gray-200 z-50 rounded-t-2xl shadow-md">
      <div className="flex justify-around items-center h-14 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/' && pathname === '/markets');
          const href = item.passUserId && user?.id
            ? `${item.href}?userId=${user.id}`
            : item.href;
          return (
            <Link
              key={item.label}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <Image
                src={asset(item.icon)}
                alt={item.label}
                width={24}
                height={24}
                className={isActive ? 'opacity-100' : 'opacity-60'}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


