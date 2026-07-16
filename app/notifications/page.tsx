'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

const CommentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const UserPlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);
const BookmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

interface Notification {
  id: string;
  type: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

const typeIcons: Record<string, React.ReactNode> = {
  COMMENT: <CommentIcon className="w-5 h-5 text-blue-500" />,
  LIKE: <HeartIcon className="w-5 h-5 text-red-500" />,
  FOLLOW: <UserPlusIcon className="w-5 h-5 text-green-500" />,
  BOOKMARK: <BookmarkIcon className="w-5 h-5 text-amber-500" />,
};

function formatTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  return `${days} 天前`;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    fetch(`/api/notifications?userId=${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setNotifications(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user, router]);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAllRead' }),
      });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch {
      // ignore
    }
  };

  const handleClick = async (notif: Notification) => {
    if (!notif.read) {
      try {
        await fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationId: notif.id, action: 'markRead' }),
        });
        setNotifications(notifications.map((n) =>
          n.id === notif.id ? { ...n, read: true } : n
        ));
      } catch {
        // ignore
      }
    }
    router.push(notif.link);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto px-3 md:px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">通知</h1>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-primary hover:underline"
          >
            全部已读
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-16 text-text-secondary">加载中...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">暂无通知</div>
      ) : (
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          {notifications.map((notif) => (
            <button
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${
                !notif.read ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {typeIcons[notif.type] || <HeartIcon className="w-5 h-5 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notif.read ? 'font-medium' : ''}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {formatTime(notif.createdAt)}
                </p>
              </div>
              {!notif.read && (
                <div className="shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
