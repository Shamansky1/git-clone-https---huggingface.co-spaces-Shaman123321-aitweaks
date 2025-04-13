import { DataCollector } from '../src/data-collector.js';

async function runTests() {
  console.log('Running Data Compression Tests...');
  
  const collector = new DataCollector();
  
  // Test 1: Compression ratio
  const sample = await collector.collectSample();
  const originalSize = JSON.stringify(sample.raw).length;
  const compressedSize = sample.compressed.lz.length;
  
  console.assert(
    compressedSize < originalSize,
    'Compression should reduce size'
  );
  
  // Test 2: Error handling
  const badData = { circularRef: {} };
  badData.circularRef.circularRef = badData;
  const result = collector.compressData(badData);
  
  console.assert(
    result.raw && !result.compressed,
    'Should handle errors gracefully'
  );
  
  console.log('All tests passed!');
}

runTests().catch(console.error);
