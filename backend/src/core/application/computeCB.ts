export const ENERGY_MJ_PER_TON = 41000; // MJ per tonne

/**
 * Compute Compliance Balance (in tonnes CO2-eq)
 * targetIntensity and actualIntensity are gCO2e / MJ
 * fuelTons is in tonnes
 */
export function computeComplianceBalance(targetIntensity: number, actualIntensity: number, fuelTons: number): number {
  const energyMJ = fuelTons * ENERGY_MJ_PER_TON; // MJ
  const cbGrams = (targetIntensity - actualIntensity) * energyMJ; // grams CO2-eq
  const cbTons = cbGrams / 1_000_000; // convert grams -> metric tonnes
  return cbTons;
}
