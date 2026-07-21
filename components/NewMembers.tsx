'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

export default function NewMembers() {
  const [newMembers, setNewMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sorted = [...data.data.items]
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
          setNewMembers(sorted);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white">
        <h3 className="font-semibold text-sm">👋 新会员</h3>
      </div>
      <div className="divide-y divide-border">
        {newMembers.map((user) => (
          <Link
            key={user.id}
            href={`/u/${user.username}`}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors"
          >
            <Avatar nickname={user.nickname} points={user.points} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{user.nickname}</p>
              <p className="text-xs text-text-secondary">新加入</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
