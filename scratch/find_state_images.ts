const states = [
  "Andhra Pradesh",
  "Daman & Diu",
  "Bihar",
  "Madhya Pradesh",
  "Karnataka",
  "Puducherry",
  "Odisha",
  "Arunachal Pradesh",
  "Assam",
  "Tripura",
  "Sikkim",
  "Telangana"
];

const results: Record<string, string> = {};

for (const state of states) {
  // Search query on Unsplash NAPI
  const query = encodeURIComponent(`${state} tourism monument landmark`);
  const searchUrl = `https://unsplash.com/napi/search/photos?query=${query}&per_page=5`;
  
  try {
    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36"
      }
    });
    
    if (!response.ok) {
      console.log(`[SEARCH FAILED] ${state}: HTTP ${response.status}`);
      continue;
    }
    
    const data = await response.json();
    const photos = data.results || [];
    
    if (photos.length === 0) {
      console.log(`[NO PHOTOS] ${state}`);
      continue;
    }
    
    // Pick the first photo that works
    let found = false;
    for (const photo of photos) {
      const url = photo.urls.regular;
      // Test URL
      const testRes = await fetch(url, { method: "HEAD" });
      if (testRes.status === 200) {
        // Strip out tracking/excess params except width and format
        const cleanUrl = url.split("?")[0] + "?auto=format&fit=crop&w=1000&q=80";
        results[state] = cleanUrl;
        console.log(`[FOUND] ${state}: ${cleanUrl}`);
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log(`[TEST FAILED] ${state}: None of the searched images worked`);
    }
    
  } catch (err: any) {
    console.log(`[ERROR] ${state}: ${err.message}`);
  }
  
  // Sleep a little to avoid rate limiting
  await new Promise(r => setTimeout(r, 1000));
}

console.log("\n--- RESULT DICTIONARY ---");
console.log(JSON.stringify(results, null, 2));
