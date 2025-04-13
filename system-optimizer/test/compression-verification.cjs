const compressor = require('../src/data-compression.cjs');

async function verifyCompression() {
  console.log('Running compression verification...');
  
  const testData = Buffer.from('a'.repeat(10000));
  
  try {
    // Test Gzip
    const gzipResult = await compressor.compress(testData, 'gzip');
    console.log('Gzip:');
    console.log(`  Original: ${testData.length} bytes`);
    console.log(`  Compressed: ${gzipResult.length} bytes`);
    console.log(`  Ratio: ${(gzipResult.length/testData.length*100).toFixed(1)}%`);

    // Test Brotli
    const brotliResult = await compressor.compress(testData, 'brotli');
    console.log('\nBrotli:');
    console.log(`  Original: ${testData.length} bytes`);
    console.log(`  Compressed: ${brotliResult.length} bytes`);
    console.log(`  Ratio: ${(brotliResult.length/testData.length*100).toFixed(1)}%`);

    // Benchmark
    console.log('\nRunning benchmark...');
    const results = await compressor.benchmark(testData);
    console.log('\nBenchmark Results:');
    console.table(results);

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

verifyCompression();
