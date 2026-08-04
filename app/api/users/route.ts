import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';
import { loadDynamicUsers } from '@/lib/user-store';

export async function GET() {
  // Load persisted dynamic users into memory
  const dynamicUsers = loadDynamicUsers();
  dynamicUsers.forEach((du: any) => {
    const idx = mockUsers.findIndex((u: any) => u.id === du.id);
    if (idx >= 0) {
      mockUsers[idx] = { ...mockUsers[idx], ...du };
    } else {
      mockUsers.push(du);
    }
  });

  return NextResponse.json({
    success: true,
    data: { items: mockUsers, total: mockUsers.length },
  });
}
