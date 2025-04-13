import { PerformanceTracker } from './performance-tracker-enhanced.js';

export class PerformanceDashboard {
    constructor(tracker) {
        this.tracker = tracker;
    }

    display() {
        const metrics = this.tracker.calculateAlgorithmScores();
        console.log('\n=== Compression Performance Dashboard ===');
        console.table(metrics.map(m => ({
            Algorithm: m.algorithm,
            Score: m.score.toFixed(2),
            'Avg Ratio': (m.scoreDetails.ratio * 100).toFixed(1) + '%',
            'Avg Speed': m.scoreDetails.speed.toFixed(2) + ' ops/ms',
            Stability: (m.stability * 100).toFixed(1) + '%'
        })));
        console.log(`Recommended Algorithm: ${this.tracker.getRecommendation()}`);
    }

    generateReport() {
        return {
            timestamp: new Date(),
            metrics: this.tracker.metrics,
            recommendation: this.tracker.getRecommendation(),
            systemInfo: {
                nodeVersion: process.version,
                platform: process.platform
            }
        };
    }
}
        console.table(metrics);
        console.log(`Recommended Algorithm: ${this.tracker.recommendAlgorithm()}`);
    }

    generateReport() {
        return {
            timestamp: new Date(),
            metrics: this.tracker.metrics,
            recommendation: this.tracker.recommendAlgorithm()
        };
    }
}
