import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-data';
import { loadDynamicUsers } from '@/lib/user-store';

function ensureDynamicUsersLoaded() {
  const dynamicUsers = loadDynamicUsers();
  dynamicUsers.forEach((du: any) => {
    const idx = mockUsers.findIndex((u: any) => u.id === du.id);
    if (idx >= 0) {
      mockUsers[idx] = { ...mockUsers[idx], ...du };
    } else {
      mockUsers.push(du);
    }
  });
}

export async function GET(_request: Request, { params }: { params: Promise<{ username: string }> }) {
  ensureDynamicUsersLoaded();
  const { username } = await params;
  const user = mockUsers.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: user });
}

export async function PATCH(_request: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  let user: any = mockUsers.find((u) => u.username === username);

  // If user not in mock data, create a stub entry
  if (!user) {
    user = {
      id: 'user-' + Date.now(),
      email: '',
      username: username,
      nickname: username,
      points: 0,
      createdAt: new Date(),
    } as any;
    mockUsers.push(user as any);
  }

  try {
    const body = await _request.json();
    const allowedFields = ['nickname', 'bio', 'avatar', 'currentCar', 'carHistory', 'expertise', 'interests'] as const;

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        (user as Record<string, unknown>)[field] = body[field];
      }
    }

    return NextResponse.json({ success: true, data: user });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
