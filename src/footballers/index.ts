import { Hono } from 'hono';

const app = new Hono();

app.get('/season', (c) => c.json('list data for season'));

export default app;
