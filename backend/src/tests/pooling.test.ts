import { createPoolAllocation } from '../core/application/pooling';

test('pool allocation simple', () => {
  // member A has +100, B has -60, C has -40 => valid
  const members = [{ shipId: 'A', cbBefore: 100 }, { shipId: 'B', cbBefore: -60 }, { shipId: 'C', cbBefore: -40 }];
  const out = createPoolAllocation(members);
  expect(out.find(x => x.shipId === 'A')!.cbAfter).toBeCloseTo(0, 6);
  expect(out.find(x => x.shipId === 'B')!.cbAfter).toBeCloseTo(0, 6);
  expect(out.find(x => x.shipId === 'C')!.cbAfter).toBeCloseTo(0, 6);
});
