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
