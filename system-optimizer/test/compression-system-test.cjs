const path = require('path');
const fs = require('fs');
const adapter = require('../src/adaptive-compression.cjs');
const collector = require('../src/performance-collector.cjs');

// Initialize system metrics
collector.metrics = {
  system: {
    memoryUsage: 0.4,
    cpuLoad: 0.3
  },
  compression: {}
};

async function runSystemTest() {
  const testFiles = [
    'assets/sample-text.txt',
    'assets/sample-json.json',
    'assets/sample-binary.data'
  ];

  for (const file of testFiles) {
    try {
      const filePath = path.join(__dirname, '..', file);
      const data = fs.readFileSync(filePath);
      
      console.log(`\nTesting ${file} (${data.length} bytes)`);
      
      // Get compression results
      const result = await adapter.autoCompress(data);
      const metrics = collector.getMetrics();
      
      console.log(`Algorithm: ${result.algorithm}`);
      console.log(`Compressed: ${result.data.length} bytes (${(result.data.length/data.length*100).toFixed(1)}%)`);
      console.log(`Time: ${result.duration}ms`);
      console.log('Metrics:', metrics.compression);

    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message);
    }
  }
}

runSystemTest();
