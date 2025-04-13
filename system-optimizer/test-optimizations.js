const { optimizeSystem } = require('./src/windows-optimizer.cjs');

async function testOptimizations() {
  try {
    console.log('Starting optimization tests...');
    const result = await optimizeSystem();
    console.log('Optimization results:', result);
    console.log('✅ All optimizations completed successfully');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
  }
}

testOptimizations();
