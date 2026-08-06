'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getBadgeLevel } from '@/lib/utils';
import BrandLogo from '@/components/BrandLogo';

const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

interface CommunityEditButtonProps {
  communitySlug: string;
  communityDisplayName: string;
  communityDescription: string;
  createdById: string;
  communityLogo?: string;
  communityBrand?: string;
}

export default function CommunityEditButton({
  communitySlug,
  communityDisplayName,
  communityDescription,
  createdById,
  communityLogo,
  communityBrand,
}: CommunityEditButtonProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState(communityDisplayName);
  const [description, setDescription] = useState(communityDescription);
  const [logo, setLogo] = useState(communityLogo || '');
  const [logoPreview, setLogoPreview] = useState(communityLogo || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check level permission (Lv.4 = 车神 can edit)
  const userLevel = user ? getBadgeLevel(user.points)?.current?.name : null;
  const canEdit = userLevel === '车神' || userLevel === '传奇' || user?.isAdmin;
  const isCreator = user?.id === createdById;

  // Not logged in or not creator and can't edit by level
  if (!user) return null;
  if (!isCreator && !canEdit) {
    // Show locked button with tooltip
    return (
      <div className="relative group">
        <button
          disabled
          className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-full text-sm font-medium bg-secondary/50 text-text-secondary/40 cursor-not-allowed"
        >
          <LockIcon className="w-3.5 h-3.5" />
          <span>编辑</span>
        </button>
        <div className="absolute right-0 top-full mt-1 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          需要车神(Lv.4) 120积分才能编辑社区信息
        </div>
      </div>
    );
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'logo');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setLogo(data.data.url);
        setLogoPreview(data.data.url);
      } else {
        setError(data.error || '上传失败');
      }
    } catch {
      setError('网络错误');
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/communities/${communitySlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName,
          description,
          logo,
          createdById,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        router.refresh();
      } else {
        setError(data.error || '保存失败');
      }
    } catch {
      setError('网络错误');
    }
    setSaving(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors text-text-secondary"
        title="编辑社区信息"
      >
        <EditIcon className="w-3.5 h-3.5" />
        <span>编辑</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h3 className="font-semibold text-base">编辑社区信息</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded hover:bg-secondary">
                <CloseIcon className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-4">
              {/* Logo upload */}
              <div>
                <label className="block text-sm font-medium mb-1.5">社区 Logo</label>
                <div className="flex items-center gap-3">
                  {logoPreview ? (
                    <BrandLogo brand={communityBrand || displayName} size="md" image={logoPreview} />
                  ) : (
                    <BrandLogo brand={communityBrand || displayName} size="md" />
                  )}
                  <div className="flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-3 py-1.5 border border-border rounded-lg text-xs hover:bg-secondary transition-colors"
                    >
                      {uploading ? '上传中...' : logo ? '更换 Logo' : '上传 Logo'}
                    </button>
                    {logo && (
                      <button
                        type="button"
                        onClick={() => { setLogo(''); setLogoPreview(''); }}
                        className="ml-2 text-xs text-red-500 hover:underline"
                      >
                        移除
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-text-secondary mt-1">支持 JPG、PNG、WebP、GIF，最大 5MB</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">社区名称</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">社区描述</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="介绍一下这个社区..."
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                  rows={3}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-5 py-3 border-t border-border">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-text-secondary hover:text-foreground"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !displayName.trim()}
                className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
