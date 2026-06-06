import indiaStatesData from "../src/data/india_states_compressed.json";
const names = indiaStatesData.features.map(f => f.properties.name);
console.log(JSON.stringify(names));
