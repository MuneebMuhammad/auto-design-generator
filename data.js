const fs = require('fs').promises;

async function readData() {
  try {
    const data = await fs.readFile('../../data.json', 'utf8');
    const dataObject = await JSON.parse(data);
    // Use dataObject here
    return dataObject
  } catch (err) {
    console.error(err);
  }
}

let myValues = readData();
console.log("values:", myValues)