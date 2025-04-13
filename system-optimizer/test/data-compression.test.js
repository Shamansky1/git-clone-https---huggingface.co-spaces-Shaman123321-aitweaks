const assert = require('assert');
const compressor = require('../src/data-compression');

describe('Data Compression', () => {
  const testData = Buffer.from('a'.repeat(10000)); // 10KB test data

  it('should compress with gzip', async () => {
    const compressed = await compressor.compress(testData, 'gzip');
    assert(compressed.length < testData.length);
    console.log(`Gzip compression: ${compressed.length/testData.length*100}% of original`);
  });

  it('should compress with brotli', async () => {
    const compressed = await compressor.compress(testData, 'brotli');
    assert(compressed.length < testData.length);
    console.log(`Brotli compression: ${compressed.length/testData.length*100}% of original`);
  });

  it('should benchmark all algorithms', async () => {
    const results = await compressor.benchmark(testData);
    assert(Object.keys(results).length === 3);
    console.table(results);
  });

  it('should throw on invalid algorithm', async () => {
    try {
      await compressor.compress(testData, 'invalid');
      assert.fail('Should have thrown error');
    } catch (err) {
      assert(err.message.includes('Unsupported algorithm'));
    }
  });
});
