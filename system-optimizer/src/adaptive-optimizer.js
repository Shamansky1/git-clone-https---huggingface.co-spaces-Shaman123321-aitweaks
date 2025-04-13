const UsageAnalyzer = require('./usage-analyzer');
const WindowsOptimizer = require('./windows-optimizer');

import { getProfileForProcess } from './game-profiles';

class AdaptiveOptimizer {
    constructor() {
        this.usagePatterns = new UsageAnalyzer();
        this.windowsOptimizer = new WindowsOptimizer();
        this.currentGame = null;
    }

    async detectGame() {
        const processes = await this.usagePatterns.getRunningProcesses();
        this.currentGame = getProfileForProcess(processes[0]);
        return this.currentGame;
    }

    async autoTune() {
        await this.detectGame();
        const patterns = await this.usagePatterns.detect();
        let recommendedTweaks = await this._applyAIRecommendedTweaks(patterns);
        
        // Filter tweaks based on game profile
        if (this.currentGame) {
            recommendedTweaks = recommendedTweaks.filter(tweak => 
                this.currentGame.safeTweaks.includes(tweak)
            );
        }

        await this._executeCustomTweaks(recommendedTweaks);
    }

    async _applyAIRecommendedTweaks(patterns) {
        const tweaks = [];
        if (patterns.cpuTrend === 'increasing') {
            tweaks.push('boost_cpu');
        }
        if (patterns.memoryTrend === 'increasing') {
            tweaks.push('clean_memory');
        }
        if (patterns.frequentProcesses.includes('wslhost.exe')) {
            tweaks.push('optimize_wsl');
        }
        if (patterns.gpuUsage > 80) {
            tweaks.push('enable_directstorage');
        }
        return tweaks;
    }

    async _executeCustomTweaks(tweaks) {
        for (const tweak of tweaks) {
            switch (tweak) {
                case 'boost_cpu':
                    await this.windowsOptimizer.setPowerPlan('performance');
                    break;
                case 'clean_memory':
                    await this.windowsOptimizer.disableAnimations();
                    break;
                case 'optimize_wsl':
                    await this.windowsOptimizer.configureWSL2Memory(4); // 4GB limit
                    await this.windowsOptimizer.setWSL2PerformanceMode(true);
                    break;
                case 'enable_directstorage':
                    await this.windowsOptimizer.optimizeDirectStorage(true);
                    break;
                // Add more cases for other tweaks
                default:
                    console.warn(`Unknown tweak: ${tweak}`);
            }
        }
    }
}

module.exports = AdaptiveOptimizer;
