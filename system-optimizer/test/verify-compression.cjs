const compressor = require('../src/data-compression-fixed.cjs');

async function testCompression() {
  console.log('=== Testing Compression Module ===');
  
  const testData = Buffer.from('a'.repeat(10000) + 'b'.repeat(10000)); // More varied test data
  
  try {
    // Test Gzip
    console.log('\nTesting Gzip...');
    const gzipCompressed = await compressor.compress(testData, 'gzip');
    console.log(`Gzip compressed ${testData.length} bytes to ${gzipCompressed.length} bytes`);
    console.log(`Compression ratio: ${(gzipCompressed.length/testData.length*100).toFixed(1)}%`);

    // Test Brotli
    console.log('\nTesting Brotli...');
    const brotliCompressed = await compressor.compress(testData, 'brotli');
    console.log(`Brotli compressed ${testData.length} bytes to ${brotliCompressed.length} bytes`);
    console.log(`Compression ratio: ${(brotliCompressed.length/testData.length*100).toFixed(1)}%`);

    // Benchmark
    console.log('\nRunning Benchmark...');
    const results = await compressor.benchmark(testData);
    console.table(results);

    console.log('\n=== All tests completed successfully ===');
  } catch (err) {
    console.error('\n!!! Compression test failed:', err);
    process.exit(1);
  }
}

testCompression();
