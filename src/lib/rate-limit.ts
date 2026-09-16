// Basic per-instance protection. Deploy behind a trusted proxy and an edge rate-limit
// rule for /api/contact; process memory is not a distributed limit on serverless hosts.
const buckets = new Map<string, { count: number; expires: number }>();
export function allowRequest(key: string, now = Date.now()) {
  for (const [k, b] of buckets) if (b.expires <= now) buckets.delete(k);
  const old = buckets.get(key);
  if (old) {
    if (old.count >= 5) return false;
    old.count++;
    return true;
  }
  if (buckets.size >= 5000) return false;
  buckets.set(key, { count: 1, expires: now + 10 * 60 * 1000 });
  return true;
}
