const fs = require('fs');
const https = require('https');

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
                    console.log("Failed", url, res.statusCode);
                    return resolve(null);
                }
                try {
                    resolve(JSON.parse(data));
                } catch (e) { console.log(e); resolve(null); }
            });
        }).on('error', reject);
    });
}

async function main() {
    let finalData = [];

    // 1. Fetch Doa Harian (37+ doas)
    const doas = await fetchJson('https://doa-doa-api-ahmadramadhan.fly.dev/api');
    if (doas) {
        doas.forEach(d => {
            finalData.push({
                id: 'doa-' + d.id,
                category: 'Doa Harian',
                title_id: d.doa,
                title_en: d.doa,
                arabic: d.ayat,
                latin: d.latin,
                id_translation: d.artinya,
                en_translation: d.artinya, // Don't have EN, just duplicate
                reference: 'Umum'
            });
        });
    }

    // 2. Fetch Zikir Pagi
    // Known repo: https://raw.githubusercontent.com/yusuf-renaldi/dzikir-pagi-petang/main/data/dzikir-pagi.json -> returns 404 sometimes, let's try a stable one.
    // Try https://raw.githubusercontent.com/Zhirrr/islami-api/master/data/wirid.json
    // Or just generic:
    const zPagi = await fetchJson('https://raw.githubusercontent.com/yusuf-renaldi/dzikir-pagi-petang/main/data/dzikir-pagi.json') ||
        await fetchJson('https://islamic-api-indonesia.github.io/api/data/json/dzikir-pagi.json') ||
        await fetchJson('https://raw.githubusercontent.com/zeroxbhai/dzikir/master/dzikir.json') || null;

    if (zPagi && Array.isArray(zPagi)) {
        console.log("Found Zikir Pagi", zPagi.length);
        zPagi.forEach((d, i) => {
            finalData.push({
                id: 'zpagi-' + i,
                category: 'Zikir Pagi',
                title_id: d.title || d.nama || 'Zikir Pagi',
                title_en: d.title || d.nama || 'Morning Adhkar',
                arabic: d.arabic || d.arab || d.ayat || '',
                latin: d.latin || '',
                id_translation: d.translation || d.arti || d.artinya || '',
                en_translation: d.translation || d.arti || d.artinya || '',
                reference: d.notes || d.source || 'Zikir Pagi'
            });
        });
    }

    // Write it out
    fs.writeFileSync('src/data/doa_full.json', JSON.stringify(finalData, null, 2));
    console.log("Written items:", finalData.length);
}
main();
