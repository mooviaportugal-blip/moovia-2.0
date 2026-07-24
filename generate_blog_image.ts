
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXTERNAL_SUPABASE_URL!,
  process.env.EXTERNAL_SUPABASE_SERVICE_ROLE_KEY!
);

async function generateAndUpload() {
  const prompt = "Editorial photography, high-end corporate office in Lisbon with view of the Tejo river. A crystal-clear glass board showing a complex strategic diagram labeled 'GLOBAL MOBILITY STRATEGY' evolving into a bright, successful outcome labeled 'GLOBAL MOBILITY SUCCESS'. Professional atmosphere, premium aesthetics, soft natural light, gold and navy blue color palette. 8k resolution, cinematic lighting.";
  
  console.log("Generating image with prompt:", prompt);
  
  const response = await fetch('https://ai.gateway.lovable.dev/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Lovable-API-Key': process.env.LOVABLE_API_KEY!
    },
    body: JSON.stringify({
      model: "google/gemini-3.1-flash-image",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url"
    })
  });

  const result = await response.json();
  console.log("Raw API response:", JSON.stringify(result, null, 2));
  
  if (result.status && result.status !== 200) {
     throw new Error(`API Error: ${result.message || JSON.stringify(result)}`);
  }

  if (!result.data || !result.data[0]) {
    throw new Error("No image data in response");
  }

  const imageUrl = result.data[0].url;
  console.log("Image generated:", imageUrl);

  const imgRes = await fetch(imageUrl);
  const buffer = await imgRes.arrayBuffer();

  const fileName = `blog-strategy-vs-success-${Date.now()}.png`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(fileName, buffer, {
      contentType: 'image/png'
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(fileName);

  console.log("Public URL:", publicUrl);

  const postId = "ad8651ca-b7f6-42c4-bdfc-212cb35c9fd0";
  const { error: updateError } = await supabase
    .from('posts')
    .update({ 
      image_url: publicUrl,
      image_alt: "Infográfico estratégico comparando Global Mobility Strategy e Global Mobility Success em um escritório premium em Lisboa."
    })
    .eq('id', postId);

  if (updateError) throw updateError;

  console.log("Post updated successfully!");
}

generateAndUpload().catch(err => {
  console.error(err);
  process.exit(1);
});
