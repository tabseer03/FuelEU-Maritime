import express from 'express';
import { PrismaClient } from '@prisma/client';
import { computeComplianceBalance } from '../../../core/application/computeCB';

const prisma = new PrismaClient();
const router = express.Router();

// GET /routes
router.get('/', async (req, res) => {
  const { vesselType, fuelType, year } = req.query;
  const where: any = {};
  if (vesselType) where.vesselType = String(vesselType);
  if (fuelType) where.fuelType = String(fuelType);
  if (year) where.year = Number(year);
  const data = await prisma.route.findMany({ where });
  res.json(data);
});

// POST /routes/:id/baseline
router.post('/:id/baseline', async (req, res) => {
  const id = Number(req.params.id);
  const found = await prisma.route.findUnique({ where: { id } });
  if (!found) return res.status(404).json({ error: 'Route not found' });
  await prisma.route.updateMany({ where: { isBaseline: true }, data: { isBaseline: false } });
  const updated = await prisma.route.update({ where: { id }, data: { isBaseline: true } });
  res.json(updated);
});

// GET /routes/comparison
router.get('/comparison', async (req, res) => {
  const baseline = await prisma.route.findFirst({ where: { isBaseline: true } });
  if (!baseline) return res.status(400).json({ error: 'No baseline set' });
  const others = await prisma.route.findMany({ where: { id: { not: baseline.id } } });
  const target = 89.3368;
  const results = others.map(o => {
    const percentDiff = ((o.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
    const compliant = o.ghgIntensity <= target;
    return {
      routeId: o.routeId,
      baseline: baseline.ghgIntensity,
      comparison: o.ghgIntensity,
      percentDiff,
      compliant
    };
  });
  res.json({ baseline: baseline.ghgIntensity, results });
});

export default router;
