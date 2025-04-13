const compressor = require('./data-compression-fixed.cjs');
const { performance } = require('perf_hooks');

class PerformanceCollector {
  constructor() {
    this.metrics = {
      compression: {},
      system: {},
      lastUpdated: null
    };
  }

  async trackCompression(data) {
    const start = performance.now();
    this.metrics.compression = await compressor.benchmark(data);
    this.metrics.compression.analysisTime = performance.now() - start;
    this.metrics.lastUpdated = new Date().toISOString();
    return this.metrics;
  }

  getMetrics() {
    return this.metrics;
  }
}

module.exports = new PerformanceCollector();
