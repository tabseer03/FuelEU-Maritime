import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createPoolAllocation } from '../../../core/application/pooling';
const prisma = new PrismaClient();
const router = express.Router();

// POST /pools -> { year, members: [{ shipId, cbBefore }] }
router.post('/', async (req, res) => {
  const { year, members } = req.body;
  if (!year || !members || !Array.isArray(members)) return res.status(400).json({ error: 'year and members required' });

  const inputs = members.map((m: any) => ({ shipId: String(m.shipId), cbBefore: Number(m.cbBefore) }));
  try {
    const allocation = createPoolAllocation(inputs);
    // persist pool and pool members
    const pool = await prisma.pool.create({ data: { year: Number(year) } });
    for (const mem of allocation) {
      await prisma.poolMember.create({ data: { poolId: pool.id, shipId: mem.shipId, cbBefore: mem.cbBefore, cbAfter: mem.cbAfter } });
    }
    res.json({ poolId: pool.id, allocation });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
