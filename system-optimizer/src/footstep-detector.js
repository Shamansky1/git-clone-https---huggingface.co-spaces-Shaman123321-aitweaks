import * as tf from '@tensorflow/tfjs';
import { extractFeatures } from './feature-extractor';

export class FootstepDetector {
  constructor() {
    this.model = null;
    this.threshold = 0.7; // Confidence threshold
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('models/footstep-model/model.json');
      console.log('Footstep detection model loaded');
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  async detect(audioBuffer) {
    if (!this.model) {
      await this.loadModel();
    }

    const features = extractFeatures(audioBuffer);
    const prediction = this.model.predict(features);
    const confidence = prediction.dataSync()[0];
    
    features.dispose();
    prediction.dispose();
    
    return confidence > this.threshold;
  }
}
