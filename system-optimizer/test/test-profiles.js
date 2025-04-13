import { getProfileForProcess } from '../src/game-profiles';

const TEST_CASES = [
    {
        process: 'FortniteClient-Win64-Shipping.exe',
        expected: 'FORTNITE',
        minTweaks: 3
    },
    {
        process: 'VALORANT-Win64-Shipping.exe',
        expected: 'VALORANT',
        minTweaks: 3
    },
    {
        process: 'hl.exe',
        expected: 'CS16',
        minTweaks: 2
    },
    {
        process: 'MarvelRivals.exe',
        expected: 'MARVEL_RIVALS',
        minTweaks: 4
    }
];

function runProfileTests() {
    let passed = 0;
    
    TEST_CASES.forEach(test => {
        const profile = getProfileForProcess(test.process);
        if (profile?.id === test.expected.toLowerCase() && 
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
