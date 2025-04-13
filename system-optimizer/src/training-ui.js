class TrainingUI {
    constructor() {
        this.panel = this.createPanel();
        document.body.appendChild(this.panel);
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.className = 'glass-panel-dark training-panel';
        panel.innerHTML = `
            <h3 class="shaman-title">AI Training</h3>
            <div class="progress-ring">
                <svg viewBox="0 0 100 100">
                    <circle class="progress-ring__circle" stroke="#6e00ff" stroke-width="6" fill="transparent" r="40" cx="50" cy="50"/>
                </svg>
                <span class="progress-text">0%</span>
            </div>
            <button id="start-training" class="cyber-button">Start Training</button>
        `;
        panel.querySelector('#start-training').addEventListener('click', () => this.startTraining());
        return panel;
    }

    async startTraining() {
        const progressText = this.panel.querySelector('.progress-text');
        progressText.textContent = 'Training in progress...';
        
        // Simulate training process
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate time delay
            progressText.textContent = `${i}%`;
        }
        
        progressText.textContent = 'Training complete!';
    }
}

export default TrainingUI;
