const candidates = [
  "https://images.unsplash.com/x6wZ6s1V6oM?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1610123594191?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1608958220963?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1621841315899?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1588681664899?auto=format&fit=crop&w=1000&q=80"
];

for (const url of candidates) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    console.log(`URL: ${url} | Status: ${res.status}`);
  } catch (err: any) {
    console.log(`URL: ${url} | Error: ${err.message}`);
  }
}



