'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockUsers } from '@/lib/mock-data';

const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);
const WrenchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const HistoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface ProfileSectionsProps {
  userId: string;
  username: string;
  nickname: string;
}

type SectionKey = 'currentCar' | 'carHistory' | 'expertise' | 'interests';

const sectionDefs = [
  { key: 'currentCar' as SectionKey, label: '正在玩的车', icon: <CarIcon className="w-4 h-4" /> },
  { key: 'carHistory' as SectionKey, label: '玩过的车', icon: <HistoryIcon className="w-4 h-4" /> },
  { key: 'expertise' as SectionKey, label: '兴趣点', icon: <WrenchIcon className="w-4 h-4" /> },
  { key: 'interests' as SectionKey, label: '兴趣爱好', icon: <HeartIcon className="w-4 h-4" /> },
];

const sectionPlaceholders: Record<SectionKey, string> = {
  currentCar: '写下你现在的座驾吧，写明车型、年款、入手时间\n比如：2008 奔驰 S350 W221，2024年3月入手，日常代步 + 周末跑山',
  carHistory: '写下你玩过的车，写明车型、年款、使用时间\n比如：E46 325i（2020-2023）→ E90 330i（2023-2024）→ 现在这台',
  expertise: '写下你的兴趣方向\n比如：JDM、大排量自吸、操控派、德系老车修复、涡轮升级...',
  interests: '除了车，你还喜欢什么？\n比如：赛道日、自驾游、摄影、模型收藏...',
};

export default function ProfileSections({ userId, username, nickname }: ProfileSectionsProps) {
  const { user } = useAuth();
  const isOwner = user?.username === username;

  const profileUser = mockUsers.find((u) => u.id === userId || u.username === username);
  const initialValues: Record<SectionKey, string> = {
    currentCar: profileUser?.currentCar || '',
    carHistory: profileUser?.carHistory || '',
    expertise: profileUser?.expertise || '',
    interests: profileUser?.interests || '',
  };

  const [values, setValues] = useState<Record<SectionKey, string>>(initialValues);
  const [editing, setEditing] = useState<SectionKey | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const handleEdit = (key: SectionKey) => {
    setEditing(key);
    setEditValue(values[key]);
  };

  const handleSave = async (key: SectionKey) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(username)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: editValue }),
      });
      const data = await res.json();
      if (data.success) {
        setValues((prev) => ({ ...prev, [key]: editValue }));
      }
    } catch {
      // silent
    }
    setSaving(false);
    setEditing(null);
  };

  const handleCancel = () => {
    setEditing(null);
    setEditValue('');
  };

  const sections = sectionDefs.filter((s) => values[s.key] || editing === s.key);

  if (sections.length === 0 && !isOwner) return null;

  return (
    <div className="space-y-3">
      {sectionDefs.map(({ key, label, icon }) => {
        const isEditing = editing === key;
        const value = values[key];
        if (!value && !isEditing) return null;

        return (
          <div key={key} className="bg-white border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                {icon}
                <span>{label}</span>
              </div>
              {isOwner && !isEditing && (
                <button
                  onClick={() => handleEdit(key)}
                  className="p-1 rounded hover:bg-secondary text-text-secondary hover:text-foreground transition-colors"
                  title="编辑"
                >
                  <EditIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full border border-border rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  rows={3}
                  placeholder={sectionPlaceholders[key]}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-border hover:bg-secondary transition-colors"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                    取消
                  </button>
                  <button
                    onClick={() => handleSave(key)}
                    disabled={saving}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <CheckIcon className="w-3.5 h-3.5" />
                    {saving ? '保存中...' : '保存'}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {value}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
