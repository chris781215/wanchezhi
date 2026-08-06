import { readDataFile, writeDataFile } from '@/lib/data-store';

export function loadDynamicUsers(): any[] {
  return readDataFile('users.json');
}

export function saveUser(user: any) {
  const dynamic = loadDynamicUsers();
  const idx = dynamic.findIndex((u: any) => u.id === user.id);
  if (idx >= 0) {
    dynamic[idx] = { ...dynamic[idx], ...user };
  } else {
    dynamic.push(user);
  }
  writeDataFile('users.json', dynamic);
}

// Add points to a user
export function addPoints(userId: string, points: number) {
  const dynamic = loadDynamicUsers();
  const idx = dynamic.findIndex((u: any) => u.id === userId);
  if (idx >= 0) {
    const currentPoints = dynamic[idx].points || 0;
    dynamic[idx].points = Math.max(0, currentPoints + points);
    writeDataFile('users.json', dynamic);
  }
}
