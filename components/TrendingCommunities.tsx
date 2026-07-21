import SeniorUsers from '@/components/SeniorUsers';
import NewMembers from '@/components/NewMembers';

export default function TrendingCommunities() {
  return (
    <div className="space-y-4">
      {/* About section */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <img src="/logo.png" alt="玩车志" className="h-6 w-auto" />
        </div>
        <p className="text-xs text-text-secondary mb-3">
          玩车志，经典燃油车爱好者共创社区。
        </p>
        <div className="text-xs text-text-secondary">
          <p>© 2026 wanchezhi.com</p>
        </div>
      </div>

      {/* Senior users */}
      <SeniorUsers />

      {/* New members */}
      <NewMembers />
    </div>
  );
}
