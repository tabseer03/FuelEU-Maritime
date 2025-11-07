export type PoolMemberInput = { shipId: string; cbBefore: number };

export type PoolMemberResult = { shipId: string; cbBefore: number; cbAfter: number };

/**
 * Greedy pool allocator.
 * Rules applied:
 * - sum(cbBefore) must be >= 0
 * - deficits cannot end up worse
 * - surplus can't become negative
 *
 * Returns cbAfter per member.
 */
export function createPoolAllocation(members: PoolMemberInput[]): PoolMemberResult[] {
  const total = members.reduce((s, m) => s + m.cbBefore, 0);
  if (total < -1e-9) throw new Error('Total CB must be >= 0 for pool creation');

  // copy and sort
  const result: PoolMemberResult[] = members.map(m => ({ ...m, cbAfter: m.cbBefore }));
  // deficits and surplus lists
  const deficits = result.filter(m => m.cbBefore < 0).sort((a, b) => a.cbBefore - b.cbBefore); // most negative first
  const surpluses = result.filter(m => m.cbBefore > 0).sort((a, b) => b.cbBefore - a.cbBefore); // largest surplus first

  let dIdx = 0;
  for (let s of surpluses) {
    let available = s.cbAfter;
    while (available > 1e-9 && dIdx < deficits.length) {
      const deficit = deficits[dIdx];
      const need = -deficit.cbAfter; // positive amount needed
      const transfer = Math.min(available, need);
      s.cbAfter = s.cbAfter - transfer;
      deficit.cbAfter = deficit.cbAfter + transfer;
      available -= transfer;
      if (Math.abs(deficit.cbAfter) < 1e-9) dIdx++;
    }
  }

  // validation
  result.forEach(m => {
    if (m.cbBefore < 0 && m.cbAfter < m.cbBefore - 1e-9) throw new Error('Deficit worsened');
    if (m.cbBefore > 0 && m.cbAfter < -1e-9) throw new Error('Surplus became negative');
  });

  return result;
}
