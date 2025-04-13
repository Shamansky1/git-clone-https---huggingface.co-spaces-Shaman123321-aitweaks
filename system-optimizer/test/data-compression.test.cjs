const assert = require('assert');
const compressor = require('../src/data-compression.cjs');

describe('Data Compression', () => {
  const testData = Buffer.from('a'.repeat(10000));

  it('should compress with gzip', async () => {
    const compressed = await compressor.compress(testData, 'gzip');
    assert(compressed.length < testData.length);
    console.log(`Gzip: ${compressed.length}/${testData.length} bytes`);
  });

  it('should compress with brotli', async () => {
    const compressed = await compressor.compress(testData, 'brotli');
    assert(compressed.length < testData.length);
    console.log(`Brotli: ${compressed.length}/${testData.length} bytes`);
  });

  it('should benchmark algorithms', async () => {
    const results = await compressor.benchmark(testData);
    console.table(results);
    assert(Object.keys(results).length === 3);
  });
});
