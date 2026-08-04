// Server-only: comment persistence for dynamically created comments
import fs from 'fs';
import path from 'path';

const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json');

export function loadDynamicComments(): any[] {
  try {
    if (fs.existsSync(COMMENTS_FILE)) {
      const raw = fs.readFileSync(COMMENTS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch { /* ignore */ }
  return [];
}

export function saveComment(comment: any) {
  try {
    const dynamic = loadDynamicComments();
    if (!dynamic.find((c: any) => c.id === comment.id)) {
      dynamic.unshift(comment);
      fs.mkdirSync(path.dirname(COMMENTS_FILE), { recursive: true });
      fs.writeFileSync(COMMENTS_FILE, JSON.stringify(dynamic, null, 2));
    }
  } catch { /* ignore */ }
}
