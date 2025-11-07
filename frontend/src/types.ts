export type RouteEntity = {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distanceKm: number;
  totalEmissions: number;
  isBaseline: boolean;
};
