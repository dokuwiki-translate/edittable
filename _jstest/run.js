const path = require('path');
const {
    runQunitPuppeteer,
    printResultSummary,
    printFailedTests
} = require('node-qunit-puppeteer');

runQunitPuppeteer({
    targetUrl: 'file://' + path.join(__dirname, 'qunit.test.html'),
    timeout: 30000,
    redirectConsole: true,
    puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox']
}).then((result) => {
    printResultSummary(result, console);
    if (result.stats.failed > 0) {
        printFailedTests(result, console);
        process.exit(1);
    }
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
