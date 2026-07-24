
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
      response_format: "b64_json"
    })
  });

  const result = await response.json();
  console.log("Response keys:", Object.keys(result));
  
  if (result.status && result.status !== 200) {
     throw new Error(`API Error: ${result.message || JSON.stringify(result)}`);
  }

  // The gpt-image-2 returned an object with 'data' containing b64_json
  // But Gemini might return it differently or I might have hit a gateway limit/model issue.
  // Checking exact structure from the last "Raw API response" in logs which showed "data" was an array but with b64_json.
  
  if (!result.data || !result.data[0]) {
    console.log("Full Result:", JSON.stringify(result, null, 2));
    throw new Error("No data in response");
  }

  const imageData = result.data[0];
  const b64Data = imageData.b64_json || imageData.url; // fallback if it ignored format

  if (!b64Data) {
    throw new Error("No b64_json or url in result data");
  }

  let buffer: Buffer;
  if (b64Data.startsWith('http')) {
     const imgRes = await fetch(b64Data);
     buffer = Buffer.from(await imgRes.arrayBuffer());
  } else {
     buffer = Buffer.from(b64Data, 'base64');
  }

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
