const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class WindowsOptimizer {
    constructor() {
        this.originalSettings = {};
        this.optimizationHistory = [];
    }

    async optimizeSystem() {
        try {
            console.log("Starting Windows optimization...");
            
            // Backup current settings
            this.originalSettings.powerPlan = await this.getCurrentPowerPlan();
            this.originalSettings.services = await this.getServiceStates();
            this.originalSettings.network = await this.getNetworkSettings();

            // Run optimizations
            const results = {
                services: await this.disableNonEssentialServices(),
                powerPlan: await this.setHighPerformancePowerPlan(),
                network: await this.optimizeNetworkSettings(),
                timestamp: new Date().toISOString()
            };

            this.optimizationHistory.push(results);
            return results;

        } catch (error) {
            console.error("Optimization failed:", error);
            throw error;
        }
    }

    async getCurrentPowerPlan() {
        try {
            const { stdout } = await execPromise('powercfg /getactivescheme');
            return stdout.trim();
        } catch (err) {
            return { error: err.message };
        }
    }

    async getServiceStates() {
        const services = ['DiagTrack', 'dmwappushservice', 'lfsvc', 'MapsBroker'];
        const states = [];
        
        for (const svc of services) {
            try {
                const { stdout } = await execPromise(`sc query "${svc}"`);
                states.push({ 
                    service: svc,
                    state: stdout.includes('RUNNING') ? 'running' : 'stopped'
                });
            } catch (err) {
                states.push({ service: svc, error: err.message });
            }
        }
        return states;
    }

    async getNetworkSettings() {
        try {
            const { stdout } = await execPromise('netsh int tcp show global');
            return stdout;
        } catch (err) {
            return { error: err.message };
        }
    }

    async disableNonEssentialServices() {
        const services = ['DiagTrack', 'dmwappushservice', 'lfsvc', 'MapsBroker'];
        const results = [];
        
        for (const svc of services) {
            try {
                await execPromise(`sc config "${svc}" start= disabled`);
                await execPromise(`sc stop "${svc}"`);
                results.push({ service: svc, status: "disabled" });
            } catch (err) {
                results.push({ service: svc, status: "failed", error: err.message });
            }
        }
        return results;
    }

    async setHighPerformancePowerPlan() {
        try {
            await execPromise('powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c');
            return { status: "success" };
        } catch (err) {
            return { status: "failed", error: err.message };
        }
    }

    async optimizeNetworkSettings() {
        try {
            await execPromise('netsh int tcp set global autotuninglevel=restricted');
            await execPromise('netsh interface tcp set global rss=enabled');
            return { status: "success" };
        } catch (err) {
            return { status: "failed", error: err.message };
        }
    }

    async restoreOriginalSettings() {
        try {
            // Restore power plan
            if (this.originalSettings.powerPlan && !this.originalSettings.powerPlan.error) {
                await execPromise(`powercfg /setactive ${this.originalSettings.powerPlan.split(':')[1].trim()}`);
            }

            // Restore services
            for (const svc of this.originalSettings.services) {
                if (svc.state === 'running') {
                    await execPromise(`sc config "${svc.service}" start= auto`);
                    await execPromise(`sc start "${svc.service}"`);
                }
            }

            return { status: "success", message: "Original settings restored" };
        } catch (error) {
            return { status: "failed", error: error.message };
        }
    }
}

module.exports = new WindowsOptimizer();