const https = require('https');
const fs = require('fs');

const urlsToTry = [
    'https://raw.githubusercontent.com/bachors/Asmaul-Husna-API/master/data/all.json',
    'https://raw.githubusercontent.com/Zhirrr/islami-api/master/data/asmaulhusna.json',
    'https://islamic-api-indonesia.github.io/api/data/json/asmaulhusna.json'
];

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
            let data = '';
            if (res.statusCode === 301 || res.statusCode === 302) {
                return resolve(fetchJson(res.headers.location));
            }
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return resolve(null);
                }
                try {
                    resolve(JSON.parse(data));
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function main() {
    let data = null;
    for (const url of urlsToTry) {
        console.log("Trying", url);
        data = await fetchJson(url);
        if (data && (Array.isArray(data) || data.data)) {
            let actualData = Array.isArray(data) ? data : data.data;
            if (actualData.length > 50) {
                console.log("Found data with length", actualData.length);
                fs.writeFileSync('src/data/asmaulhusna.json', JSON.stringify(actualData, null, 2));
                return;
            }
        }
    }
    console.log("Failed to fetch from all sources.");
}
main();
