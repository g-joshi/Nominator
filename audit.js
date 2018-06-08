const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const log = require('lighthouse-logger');

const flags = {
    logLevel: 'info'
};

log.setLevel(flags.logLevel);


function launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            // use results.lhr for the JS-consumeable output
            // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
            // use results.report for the HTML/JSON/CSV output as a string
            // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
            return chrome.kill().then(() => results.lhr)
        });
    });
}

function launchMultipleChromeInstances(urls, opts, config = null) {
    let promises = [];
    //console.log(urls);
    for (var i = 0; i < urls.length; i++) {
        let url = urls[i];
        let promise = chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
            opts.port = chrome.port;
            //console.log(chrome);
            //let url = urls[i];
            console.log(url);
            return lighthouse(url, opts, config).then(results => {
                // use results.lhr for the JS-consumeable output
                // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
                // use results.report for the HTML/JSON/CSV output as a string
                // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
                return chrome.kill().then(() => results.lhr)
            });
        });

        promises.push(promise);
    }
    return Promise.all(promises);
}

const opts = {
    chromeFlags: ['--show-paint-rects']
};

// Usage:
launchMultipleChromeInstances([
    'http://localhost:4200',
    'http://localhost:4200/nominations',
    'http://localhost:4200/users'
], flags).then(results => {
    console.log(results.length);
})


/* launchChromeAndRunLighthouse('http://localhost:4200', flags).then(results => {
    // Use results!
    console.log(results);
}); */