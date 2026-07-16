'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { presetCarModels, mockCommunities } from '@/lib/mock-data';
import BrandLogo from '@/components/BrandLogo';

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export default function CreateCommunityPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Filter presets by code
  const filteredPresets = code.trim()
    ? presetCarModels.filter(
        (m) =>
          !mockCommunities.some((c) => c.slug === m.slug) &&
          (m.slug.toLowerCase().includes(code.toLowerCase()) ||
            m.code.toLowerCase().includes(code.toLowerCase()) ||
            m.displayName.toLowerCase().includes(code.toLowerCase()) ||
            m.brand.toLowerCase().includes(code.toLowerCase()))
      )
    : [];

  // Auto-fill brand from preset
  const handleSelectPreset = (preset: (typeof presetCarModels)[0]) => {
    setCode(preset.slug);
    setBrand(preset.brand);
    setDescription(preset.displayName);
  };

  // Check if community already exists
  const slug = code.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  const exists = mockCommunities.some((c) => c.slug === slug);

  return (
    <div className="max-w-2xl mx-auto px-3 md:px-4 py-6">
      <h1 className="text-xl font-bold mb-6">创建社区</h1>

      {/* Code input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">社区代码</label>
        <div className="flex items-center gap-2">
          <span className="text-text-secondary">w/</span>
          <input
            type="text"
            placeholder="输入车型代码，如 W221、E46、B58..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
          />
        </div>
        {slug && exists && (
          <p className="text-xs text-red-500 mt-1">
            社区 w/{slug} 已存在，
            <button onClick={() => router.push(`/w/${slug}`)} className="text-primary hover:underline">
              前往查看
            </button>
          </p>
        )}
      </div>

      {/* Preset suggestions */}
      {filteredPresets.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-text-secondary mb-2">从预设车型快速选择：</p>
          <div className="flex flex-wrap gap-2">
            {filteredPresets.slice(0, 8).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(preset)}
                className="px-3 py-1.5 bg-secondary hover:bg-border rounded-full text-xs flex items-center gap-1.5"
              >
                <BrandLogo brand={preset.brand} size="sm" />
                {preset.displayName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brand */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">品牌</label>
        <input
          type="text"
          placeholder="如：奔驰、宝马、丰田..."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">社区描述（可选）</label>
        <textarea
          placeholder="简单介绍一下这个社区，如：奔驰 W221 底盘，第十代S级轿车..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm text-text-secondary hover:text-foreground"
        >
          取消
        </button>
        <button
          disabled={!slug || !brand || submitting}
          onClick={async () => {
            if (!slug || !brand) return;
            setSubmitting(true);
            setError('');
            try {
              const res = await fetch('/api/communities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  slug,
                  brand,
                  code: code.trim().toUpperCase(),
                  displayName: code.trim().toUpperCase(),
                  description: description || undefined,
                }),
              });
              const data = await res.json();
              if (data.success) {
                router.push(`/w/${slug}`);
              } else {
                setError(data.error || '创建失败');
              }
            } catch {
              setError('网络错误');
            }
            setSubmitting(false);
          }}
          className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? '创建中...' : '创建社区'}
        </button>
      </div>
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
