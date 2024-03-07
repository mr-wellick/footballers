import { Hono } from 'hono';
import { supabase } from '../db';
import Graph from '../views/graph';

const app = new Hono();

app.post('/footballers', async (c) => {
  const body = (await c.req.text()).split('=')[1];
  const { data, error } = await supabase
    .from(body)
    .select()
    .gt('g', 0);

  if (error) {
    return c.html('You don goofed');
  }

  return c.html(<Graph data={data} />);
});

export default app;
