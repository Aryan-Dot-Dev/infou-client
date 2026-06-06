const images: Record<string, string> = {
  "Jammu & Kashmir": "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=1000&q=80",
  "Gujarat": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80",
  "Tamil Nadu": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
  "Andaman & Nicobar Island": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1000&q=80",
  "Andhra Pradesh": "https://images.unsplash.com/photo-1608958416717-e244c9b327b8?auto=format&fit=crop&w=1000&q=80",
  "Daman & Diu": "https://images.unsplash.com/photo-1590050752117-238cb061295a?auto=format&fit=crop&w=1000&q=80",
  "Bihar": "https://images.unsplash.com/photo-1622322079075-817a1236894c?auto=format&fit=crop&w=1000&q=80",
  "Lakshadweep": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80",
  "Madhya Pradesh": "https://images.unsplash.com/photo-1638814175187-b7fbc1a1e46e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Karnataka": "https://images.unsplash.com/photo-1600100397990-a4a840b14f70?auto=format&fit=crop&w=1000&q=80",
  "Puducherry": "https://images.unsplash.com/photo-1581362072978-1499561652d8?auto=format&fit=crop&w=1000&q=80",
  "Uttar Pradesh": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
  "West Bengal": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=80",
  "Odisha": "https://images.unsplash.com/photo-1608958220963-f22204c35f22?auto=format&fit=crop&w=1000&q=80",
  "Chandigarh": "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=1000&q=80",
  "Haryana": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
  "Himachal Pradesh": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
  "Arunachal Pradesh": "https://images.unsplash.com/photo-1609137144813-fdfdfdf9de1a?auto=format&fit=crop&w=1000&q=80",
  "Nagaland": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  "Kerala": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80",
  "Punjab": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80",
  "Assam": "https://images.unsplash.com/photo-1598977123418-45f04b01f4ac?auto=format&fit=crop&w=1000&q=80",
  "Tripura": "https://images.unsplash.com/photo-1626269478330-0081d09e3e3b?auto=format&fit=crop&w=1000&q=80",
  "Dadara & Nagar Havelli": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
  "Goa": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
  "Ladakh": "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1000&q=80",
  "Chhattisgarh": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
  "Maharashtra": "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1000&q=80",
  "Manipur": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
  "Meghalaya": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
  "Mizoram": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80",
  "Rajasthan": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
  "Sikkim": "https://images.unsplash.com/photo-1589714343121-8022a9ec2a53?auto=format&fit=crop&w=1000&q=80",
  "Uttarakhand": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
  "Jharkhand": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1000&q=80",
  "NCT of Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80",
  "Telangana": "https://images.unsplash.com/photo-1572445242564-878772a14f3a?auto=format&fit=crop&w=1000&q=80"
};

for (const [state, url] of Object.entries(images)) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.status !== 200) {
      console.log(`[FAILED] ${state}: Status ${res.status}`);
    } else {
      console.log(`[OK] ${state}`);
    }
  } catch (err: any) {
    console.log(`[ERROR] ${state}: ${err.message}`);
  }
}
