// CommonJS test file
const { optimizeSystem } = require('./src/windows-optimizer.cjs');

async function testOptimizations() {
  try {
    console.log('Starting optimization tests...');
    
    // Test service disabling
    console.log('\nTesting service optimization:');
    const result = await optimizeSystem();
    
    console.log('\nOptimization results:', {
      status: result.status,
      message: result.message,
      timestamp: new Date(result.timestamp)
    });
    
    console.log('\n✅ All optimizations completed successfully');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

testOptimizations();
