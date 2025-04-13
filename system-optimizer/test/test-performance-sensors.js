import { PerformanceSensors } from '../src/performance-sensors.js';

async function testPerformanceSensors() {
    const sensors = new PerformanceSensors();
    
    try {
        const cpuUsage = await sensors.getCPUUsage();
        console.log('CPU Usage:', cpuUsage);
        
        const gpuStats = await sensors.getGPUStats();
        console.log('GPU Stats:', gpuStats);
        
        const memoryUsage = await sensors.getMemoryUsage();
        console.log('Memory Usage:', memoryUsage);
        
        console.log('All tests passed successfully!');
    } catch (error) {
        console.error('Error testing performance sensors:', error);
    }
}

await testPerformanceSensors();
