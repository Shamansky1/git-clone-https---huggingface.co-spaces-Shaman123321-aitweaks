const path = require('path');
const fs = require('fs');
const adapter = require('../src/adaptive-compression.cjs');

async function testRealWorldData() {
  // Test with different file types
  const testFiles = [
    'assets/sample-text.txt',
    'assets/sample-json.json',
    'assets/sample-binary.data'
  ];

  for (const filePath of testFiles) {
    try {
      const fullPath = path.join(__dirname, '..', filePath);
      const data = fs.readFileSync(fullPath);
      
      console.log(`\nTesting ${path.basename(filePath)} (${data.length} bytes)`);
      
      // Test adaptive compression
      const result = await adapter.autoCompress(data);
      console.log(`  Algorithm: ${result.algorithm}`);
      console.log(`  Compressed to: ${result.data.length} bytes`);
      console.log(`  Compression ratio: ${(result.data.length/data.length*100).toFixed(1)}%`);
      console.log(`  Processing time: ${result.duration}ms`);
      
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
    }
  }
}

testRealWorldData();
