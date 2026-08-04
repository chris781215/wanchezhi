import { readDataFile, writeDataFile } from '@/lib/data-store';

export function loadDynamicCommunities(): any[] {
  return readDataFile('communities.json');
}

export function saveCommunity(comm: any) {
  const dynamic = loadDynamicCommunities();
  const idx = dynamic.findIndex((c: any) => c.slug === comm.slug);
  if (idx >= 0) {
    dynamic[idx] = { ...dynamic[idx], ...comm };
  } else {
    dynamic.push(comm);
  }
  writeDataFile('communities.json', dynamic);
}
