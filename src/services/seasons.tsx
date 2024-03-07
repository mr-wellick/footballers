import { Hono } from 'hono';
import { supabase } from '../db';
import Seasons from '../views/seasons';

const app = new Hono();

app.get('/seasons', async (c) => {
  const { data, error } = await supabase.rpc('get_all_tables');

  if (error) {
    return c.html('You don goofed');
  }

  return c.html(<Seasons data={data} />);
});

export default app;
