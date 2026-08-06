import { readDataFile, writeDataFile } from '@/lib/data-store';

export interface Notification {
  id: string;
  type: 'COMMENT' | 'LIKE' | 'FOLLOW' | 'BOOKMARK' | 'REPLY';
  recipientId: string;   // 接收通知的用户ID
  actorId: string;       // 触发者用户ID
  actorNickname: string; // 触发者昵称
  targetId: string;      // 目标帖子/评论ID
  targetType: string;    // 'post' | 'comment' | 'user'
  targetTitle?: string;  // 帖子标题（如有）
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export function loadNotifications(): Notification[] {
  return readDataFile('notifications.json') as Notification[];
}

export function saveNotifications(notifications: Notification[]) {
  writeDataFile('notifications.json', notifications);
}

export function addNotification(notif: Omit<Notification, 'id' | 'read' | 'createdAt'>): Notification {
  const all = loadNotifications();
  const newNotif: Notification = {
    ...notif,
    id: 'notif-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    read: false,
    createdAt: new Date().toISOString(),
  };
  all.unshift(newNotif);
  saveNotifications(all);
  return newNotif;
}

export function getUserNotifications(userId: string): Notification[] {
  return loadNotifications().filter(n => n.recipientId === userId);
}

export function getUnreadCount(userId: string): number {
  return loadNotifications().filter(n => n.recipientId === userId && !n.read).length;
}

export function markAsRead(notificationId: string) {
  const all = loadNotifications();
  const notif = all.find(n => n.id === notificationId);
  if (notif) {
    notif.read = true;
    saveNotifications(all);
  }
}

export function markAllAsRead(userId: string) {
  const all = loadNotifications();
  all.forEach(n => {
    if (n.recipientId === userId) n.read = true;
  });
  saveNotifications(all);
}
