// Server-only: user persistence for dynamically registered users
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export function loadDynamicUsers(): any[] {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch { /* ignore */ }
  return [];
}

export function saveUser(user: any) {
  try {
    const dynamic = loadDynamicUsers();
    if (!dynamic.find((u: any) => u.id === user.id)) {
      dynamic.push(user);
      fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
      fs.writeFileSync(USERS_FILE, JSON.stringify(dynamic, null, 2));
    }
  } catch { /* ignore */ }
}
