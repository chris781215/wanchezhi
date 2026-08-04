import fs from 'fs';
import path from 'path';

const VOTES_FILE = path.join(process.cwd(), 'data', 'votes.json');

export interface Vote {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'post' | 'comment';
  value: 1 | -1;
  createdAt: string;
}

export function loadVotes(): Vote[] {
  try {
    if (fs.existsSync(VOTES_FILE)) {
      const raw = fs.readFileSync(VOTES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveVotes(votes: Vote[]) {
  try {
    fs.mkdirSync(path.dirname(VOTES_FILE), { recursive: true });
    fs.writeFileSync(VOTES_FILE, JSON.stringify(votes, null, 2));
  } catch {
    // ignore
  }
}

export function addVote(vote: Vote) {
  const votes = loadVotes();
  // Remove existing vote from same user on same target
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
