const candidates: Record<string, string[]> = {
  "Andhra Pradesh": [
    "https://images.unsplash.com/photo-1621841315899-02ee854edd19?auto=format&fit=crop&w=1000&q=80", // Temple architecture
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80", // Coastline
    "https://images.unsplash.com/photo-1588681664899-f142e2b3040f?auto=format&fit=crop&w=1000&q=80", // Temple
    "https://images.unsplash.com/photo-1590050752117-238cb061295a?auto=format&fit=crop&w=1000&q=80", // Fort
  ],
  "Daman & Diu": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", // Beach sunset
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80", // Beach/Sea
  ],
  "Bihar": [
    "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&w=1000&q=80", // Buddha Statue
    "https://images.unsplash.com/photo-1609137144813-fdfdfdf9de1a?auto=format&fit=crop&w=1000&q=80", // Temple
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80", // Root bridge/forest
  ],
  "Madhya Pradesh": [
    "https://images.unsplash.com/photo-1638814175187-b7fbc1a1e46e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1000&q=80", // Sanchi Stupa
    "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=1000&q=80", // Fort
  ],
  "Karnataka": [
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=80", // Hampi sunset chariot
    "https://images.unsplash.com/photo-1600100397990-a4a840b14f70?auto=format&fit=crop&w=1000&q=80", // Hampi
  ],
  "Puducherry": [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", // Sunset beach
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80", // Scenic window/French quarter look
  ],
  "Odisha": [
    "https://images.unsplash.com/photo-1621841315899-02ee854edd19?auto=format&fit=crop&w=1000&q=80", // Temple sculpture
    "https://images.unsplash.com/photo-1588681664899-f142e2b3040f?auto=format&fit=crop&w=1000&q=80", // Temple
  ],
  "Arunachal Pradesh": [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80", // Himalayan-style valley/lake
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80", // Himalayan snow mountains
  ],
  "Assam": [
    "https://images.unsplash.com/photo-1554160112-93d72e9d8ecf?auto=format&fit=crop&w=1000&q=80", // Tea garden fields
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80", // Green landscape fields
  ],
  "Tripura": [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80", // Water landscape
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80", // River/Forest
  ],
  "Sikkim": [
    "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1000&q=80", // Pangong/Himalayan lake
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80", // Mountains
  ],
  "Telangana": [
    "https://images.unsplash.com/photo-1626125345510-4603468eedfb?auto=format&fit=crop&w=1000&q=80", // Charminar monument
    "https://images.unsplash.com/photo-1572445242564-878772a14f3a?auto=format&fit=crop&w=1000&q=80", // Charminar
  ]
};

const working: Record<string, string> = {};

for (const [state, urls] of Object.entries(candidates)) {
  let found = false;
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.status === 200) {
        working[state] = url;
        console.log(`[OK] ${state}: ${url}`);
        found = true;
        break;
      } else {
        console.log(`[FAILED] ${state} candidate status: ${res.status}`);
      }
    } catch (err: any) {
      console.log(`[ERROR] ${state} candidate error: ${err.message}`);
    }
  }
  if (!found) {
    console.log(`[NO WORKING CANDIDATES] ${state}`);
  }
}

console.log("\n--- WORKING DICTIONARY ---");
console.log(JSON.stringify(working, null, 2));
