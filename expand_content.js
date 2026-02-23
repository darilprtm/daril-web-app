const fs = require('fs');

const articles = [
    ...JSON.parse(fs.readFileSync('src/data/articles.json', 'utf-8')),
    {
        "id": "101",
        "title": "Adab Sebelum Tidur Sesuai Sunnah",
        "content": "Tidur bukan sekadar istirahat, namun bernilai ibadah jika dilakukan sesuai sunnah. Pertama, berwudhu seperti hendak sholat. Kedua, mengibaskan tempat tidur dengan ujung kain. Ketiga, membaca Ayatul Kursi dan 3 Qul (Al-Ikhlas, Al-Falaq, An-Nas) lalu ditiupkan ke telapak tangan dan diusapkan ke seluruh tubuh. Keempat, membaca doa sebelum tidur. Terakhir, berbaring menghadap kanan.",
        "date": new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0]
    },
    {
        "id": "102",
        "title": "Mengapa Sholat Subuh Terasa Berat?",
        "content": "Sholat Subuh seringkali menjadi tantangan terbesar karena godaan setan yang mengikat tiga ikatan di tengkuk manusia saat tidur. Ikatan ini hanya lepas dengan: 1. Bangun dan mengingat Allah, 2. Berwudhu, 3. Mendirikan sholat. Barangsiapa sholat Subuh berjamaah, ia berada dalam jaminan perlindungan Allah hingga petang.",
        "date": new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]
    },
    {
        "id": "103",
        "title": "Rahasia Sehat Puasa Sunnah Senin Kamis",
        "content": "Secara medis, puasa intermiten (dua kali seminggu) terbukti meningkatkan sensitivitas insulin, regenerasi sel (autophagy), dan menurunkan risiko penyakit mematikan. Nabi Muhammad SAW berpuasa pada hari Senin dan Kamis karena pada hari itulah amal manusia diangkat ke langit, dan beliau senang amalnya diangkat dalam keadaan berpuasa.",
        "date": new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0]
    },
    {
        "id": "104",
        "title": "Keutamaan Menyambung Tali Silaturahmi",
        "content": "Dalam era digital, silaturahmi menjadi semakin mudah sekaligus sering terabaikan. Padahal Rasulullah SAW bersabda: 'Barangsiapa yang ingin dilapangkan rezekinya dan dipanjangkan umurnya, hendaklah ia menyambung tali silaturahmi.' Silaturahmi bukan sekadar berkunjung, namun juga memaafkan kerabat yang memutus hubungan.",
        "date": new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0]
    },
    {
        "id": "105",
        "title": "Hukum Membaca Al-Quran Melalui HP",
        "content": "Membaca Al-Quran melalui smartphone hukumnya mubah (boleh) dan mendapat pahala yang sama dengan membaca mushaf cetak. Keunggulannya adalah mudah dibawa dan dibaca kapan saja. Namun, disarankan tetap menjaga adab seperti dalam keadaan suci, di tempat yang baik, dan tidak membawa HP yang sedang menampilkan ayat suci ke dalam kamar mandi.",
        "date": new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0]
    },
    {
        "id": "106",
        "title": "Pentingnya Menjaga Lisan di Media Sosial",
        "content": "Sosial media merupakan pisau bermata dua. Hati-hati dengan jempol kita, karena tulisan di media sosial sama dengan ucapan. 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.' (HR Bukhari & Muslim). Hindari menyebar hoaks, ghibah online, maupun komentar provokatif.",
        "date": new Date(Date.now() - 86400000 * 6).toISOString().split('T')[0]
    },
    {
        "id": "107",
        "title": "Sholat Dhuha: Sedekah Bagi Seluruh Persendian",
        "content": "Setiap pagi, manusia berutang sedekah atas setiap persendian tubuhnya yang berjumlah 360. Semua hutang sedekah itu dapat dilunasi dengan dua rakaat sholat Dhuha. Waktu Dhuha dimulai sejak matahari naik setinggi tombak hingga menjelang waktu Dzuhur. Rakaat optimalnya adalah dua, empat, atau delapan rakaat.",
        "date": new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0]
    },
    {
        "id": "108",
        "title": "Batas Waktu Mengqadha Puasa Ramadhan",
        "content": "Batas waktu untuk melunasi utang (qadha) puasa Ramadhan tahun lalu adalah hingga tibanya bulan Syakban (sebelum masuk Ramadhan berikutnya). Sayyidah Aisyah ra menceritakan bahwa beliau pernah tidak bisa mengqadha puasa kecuali di bulan Syakban karena kesibukan melayani Rasulullah SAW.",
        "date": new Date(Date.now() - 86400000 * 8).toISOString().split('T')[0]
    },
    {
        "id": "109",
        "title": "Mengenal Perbedaan Ikhlas dan Riya",
        "content": "Ikhlas adalah beramal murni karena Allah SWT, tanpa mengharap pujian manusia. Riya (syirik kecil) adalah melakukan ibadah agar dilihat/dipuji orang lain. Untuk menguji keikhlasan: apakah amal kita sama kualitasnya saat sendirian versus saat dilihat orang banyak? Jika berbeda, segera perbarui niat kita.",
        "date": new Date(Date.now() - 86400000 * 9).toISOString().split('T')[0]
    },
    {
        "id": "110",
        "title": "Rukun dan Syarat Mandi Wajib",
        "content": "Mandi wajib (Junub) memiliki dua rukun utama: 1. Niat dalam hati ('Nawaitul ghusla li raf'il hadatsil akbari fardhan lillaahi ta'aalaa'), 2. Meratakan air ke seluruh bagian luar anggota tubuh, termasuk kulit di bawah rambut/bulu. Disunnahkan membasuh tangan, kemaluan, dan berwudhu terlebih dahulu sebelum mengguyur air ke kepala.",
        "date": new Date(Date.now() - 86400000 * 10).toISOString().split('T')[0]
    }
];

const uniqueArticles = Object.values(articles.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
}, {}));

fs.writeFileSync('src/data/articles.json', JSON.stringify(uniqueArticles, null, 2));
console.log("Added 10 new high-quality articles. Total:", uniqueArticles.length);

const tips = [
    ...JSON.parse(fs.readFileSync('src/data/tips.json', 'utf-8')),
    {
        "id": "101", "type": "pahala",
        "title": "Membaca Bismillah Sebelum Makan", "titleEn": "Saying Bismillah Before Eating",
        "desc": "Sangat sepele namun mencegah setan ikut makan bersama kita. Berkah makanan terjaga!",
        "descEn": "A simple habit that prevents Shaytan from sharing your meal. Keeps the blessings intact!"
    },
    {
        "id": "102", "type": "dosa",
        "title": "Menunda-nunda Sholat", "titleEn": "Delaying Prayers",
        "desc": "Jangan menunggu waktu luang untuk sholat, luangkan waktumu untuk sholat. Menunda tanpa uzur adalah awal kelalaian.",
        "descEn": "Don't wait for free time to pray, free your time to pray. Delaying without excuse leads to negligence."
    },
    {
        "id": "103", "type": "pahala",
        "title": "Sedekah Subuh", "titleEn": "Morning Charity (Subuh)",
        "desc": "Malaikat turun tiap pagi mendoakan orang yang bersedekah. Sisihkan uang koin di kaleng sedekahmu setiap selesai Subuh.",
        "descEn": "Angels descend every morning to pray for those who give charity. Drop a coin in a jar after Fajr."
    },
    {
        "id": "104", "type": "dosa",
        "title": "Berlebih-lebihan (Tabdzir)", "titleEn": "Extravagance (Tabdzir)",
        "desc": "Membeli makanan berlebih lalu membuangnya adalah perilaku saudara setan. Ambil makanan secukupnya.",
        "descEn": "Buying excess food and wasting it is the behavior of the brothers of Shaytan. Take only what you need."
    },
    {
        "id": "105", "type": "pahala",
        "title": "Menyingkirkan Duri di Jalan", "titleEn": "Removing Obstacles from the Road",
        "desc": "Ini adalah cabang iman yang paling rendah, namun bisa menjadi perantara engkau masuk surga kelak.",
        "descEn": "This is the lowest branch of faith, yet it could be the reason you enter Paradise."
    }
];

const uniqueTips = Object.values(tips.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
}, {}));

fs.writeFileSync('src/data/tips.json', JSON.stringify(uniqueTips, null, 2));
console.log("Added 5 new high-quality tips. Total:", uniqueTips.length);
