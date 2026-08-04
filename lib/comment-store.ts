import { readDataFile, writeDataFile } from '@/lib/data-store';

export function loadDynamicComments(): any[] {
  return readDataFile('comments.json');
}

export function saveComment(comment: any) {
  const dynamic = loadDynamicComments();
  if (!dynamic.find((c: any) => c.id === comment.id)) {
    dynamic.unshift(comment);
    writeDataFile('comments.json', dynamic);
  }
}
