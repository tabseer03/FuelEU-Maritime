import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Target GHG intensity (2% below 91.16)
const TARGET_INTENSITY = 89.3368;

router.get("/routes/comparison", async (_, res) => {
  try {
    // Get baseline route
    const baseline = await prisma.route.findFirst({ where: { isBaseline: true } });
    if (!baseline) return res.status(404).json({ message: "No baseline set" });

    // Get all comparison routes
    const routes = await prisma.route.findMany({ where: { isBaseline: false } });

    const comparison = routes.map((r) => {
      const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
      const compliant = r.ghgIntensity <= TARGET_INTENSITY;
      return { ...r, percentDiff, compliant };
    });

    res.json({
      target: TARGET_INTENSITY,
      baseline,
      comparison
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
