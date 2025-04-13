const { ipcRenderer } = require('electron');

// DOM Elements
const metricsGrid = document.querySelector('.metrics-grid');
const toolsGrid = document.querySelector('.tools-grid');

// Performance Metrics Data
const metrics = [
    { id: 'cpu', name: 'CPU Usage', value: 0, unit: '%' },
    { id: 'memory', name: 'Memory Usage', value: 0, unit: '%' },
    { id: 'dps', name: 'System DPS', value: 0, unit: '' },
    { id: 'latency', name: 'Kernel Latency', value: 0, unit: 'ms' }
];

// Optimization Tools
const tools = [
    { id: 'disk-cleanup', name: 'Disk Cleanup' },
    { id: 'registry-scan', name: 'Registry Scan' }
];

// Initialize UI
function initUI() {
    renderMetrics();
    renderTools();
    setupEventListeners();
}

// Render metrics cards
function renderMetrics() {
    metricsGrid.innerHTML = metrics.map(metric => `
        <div class="metric-card" id="${metric.id}">
            <h3>${metric.name}</h3>
            <div class="metric-value">0${metric.unit}</div>
            <div class="metric-graph"></div>
        </div>
    `).join('');
}

// Render tool buttons
function renderTools() {
    toolsGrid.innerHTML = tools.map(tool => `
        <button class="tool-btn" id="${tool.id}">
            ${tool.name}
        </button>
    `).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Tool button click handlers
    document.getElementById('disk-cleanup').addEventListener('click', () => {
        ipcRenderer.send('start-disk-cleanup');
    });

    document.getElementById('registry-scan').addEventListener('click', () => {
        ipcRenderer.send('start-registry-scan');
    });

// IPC response handlers
ipcRenderer.on('metric-update', (event, data) => {
    updateMetrics(data);
});

ipcRenderer.on('cleanup-status', (event, data) => {
    const statusElement = document.getElementById('disk-cleanup-status');
    if (statusElement) {
        statusElement.textContent = `Status: ${data.status}`;
        if (data.freed) {
            statusElement.textContent += ` | Freed: ${data.freed}`;
        }
    }
});

ipcRenderer.on('scan-status', (event, data) => {
    const statusElement = document.getElementById('registry-scan-status');
    if (statusElement) {
        statusElement.textContent = `Status: ${data.status}`;
        if (data.issues) {
            statusElement.textContent += ` | Issues found: ${data.issues}`;
        }
    }
});

ipcRenderer.on('cleanup-error', (event, error) => {
    const statusElement = document.getElementById('disk-cleanup-status');
    if (statusElement) {
        statusElement.textContent = `Error: ${error}`;
    }
});

ipcRenderer.on('scan-error', (event, error) => {
    const statusElement = document.getElementById('registry-scan-status');
    if (statusElement) {
        statusElement.textContent = `Error: ${error}`;
    }
});
}

// Update metrics display
function updateMetrics(data) {
    for (const [id, value] of Object.entries(data)) {
        const element = document.querySelector(`#${id} .metric-value`);
        if (element) {
            const metric = metrics.find(m => m.id === id);
            element.textContent = `${value}${metric?.unit || ''}`;
        }
    }
}

// Request metrics when window loads
function startMetricsCollection() {
    ipcRenderer.send('request-metrics');
}

// Stop metrics when window unloads
function stopMetricsCollection() {
    ipcRenderer.send('stop-metrics');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    startMetricsCollection();
});

window.addEventListener('beforeunload', stopMetricsCollection);
