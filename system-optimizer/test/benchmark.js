import { runProfileTests } from './test-profiles';
import { performance } from 'perf_hooks';

const ITERATIONS = 100;
const WARMUP_RUNS = 5;

async function runBenchmark() {
    // Warmup
    for (let i = 0; i < WARMUP_RUNS; i++) {
        await runProfileTests();
    }

    // Timed runs
    const times = [];
    for (let i = 0; i < ITERATIONS; i++) {
        const start = performance.now();
        await runProfileTests();
        times.push(performance.now() - start);
    }

    // Calculate statistics
    const avg = times.reduce((a,b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    
    console.log(`
Performance Benchmark Results:
- Iterations: ${ITERATIONS}
- Average: ${avg.toFixed(2)}ms
- Minimum: ${min.toFixed(2)}ms
- Maximum: ${max.toFixed(2)}ms
- Variance: ${(max-min).toFixed(2)}ms
`);
}

runBenchmark();
