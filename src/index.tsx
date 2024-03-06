import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';

import footballers from './footballers';
import Layout from './views/home';
import Graph from './views/graph';
import { supabase } from './db';

const app = new Hono();

app.use('/static/*', serveStatic({ root: './public' }));

app.route('/footballers', footballers);
app.get('/api/v1/footballers/seasons', async (c) => {
  const { data, error } = await supabase
    .from('season_2010')
    .select()
    .gt('g', 0);

  if (error) {
    console.log(error);
    return c.json({
      error: 'you don goofed',
    });
  }

  return c.html(<Graph data={data} />);
});

app.get('/', (c) => c.html(<Layout />));

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({ fetch: app.fetch, port });
