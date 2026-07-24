import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXTERNAL_SUPABASE_URL!,
  process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY!
);

async function checkColumns() {
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'posts' });
  
  if (error) {
    // If RPC doesn't exist, try a simple query to see what we get
    const { data: sample, error: queryError } = await supabase.from('posts').select('*').limit(1);
    if (queryError) {
      console.error('Error fetching sample:', queryError);
    } else {
      console.log('Available columns:', Object.keys(sample[0] || {}));
    }
  } else {
    console.log('Columns:', data);
  }
}

checkColumns();
