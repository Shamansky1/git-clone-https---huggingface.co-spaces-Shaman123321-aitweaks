import { GPU } from 'gpu.js';

const gpu = new GPU();

// Create FFT kernel optimized for audio processing
const fftKernel = gpu.createKernel(function(input) {
    const N = this.constants.N;
    let real = 0.0;
    let imag = 0.0;
    
    for (let k = 0; k < N; k++) {
        const angle = -2 * Math.PI * this.thread.x * k / N;
        real += input[k] * Math.cos(angle);
        imag += input[k] * Math.sin(angle);
    }
    
    // Return magnitude
    return Math.sqrt(real * real + imag * imag);
}, {
    constants: { N: 1024 },
    output: [512] // Frequency bins
});

export function analyzeAudio(buffer) {
    // Normalize audio buffer
    const normalized = new Float32Array(1024);
    for (let i = 0; i < Math.min(buffer.length, 1024); i++) {
        normalized[i] = buffer[i] / 32768.0; // For 16-bit audio
    }
    
    return fftKernel(normalized);
}
