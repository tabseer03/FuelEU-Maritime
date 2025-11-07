import express from 'express';
import routesRouter from '../adapters/inbound/http/routes';
import complianceRouter from '../adapters/inbound/http/compliance';
import bankingRouter from '../adapters/inbound/http/banking';
import poolsRouter from '../adapters/inbound/http/pools';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/routes', routesRouter);
app.use('/compliance', complianceRouter);
app.use('/banking', bankingRouter);
app.use('/pools', poolsRouter);

app.get('/', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listening on ${port}`));
