import { PerformanceTracker } from '../src/performance-tracker.js';

describe('Performance Tracker Tests', () => {
    let tracker;

    beforeEach(() => {
        tracker = new PerformanceTracker();
    });

    test('should correctly record metrics', () => {
        tracker.record('lz', 50, 1000, 400);
        tracker.record('gzip', 80, 1000, 300);
        
        const lzMetrics = tracker.getAverageMetrics('lz');
        expect(lzMetrics.time).toBe(50);
        expect(lzMetrics.ratio).toBe(600);
    });

    test('should provide intelligent recommendations', () => {
        for (let i = 0; i < 100; i++) {
            tracker.record('lz', 20 + Math.random()*10, 1000, 400);
            tracker.record('gzip', 80 + Math.random()*20, 1000, 300);
            tracker.record('brotli', 120 + Math.random()*30, 1000, 250);
        }

        const recommendation = tracker.recommendAlgorithm();
        expect(['gzip', 'brotli']).toContain(recommendation);
    });
});
