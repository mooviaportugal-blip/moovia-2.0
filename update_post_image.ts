
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXTERNAL_SUPABASE_URL!,
  process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY!
);

async function updatePost() {
  const publicUrl = "https://eueddvtfjdhmqudnpzcz.supabase.co/storage/v1/object/public/blog-images/blog-strategy-vs-success-1784852775222.png";
  const postId = "ad8651ca-b7f6-42c4-bdfc-212cb35c9fd0";
  
  const { error } = await supabase
    .from('posts')
    .update({ 
      image_url: publicUrl
    })
    .eq('id', postId);

  if (error) throw error;

  console.log("Post image updated successfully!");
}

updatePost();
