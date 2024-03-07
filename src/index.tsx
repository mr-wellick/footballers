import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { html } from 'hono/html';
import Layout from './views/home';
import footballers from './services/footballers';
import seasons from './services/seasons';

const app = new Hono();

app.route('/api/v1', seasons);
app.route('/api/v1', footballers);

app.get('/', (c) => c.html(html`<!doctype html>${(<Layout />)}`));

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
