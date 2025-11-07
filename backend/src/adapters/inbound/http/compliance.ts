import express from 'express';
import { PrismaClient } from '@prisma/client';
import { computeComplianceBalance } from '../../../core/application/computeCB';

const prisma = new PrismaClient();
const router = express.Router();

// GET /compliance/cb?shipId=&year=
router.get('/cb', async (req, res) => {
  const { shipId, year } = req.query;
  if (!shipId || !year) return res.status(400).json({ error: 'shipId and year required' });
  // For demo map shipId => routeId: assume shipId equals routeId
  const route = await prisma.route.findUnique({ where: { routeId: String(shipId) } });
  if (!route) return res.status(404).json({ error: 'Route/ship not found' });

  const cb = computeComplianceBalance(89.3368, route.ghgIntensity, route.fuelConsumption);
  // upsert into ship_compliance
  const existing = await prisma.shipCompliance.findFirst({ where: { shipId: String(shipId), year: Number(year) } });
  if (existing) {
    const updated = await prisma.shipCompliance.update({ where: { id: existing.id }, data: { cbGco2eq: cb } });
    return res.json(updated);
  } else {
    const created = await prisma.shipCompliance.create({ data: { shipId: String(shipId), year: Number(year), cbGco2eq: cb } });
    return res.json(created);
  }
});

// GET /compliance/adjusted-cb?shipId=&year= (applies bank entries)
router.get('/adjusted-cb', async (req, res) => {
  const { shipId, year } = req.query;
  if (!shipId || !year) return res.status(400).json({ error: 'shipId and year required' });
  const compliance = await prisma.shipCompliance.findFirst({ where: { shipId: String(shipId), year: Number(year) } });
  if (!compliance) return res.status(404).json({ error: 'Compliance record not found. Run /compliance/cb first.' });
  const banked = await prisma.bankEntry.aggregate({ _sum: { amountGco2eq: true }, where: { shipId: String(shipId), year: Number(year) } });
  const bankSum = (banked._sum.amountGco2eq ?? 0);
  const adjusted = compliance.cbGco2eq + bankSum;
  res.json({ shipId, year: Number(year), cb_before: compliance.cbGco2eq, banked: bankSum, cb_after: adjusted });
});

export default router;
