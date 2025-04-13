const compressor = require('./data-compression-fixed.cjs');
const collector = require('./performance-collector.cjs');

class AdaptiveCompressor {
  constructor() {
    this.strategies = {
      'speed': 'gzip',
      'balance': 'brotli', 
      'size': 'lz'
    };
  }

  async compress(data, mode = 'balance') {
    const strategy = this.strategies[mode] || this.strategies.balance;
    
    // Track performance
    const start = Date.now();
    const result = await compressor.compress(data, strategy);
    const duration = Date.now() - start;
    
    // Update analytics
    collector.trackCompression(data);
    
    return {
      algorithm: strategy,
      data: result,
      duration: duration
    };
  }

  async autoCompress(data) {
    // Get system conditions
    const metrics = collector.getMetrics();
    
    // Simple auto-selection logic
    if (metrics.system.memoryUsage > 0.8) {
      return this.compress(data, 'speed');
    } else if (metrics.compression.gzip.ratio < 0.5) {
      return this.compress(data, 'size');
    } else {
      return this.compress(data, 'balance');
    }
  }
}

module.exports = new AdaptiveCompressor();
