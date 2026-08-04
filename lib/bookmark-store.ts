import { readDataFile, writeDataFile } from '@/lib/data-store';

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export function loadBookmarks(): Bookmark[] {
  return readDataFile('bookmarks.json') as Bookmark[];
}

export function saveBookmarks(bookmarks: Bookmark[]) {
  writeDataFile('bookmarks.json', bookmarks);
}

export function addBookmark(userId: string, postId: string): boolean {
  const bookmarks = loadBookmarks();
  if (bookmarks.some((b) => b.userId === userId && b.postId === postId)) {
    return true;
  }
  bookmarks.unshift({
    id: 'bm-' + Date.now(),
    userId,
    postId,
    createdAt: new Date().toISOString(),
  });
  saveBookmarks(bookmarks);
  return true;
}

export function removeBookmark(userId: string, postId: string) {
  const bookmarks = loadBookmarks();
  const filtered = bookmarks.filter(
    (b) => !(b.userId === userId && b.postId === postId)
  );
  saveBookmarks(filtered);
}

export function isBookmarked(userId: string, postId: string): boolean {
  const bookmarks = loadBookmarks();
  return bookmarks.some((b) => b.userId === userId && b.postId === postId);
}

export function getBookmarkCount(postId: string): number {
  const bookmarks = loadBookmarks();
  return bookmarks.filter((b) => b.postId === postId).length;
}

export function getUserBookmarks(userId: string): Bookmark[] {
  const bookmarks = loadBookmarks();
  return bookmarks.filter((b) => b.userId === userId);
}
