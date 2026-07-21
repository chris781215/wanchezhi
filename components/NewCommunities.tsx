'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

export default function NewCommunities() {
  const [newComms, setNewComms] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/communities')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sorted = [...data.data.items]
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
          setNewComms(sorted);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <h3 className="font-semibold text-sm">🌱 新建社区</h3>
      </div>
      <div className="divide-y divide-border">
        {newComms.map((comm) => (
          <Link
            key={comm.id}
            href={`/w/${comm.slug}`}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors"
          >
            <BrandLogo brand={comm.brand} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">w/{comm.displayName}</p>
              <p className="text-xs text-text-secondary">{comm.memberCount} 成员</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
