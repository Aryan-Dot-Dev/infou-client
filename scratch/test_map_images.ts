import fs from "fs";
import path from "path";

// Read LandingPage.tsx
const filePath = path.join(__dirname, "../src/components/LandingPage.tsx");
const content = fs.readFileSync(filePath, "utf-8");

// Extract the images dictionary
const match = content.match(/const images: Record<string, string> = {([\s\S]*?)};/);
if (!match || !match[1]) {
  console.error("Could not find images dictionary in LandingPage.tsx");
  process.exit(1);
}

const lines = match[1].split("\n");
const images: Record<string, string> = {};

for (const line of lines) {
  const lineMatch = line.match(/"([^"]+)":\s*"([^"]+)"/);
  if (lineMatch && lineMatch[1] && lineMatch[2]) {
    images[lineMatch[1]] = lineMatch[2];
  }
}

console.log(`Extracted ${Object.keys(images).length} state images from LandingPage.tsx`);

let allOk = true;
for (const [state, url] of Object.entries(images)) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.status !== 200) {
      console.log(`[FAILED] ${state}: Status ${res.status} | URL: ${url}`);
      allOk = false;
    } else {
      console.log(`[OK] ${state}`);
    }
  } catch (err: any) {
    console.log(`[ERROR] ${state}: ${err.message}`);
    allOk = false;
  }
}

if (allOk) {
  console.log("\nALL STATE IMAGES ARE LOADED SUCCESSFULLY (200 OK)!");
} else {
  console.log("\nSOME STATE IMAGES FAILED!");
  process.exit(1);
}
