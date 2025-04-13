#!/usr/bin/env node
import { runProfileTests, calculateCoverage } from '../test/test-profiles-new.js';

console.log('Running game profile tests...');
const testsPassed = runProfileTests();

console.log('\nCalculating test coverage...');
const coverage = calculateCoverage();
console.log(`Coverage: ${coverage.coveragePercent}%`);
console.log('Untested tweaks:', coverage.untestedTweaks);

process.exit(testsPassed ? 0 : 1);
