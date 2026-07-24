
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXTERNAL_SUPABASE_URL!,
  process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY!
);

async function generateAndUpload() {
  const prompt = "Editorial photography, high-end corporate office in Lisbon with view of the Tejo river. A crystal-clear glass board showing a complex strategic diagram labeled 'GLOBAL MOBILITY STRATEGY' evolving into a bright, successful outcome labeled 'GLOBAL MOBILITY SUCCESS'. Professional atmosphere, premium aesthetics, soft natural light, gold and navy blue color palette. 8k resolution, cinematic lighting.";
  
  console.log("Generating image with prompt:", prompt);
  
  // Note: Since I don't have a direct tool to generate an image to a file in one go here, 
  // I will use the AI Gateway via fetch to generate an image.
  // Actually, I'll use the 'ai_gateway--enable' then fetch.
  
  const response = await fetch('https://ai.gateway.lovable.dev/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LOVABLE_API_KEY}`
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url"
    })
  });

  const result = await response.json();
  if (result.error) {
    throw new Error(JSON.stringify(result.error));
  }

  const imageUrl = result.data[0].url;
  console.log("Image generated:", imageUrl);

  // Download image
  const imgRes = await fetch(imageUrl);
  const buffer = await imgRes.arrayBuffer();

  const fileName = `blog-strategy-vs-success-${Date.now()}.png`;
  const filePath = `blog-images/${fileName}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(fileName, buffer, {
      contentType: 'image/png'
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);

  console.log("Public URL:", publicUrl);

  // Update post
  const postId = "ad8651ca-b7f6-42c4-bdfc-212cb35c9fd0";
  const { error: updateError } = await supabase
    .from('posts')
    .update({ 
      image_url: publicUrl,
      image_alt: "Infográfico estratégico comparando Global Mobility Strategy e Global Mobility Success em um escritório premium em Lisboa."
    })
    .eq('id', postId);

  if (updateError) {
    throw updateError;
  }

  console.log("Post updated successfully!");
}

generateAndUpload().catch(err => {
  console.error(err);
  process.exit(1);
});
