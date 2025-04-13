import si from 'systeminformation';

export class PerformanceSensors {
    async getCPUUsage() {
        const cpu = await si.currentLoad();
        return {
            load: cpu.currentLoad,
            temp: await si.cpuTemperature()
        };
    }

    async getGPUStats() {
        try {
            const gpu = await si.graphics();
            return gpu.controllers[0] || {};
        } catch (e) {
            return { error: 'GPU data unavailable' };
        }
    }

    async getMemoryUsage() {
        const mem = await si.mem();
        return {
            used: mem.used,
            total: mem.total,
            active: mem.active
        };
    }
}
