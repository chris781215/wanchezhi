// Server-only: community persistence to survive hot reload
import fs from 'fs';
import path from 'path';

const COMMUNITIES_FILE = path.join(process.cwd(), 'data', 'communities.json');

export function loadDynamicCommunities(): any[] {
  try {
    if (fs.existsSync(COMMUNITIES_FILE)) {
      const raw = fs.readFileSync(COMMUNITIES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch { /* ignore */ }
  return [];
}

export function saveCommunity(comm: any) {
  try {
    const dynamic = loadDynamicCommunities();
    if (!dynamic.find((c: any) => c.slug === comm.slug)) {
      dynamic.push(comm);
      fs.mkdirSync(path.dirname(COMMUNITIES_FILE), { recursive: true });
      fs.writeFileSync(COMMUNITIES_FILE, JSON.stringify(dynamic, null, 2));
    }
  } catch { /* ignore in environments without fs */ }
}
