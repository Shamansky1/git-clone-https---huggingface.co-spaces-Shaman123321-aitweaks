import { getProfileForProcess, getAllSafeTweaks } from '../src/game-profiles-new.js';

const TEST_CASES = [
    {
        process: 'FortniteClient-Win64-Shipping.exe',
        expected: 'fortnite',
        minTweaks: 3
    },
    {
        process: 'VALORANT-Win64-Shipping.exe',
        expected: 'valorant',
        minTweaks: 3
    },
    {
        process: 'hl.exe',
        expected: 'cs16',
        minTweaks: 2
    },
    {
        process: 'MarvelRivals.exe',
        expected: 'marvel_rivals',
        minTweaks: 4
    }
];

function runProfileTests() {
    let passed = 0;
    
    TEST_CASES.forEach(test => {
        const profile = getProfileForProcess(test.process);
        if (profile?.id === test.expected && 
            profile.safeTweaks.length >= test.minTweaks) {
            passed++;
            console.log(`✓ ${test.process}`);
        } else {
            console.error(`✗ ${test.process}`);
        }
    });

    console.log(`\nResults: ${passed}/${TEST_CASES.length} passed`);
    return passed === TEST_CASES.length;
}

function calculateCoverage() {
    const allTweaks = new Set(getAllSafeTweaks());
    const testedTweaks = new Set();
    
    TEST_CASES.forEach(test => {
        const profile = getProfileForProcess(test.process);
        if (profile) {
            profile.safeTweaks.forEach(tweak => testedTweaks.add(tweak));
        }
    });

    return {
        coveragePercent: Math.round((testedTweaks.size / allTweaks.size) * 100),
        untestedTweaks: [...allTweaks].filter(t => !testedTweaks.has(t))
    };
}

export { runProfileTests, calculateCoverage };
