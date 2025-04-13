const zlib = require('zlib');
const lzString = require('lz-string');

class DataCompressor {
  constructor() {
    this.algorithms = {
      gzip: this.compressGzip,
      brotli: this.compressBrotli,
      lz: this.compressLZ
    };
  }

  async compress(data, algorithm = 'gzip') {
    if (!this.algorithms[algorithm]) {
      throw new Error(`Unsupported algorithm: ${algorithm}`);
    }
    return this.algorithms[algorithm](data);
  }

  async compressGzip(data) {
    return new Promise((resolve, reject) => {
      zlib.gzip(data, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  async compressBrotli(data) {
    return new Promise((resolve, reject) => {
      zlib.brotliCompress(data, { 
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      }, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  async compressLZ(data) {
    try {
      return lzString.compressToUint8Array(data);
    } catch (err) {
      throw new Error(`LZ compression failed: ${err.message}`);
    }
  }

  async benchmark(data) {
    const results = {};
    for (const [name, fn] of Object.entries(this.algorithms)) {
      const start = process.hrtime.bigint();
      const compressed = await fn(data);
      const end = process.hrtime.bigint();
      
      results[name] = {
        size: compressed.length,
        ratio: compressed.length / data.length,
        time: Number(end - start) / 1e6 // ms
      };
    }
    return results;
  }
}

module.exports = new DataCompressor();
