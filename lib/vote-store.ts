import { readDataFile, writeDataFile } from '@/lib/data-store';

export interface Vote {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'post' | 'comment';
  value: 1 | -1;
  createdAt: string;
}

export function loadVotes(): Vote[] {
  return readDataFile('votes.json') as Vote[];
}

export function saveVotes(votes: Vote[]) {
  writeDataFile('votes.json', votes);
}

export function addVote(vote: Vote) {
  const votes = loadVotes();
  const filtered = votes.filter(
    (v) => !(v.userId === vote.userId && v.targetId === vote.targetId && v.targetType === vote.targetType)
  );
  filtered.unshift(vote);
  saveVotes(filtered);
  return filtered;
}

export function removeVote(userId: string, targetId: string, targetType: 'post' | 'comment') {
  const votes = loadVotes();
  const filtered = votes.filter(
    (v) => !(v.userId === userId && v.targetId === targetId && v.targetType === targetType)
  );
  saveVotes(filtered);
  return filtered;
}

export function getVoteScore(targetId: string, targetType: 'post' | 'comment'): number {
  const votes = loadVotes();
  return votes
    .filter((v) => v.targetId === targetId && v.targetType === targetType)
    .reduce((sum, v) => sum + v.value, 0);
}

export function getUserVote(userId: string, targetId: string, targetType: 'post' | 'comment'): 1 | -1 | 0 {
  const votes = loadVotes();
  const vote = votes.find(
    (v) => v.userId === userId && v.targetId === targetId && v.targetType === targetType
  );
  return vote ? vote.value : 0;
}
