import { computeComplianceBalance } from '../core/application/computeCB';

test('computeCB sample from spec', () => {
  const cb = computeComplianceBalance(89.3368, 91.0, 5000);
  // expected ~ -341.344 (from scaffold calculation)
  expect(cb).toBeCloseTo(-341.344, 2);
});
