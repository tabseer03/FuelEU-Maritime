import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

// GET /banking/records?shipId=&year=
router.get('/records', async (req, res) => {
  const { shipId, year } = req.query;
  if (!shipId || !year) return res.status(400).json({ error: 'shipId and year required' });
  const records = await prisma.bankEntry.findMany({ where: { shipId: String(shipId), year: Number(year) }, orderBy: { createdAt: 'asc' } });
  res.json(records);
});

// POST /banking/bank -> { shipId, year, amount } (only allow positive)
router.post('/bank', async (req, res) => {
  const { shipId, year, amount } = req.body;
  if (!shipId || !year || amount === undefined) return res.status(400).json({ error: 'shipId, year, amount required' });
  if (amount <= 0) return res.status(400).json({ error: 'Only positive amounts can be banked' });
  const entry = await prisma.bankEntry.create({ data: { shipId: String(shipId), year: Number(year), amountGco2eq: Number(amount) } });
  res.json(entry);
});

// POST /banking/apply -> { shipId, year, amount }
router.post('/apply', async (req, res) => {
  const { shipId, year, amount } = req.body;
  if (!shipId || !year || amount === undefined) return res.status(400).json({ error: 'shipId, year, amount required' });
  const total = await prisma.bankEntry.aggregate({ _sum: { amountGco2eq: true }, where: { shipId: String(shipId), year: Number(year) } });
  const bankSum = (total._sum.amountGco2eq ?? 0);
  if (Number(amount) > bankSum + 1e-9) return res.status(400).json({ error: 'Amount exceeds available banked surplus' });

  // create a negative bank entry to reflect application (or track applied entries separately)
  const applied = await prisma.bankEntry.create({ data: { shipId: String(shipId), year: Number(year), amountGco2eq: -Math.abs(Number(amount)) } });

  // update compliance record
  const compliance = await prisma.shipCompliance.findFirst({ where: { shipId: String(shipId), year: Number(year) } });
  if (compliance) {
    const updated = await prisma.shipCompliance.update({ where: { id: compliance.id }, data: { cbGco2eq: compliance.cbGco2eq + Number(amount) } });
    return res.json({ applied, updated });
  } else {
    return res.status(400).json({ error: 'Run GET /compliance/cb first to create compliance snapshot' });
  }
});

export default router;
