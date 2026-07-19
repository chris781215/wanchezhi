'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mockCommunities } from '@/lib/mock-data';
import { getBadgeLevel } from '@/lib/utils';
import BrandLogo from '@/components/BrandLogo';
import { useAuth } from '@/lib/auth-context';

// Icons
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const LinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);
const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
const SaveIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);
const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const EditIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

type PostType = 'IMAGE' | 'TEXT' | 'LINK' | 'TRADE';

const DRAFTS_KEY = 'wcz-drafts';

interface DraftItem {
  id: string;
  postType: PostType;
  content: string;
  url: string;
  selectedCommunity: string;
  communitySearch: string;
  images: string[];
  updatedAt: number;
}

function loadDrafts(): DraftItem[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDrafts(drafts: DraftItem[]) {
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  } catch {
    // ignore quota errors
  }
}

export default function SubmitPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Determine trade permissions based on user level
  const userLevel = user ? getBadgeLevel(user.points)?.current?.name : null;
  const canTrade = userLevel === '赛车手' || userLevel === '车神' || userLevel === '传奇';

  const [postType, setPostType] = useState<PostType>('IMAGE');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [communitySearch, setCommunitySearch] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Load drafts list on mount
  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  // Auto-select community from URL param (e.g. /submit?community=w221)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const communitySlug = params.get('community');
    if (communitySlug && !selectedCommunity) {
      const comm = mockCommunities.find(
        (c) => c.slug === communitySlug || c.slug.toLowerCase() === communitySlug.toLowerCase()
      );
      if (comm) {
        setSelectedCommunity(comm.slug);
        setCommunitySearch(comm.displayName);
      } else {
        // Even if not found in mock, set the slug directly
        setSelectedCommunity(communitySlug);
        setCommunitySearch(communitySlug);
      }
    }
  }, [selectedCommunity]);

  const hasContent = content || url || images.length > 0;

  // Handle image file selection
  const handleImageSelect = useCallback((files: FileList | null) => {
    if (!files) return;
    const remaining = 9 - images.length;
    const toProcess = Array.from(files).slice(0, remaining);
    toProcess.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages((prev) => (prev.length < 9 ? [...prev, result] : prev));
      };
      reader.readAsDataURL(file);
    });
  }, [images.length]);

  // Save current form as draft
  const handleSaveDraft = () => {
    if (!hasContent) return;
    const now = Date.now();
    if (editingDraftId) {
      // Update existing draft
      const updated = drafts.map((d) =>
        d.id === editingDraftId
          ? { ...d, postType, content, url, selectedCommunity, communitySearch, images, updatedAt: now }
          : d
      );
      setDrafts(updated);
      saveDrafts(updated);
      setSaveMsg('草稿已更新');
    } else {
      // New draft
      const newDraft: DraftItem = {
        id: `draft-${now}`,
        postType, content, url, selectedCommunity, communitySearch, images,
        updatedAt: now,
      };
      const updated = [newDraft, ...drafts];
      setDrafts(updated);
      saveDrafts(updated);
      setEditingDraftId(newDraft.id);
      setSaveMsg('草稿已保存');
    }
    setTimeout(() => setSaveMsg(''), 2000);
  };

  // Load a draft into the form
  const handleLoadDraft = (draft: DraftItem) => {
    setPostType(draft.postType);
    setContent(draft.content);
    setUrl(draft.url);
    setSelectedCommunity(draft.selectedCommunity);
    setCommunitySearch(draft.communitySearch);
    setImages(draft.images);
    setEditingDraftId(draft.id);
    setShowDrafts(false);
  };

  // Delete a draft
  const handleDeleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    setDrafts(updated);
    saveDrafts(updated);
    if (editingDraftId === id) {
      setEditingDraftId(null);
    }
  };

  // Clear form
  const handleClear = () => {
    setPostType('IMAGE');
    setContent('');
    setUrl('');
    setImages([]);
    setSelectedCommunity('');
    setCommunitySearch('');
    setEditingDraftId(null);
  };

  // Community search logic
  const matchedCommunities = communitySearch.trim()
    ? mockCommunities.filter((c) => {
        const q = communitySearch.toLowerCase();
        return (
          c.slug.toLowerCase().includes(q) ||
          c.displayName.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.brand.toLowerCase().includes(q)
        );
      })
    : [];

  const noResults = communitySearch.trim().length > 0 && matchedCommunities.length === 0;

  const typeLabels: Record<PostType, string> = { IMAGE: '图文', TEXT: '纯文', LINK: '链接', TRADE: '交易' };

  return (
    <div className="max-w-3xl mx-auto px-3 md:px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{editingDraftId ? '编辑草稿' : '发布新帖'}</h1>
        {drafts.length > 0 && (
          <button
            onClick={() => setShowDrafts(!showDrafts)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-text-secondary hover:text-foreground border border-border rounded-full"
          >
            <FileTextIcon className="w-3.5 h-3.5" />
            草稿 ({drafts.length})
          </button>
        )}
      </div>

      {/* Drafts panel */}
      {showDrafts && drafts.length > 0 && (
        <div className="mb-6 bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-secondary border-b border-border flex items-center justify-between">
            <span className="text-sm font-medium">我的草稿</span>
            <button onClick={() => setShowDrafts(false)} className="text-text-secondary hover:text-foreground">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-border max-h-64 overflow-y-auto">
            {drafts.map((draft) => (
              <div key={draft.id} className="px-4 py-3 flex items-center gap-3 hover:bg-secondary/50">
                <div className="flex-1 min-w-0" onClick={() => handleLoadDraft(draft)}>
                  <p className="text-sm font-medium truncate cursor-pointer">
                    {draft.content ? draft.content.slice(0, 30) : '无内容'}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-secondary">{typeLabels[draft.postType]}</span>
                    {draft.selectedCommunity && (
                      <span className="text-xs text-text-secondary">w/{draft.selectedCommunity}</span>
                    )}
                    {draft.images.length > 0 && (
                      <span className="text-xs text-text-secondary">{draft.images.length}图</span>
                    )}
                    <span className="text-xs text-text-secondary">
                      {new Date(draft.updatedAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleLoadDraft(draft)}
                    className="p-1.5 text-text-secondary hover:text-primary rounded"
                    title="编辑"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('删除这个草稿？')) handleDeleteDraft(draft.id);
                    }}
                    className="p-1.5 text-text-secondary hover:text-red-500 rounded"
                    title="删除"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">选择社区</label>
        <input
          type="text"
          placeholder="输入车型代码搜索，如 W221、E46、B58..."
          value={communitySearch}
          onChange={(e) => {
            setCommunitySearch(e.target.value);
            setSelectedCommunity('');
          }}
          className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
        {communitySearch.trim() && !selectedCommunity && (
          <div className="mt-2 bg-white border border-border rounded-lg max-h-60 overflow-y-auto">
            {matchedCommunities.map((comm) => (
              <button
                key={comm.id}
                onClick={() => {
                  setSelectedCommunity(comm.slug);
                  setCommunitySearch(comm.displayName);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary border-b border-border last:border-0 flex items-center gap-3"
              >
                <BrandLogo brand={comm.brand} size="sm" />
                <div>
                  <p className="font-medium">w/{comm.displayName}</p>
                  <p className="text-xs text-text-secondary">{comm.description?.slice(0, 50)}</p>
                </div>
              </button>
            ))}
            {noResults && (
              <div className="px-4 py-3">
                <p className="text-sm text-text-secondary mb-2">没有找到匹配的社区</p>
                <Link href="/communities/create" className="text-sm text-primary font-medium hover:underline">
                  + 创建新社区
                </Link>
              </div>
            )}
          </div>
        )}
        {selectedCommunity && (
          <div className="mt-2 flex items-center gap-2">
            <p className="text-xs text-text-secondary">
              已选择: <span className="font-medium text-foreground">w/{selectedCommunity}</span>
            </p>
            <button
              onClick={() => {
                setSelectedCommunity('');
                setCommunitySearch('');
              }}
              className="text-xs text-primary hover:underline"
            >
              重新选择
            </button>
          </div>
        )}
      </div>

      {/* Image upload area */}
      {postType === 'IMAGE' && (
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 text-white rounded-full flex items-center justify-center"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < 9 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <CameraIcon className="w-6 h-6 text-text-secondary" />
                <span className="text-xs text-text-secondary">{images.length}/9</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <textarea
          placeholder={postType === 'IMAGE' ? '分享你的爱车故事...' : postType === 'TRADE' ? '描述一下宝贝情况...' : '说点什么...'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
          rows={postType === 'IMAGE' ? 5 : 8}
        />
      </div>

      {/* Link input */}
      {postType === 'LINK' && (
        <div className="mb-4">
          <input
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>
      )}

      {/* Post type selector */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setPostType('IMAGE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            postType === 'IMAGE' ? 'bg-primary text-white' : 'bg-secondary text-text-secondary hover:bg-border'
          }`}
        >
          <CameraIcon className="w-3.5 h-3.5" />
          图文
        </button>
        <button
          onClick={() => setPostType('TEXT')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            postType === 'TEXT' ? 'bg-primary text-white' : 'bg-secondary text-text-secondary hover:bg-border'
          }`}
        >
          <FileTextIcon className="w-3.5 h-3.5" />
          纯文
        </button>
        <button
          onClick={() => setPostType('LINK')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            postType === 'LINK' ? 'bg-primary text-white' : 'bg-secondary text-text-secondary hover:bg-border'
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          链接
        </button>
        <button
          onClick={() => {
            if (canTrade) setPostType('TRADE');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            postType === 'TRADE' ? 'bg-orange-500 text-white' : canTrade ? 'bg-secondary text-text-secondary hover:bg-border' : 'bg-secondary text-text-secondary/40 cursor-not-allowed'
          }`}
          title={!canTrade ? '需要赛车手(Lv.3)以上等级才能发布交易帖' : ''}
        >
          <TagIcon className="w-3.5 h-3.5" />
          交易
        </button>
      </div>

      {/* Trade price input */}
      {postType === 'TRADE' && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1.5">价格（元）</label>
            <input
              type="text"
              placeholder="输入价格，可不填"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          {!canTrade && (
            <p className="mt-3 text-xs text-red-500">
              当前等级不足，需要赛车手(Lv.3)以上才能发布交易帖
            </p>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (hasContent && confirm('确定清除当前所有内容？')) handleClear();
            else if (!hasContent) handleClear();
          }}
          className="px-4 py-2 text-sm text-text-secondary hover:text-foreground"
        >
          清空
        </button>
        <div className="flex items-center gap-2">
          {saveMsg && (
            <span className="text-xs text-green-600 animate-pulse">{saveMsg}</span>
          )}
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-sm text-text-secondary hover:text-foreground"
          >
            取消
          </button>
          <button
            onClick={handleSaveDraft}
            disabled={!hasContent}
            className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <SaveIcon className="w-4 h-4" />
            存草稿
          </button>
          <button
            disabled={!hasContent || !selectedCommunity || submitting}
            onClick={async () => {
              if (!hasContent || !selectedCommunity) return;
              setSubmitting(true);
              setError('');
              try {
                let uploadedUrls: string[] | undefined;

                // Upload images if any (convert base64 to files and upload)
                if (postType === 'IMAGE' && images.length > 0) {
                  const formData = new FormData();
                  for (const img of images) {
                    if (img.startsWith('data:')) {
                      // Convert base64 to blob
                      const [header, base64] = img.split(',');
                      const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
                      const byteString = atob(base64);
                      const ab = new ArrayBuffer(byteString.length);
                      const ia = new Uint8Array(ab);
                      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
                      const blob = new Blob([ab], { type: mime });
                      const ext = mime.split('/')[1] || 'jpg';
                      formData.append('images', blob, `image.${ext}`);
                    } else if (img.startsWith('/uploads/')) {
                      // Already uploaded
                      if (!uploadedUrls) uploadedUrls = [];
                      uploadedUrls.push(img);
                    }
                  }
                  if (formData.getAll('images').length > 0) {
                    const uploadRes = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const uploadData = await uploadRes.json();
                    if (uploadData.success) {
                      uploadedUrls = [...(uploadedUrls || []), ...uploadData.data.urls];
                    }
                  }
                }

                // Auto-generate title from content
                const autoTitle = content.trim() ? content.trim().split('\n')[0].slice(0, 30) : (url || '分享');

                const res = await fetch('/api/posts', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    title: autoTitle,
                    content: postType !== 'LINK' ? content : undefined,
                    type: postType,
                    url: postType === 'LINK' ? url : undefined,
                    images: uploadedUrls,
                    communityId: selectedCommunity,
                    price: postType === 'TRADE' ? price : undefined,
                  }),
                });
                const data = await res.json();
                if (data.success) {
                  if (editingDraftId) {
                    const updated = drafts.filter((d) => d.id !== editingDraftId);
                    setDrafts(updated);
                    saveDrafts(updated);
                  }
                  router.push(`/w/${data.data.community?.slug || 'all'}/post/${data.data.id}`);
                } else {
                  setError(data.error || '发布失败');
                }
              } catch {
                setError('网络错误');
              }
              setSubmitting(false);
            }}
            className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '发布中...' : '发布'}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
