const https = require('https');
const fs = require('fs');

https.get('https://api.aladhan.com/v1/asmaAlHusna', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.data && parsed.data.length > 0) {
                // Map the data to a simpler format
                const formatted = parsed.data.map(husna => ({
                    number: husna.number,
                    arabic: husna.name,
                    latin: husna.transliteration,
                    meaningEn: husna.en.meaning,
                    // Try to provide a placeholder or mapping for ID meaning if not present. AlAdhan only has EN. We will just use the transliteration as a base or add basic ones.
                    // But actually, Asmaul Husna EN meanings are good enough, we can create a mapping if we have it. Or just rely on another API.
                }));

                // Let's check another source first that has indonesian.
                // Try to find a raw JSON on github with ID translations.
                fs.writeFileSync('src/data/asmaulhusna.json', JSON.stringify(formatted, null, 2));
                console.log("Written", formatted.length);
            }
        } catch (e) { console.error(e); }
    });
});
