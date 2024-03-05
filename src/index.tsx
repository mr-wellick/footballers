import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import footballers from './footballers';
import Layout from './views/home';
import Graph from './views/graph';

const app = new Hono();

app.route('/footballers', footballers);
app.get('/api/v1/footballers/seasons', (c) =>
  c.json({
    data: [
      {
        table_name: 2010,
      },
    ],
  }),
);
app.get('/', (c) => c.html(<Layout />));

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
