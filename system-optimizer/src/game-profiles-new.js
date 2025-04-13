const GAME_PROFILES = {
    FORTNITE: {
        id: 'fortnite',
        executable: 'FortniteClient-Win64-Shipping.exe',
        safeTweaks: [
            'directstorage',
            'lumen_override',
            'nanite_boost'
        ],
        dangerZones: [
            '0x45A000-0x46A000'
        ],
        defaultSettings: {
            textureStreaming: 'aggressive',
            shadowQuality: 'high'
        },
        audioProfile: 'fps',
        footstepBoost: true
    },
    VALORANT: {
        id: 'valorant',
        executable: 'VALORANT-Win64-Shipping.exe',
        safeTweaks: [
            'mouse_polling',
            'network_optimize',
            'vanguard_tune'
        ],
        memoryRanges: [
            '0x1F000000-0x1FFFFFFF'
        ],
        audioProfile: 'footsteps',
        footstepBoost: true
    },
    CS16: {
        id: 'cs16',
        executable: 'hl.exe',
        safeTweaks: [
            'opengl_32',
            'mouse_fix',
            'netcode_update'
        ],
        enginePatches: [
            '0x45F3A2'
        ]
    },
    MARVEL_RIVALS: {
        id: 'marvel_rivals',
        executable: 'MarvelRivals.exe',
        safeTweaks: [
            'network_interpolation',
            'vfx_optimize',
            'hitbox_refresh',
            'ability_queue'
        ],
        dangerZones: [
            '0x500000-0x5FFFFF'
        ],
        engineHints: {
            renderThread: 'hyperthread',
            physicsThreads: 2
        }
    }
};

export function getProfileForProcess(processName) {
    return Object.values(GAME_PROFILES).find(
        profile => profile.executable.toLowerCase() === processName.toLowerCase()
    );
}

export function getAllSafeTweaks() {
    return [...new Set(
        Object.values(GAME_PROFILES)
            .flatMap(profile => profile.safeTweaks)
    )];
}

export function getAudioProfileForGame(gameId) {
    const profile = GAME_PROFILES[gameId?.toUpperCase()];
    return profile?.audioProfile || 'default';
}
