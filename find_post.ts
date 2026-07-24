import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXTERNAL_SUPABASE_URL!,
  process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY!
);

async function findPost() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, slug, title')
    .ilike('title', '%Global Mobility Strategy%')
    .single();

  if (error) {
    console.error('Error finding post:', error);
    process.exit(1);
  }

  console.log(JSON.stringify(data));
}

findPost();
