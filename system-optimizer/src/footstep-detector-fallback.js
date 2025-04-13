const tf = require('@tensorflow/tfjs-node');

class FootstepDetector {
    constructor() {
        this.model = null;
        this.fallbackMode = false;
    }

    async loadModel() {
        try {
            // Check for placeholder files
            const modelPath = 'models/footstep-model/model.json';
            const modelInfo = await fetch(modelPath);
            
            if (modelInfo.headers.get('content-length') === '0') {
                throw new Error('Placeholder model file detected');
            }

            this.model = await tf.loadLayersModel(modelPath);
            console.log('Footstep detection model loaded');
        } catch (error) {
            console.warn(`${error.message}, using fallback detection`);
            this.fallbackMode = true;
        }
    }

    async detect(audioBuffer) {
        if (!this.model) {
            if (!this.fallbackMode) {
                await this.loadModel();
            }
            if (this.fallbackMode) {
                return this.fallbackDetection(audioBuffer);
            }
        }

        try {
            const features = this.extractFeatures(audioBuffer);
            const prediction = this.model.predict(features);
            return prediction.arraySync()[0][0] > 0.7; // Threshold for detection
        } catch (error) {
            console.error('Detection failed:', error);
            return this.fallbackDetection(audioBuffer);
        }
    }

    fallbackDetection(audioBuffer) {
        // Basic frequency analysis fallback
        const rms = this.calculateRMS(audioBuffer);
        return rms > 0.2; // Simple threshold
    }

    calculateRMS(buffer) {
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
            sum += buffer[i] * buffer[i];
        }
        return Math.sqrt(sum / buffer.length);
    }

    extractFeatures(buffer) {
        // Basic feature extraction for fallback
        return tf.tensor2d([[this.calculateRMS(buffer)]]);
    }
}

module.exports = FootstepDetector;
