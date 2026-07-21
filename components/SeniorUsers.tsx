import Link from 'next/link';
import { mockUsers } from '@/lib/mock-data';
import { getBadgeLevel } from '@/lib/utils';
import Avatar from '@/components/Avatar';

export default function SeniorUsers() {
  const topUsers = [...mockUsers]
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <h3 className="font-semibold text-sm">🏆 资深用户</h3>
      </div>
      <div className="divide-y divide-border">
        {topUsers.map((user, idx) => {
          const badge = getBadgeLevel(user.points);
          return (
            <Link
              key={user.id}
              href={`/u/${user.username}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors"
            >
              <div className="relative">
                <Avatar nickname={user.nickname} points={user.points} size="sm" />
                {idx < 3 && (
                  <span className="absolute -top-1 -left-1 text-xs">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{user.nickname}</p>
                <p className="text-xs text-text-secondary">{badge.current.icon} {user.points} 积分</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
