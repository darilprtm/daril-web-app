const fs = require('fs');

const more_doas = [
    {
        id: 'hadits-ilmu-agama', category: 'Hadits Pilihan', title_id: 'Kebaikan Sejati (Memahami Agama)', title_en: 'True Goodness (Understanding Religion)',
        arabic: 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِى الدِّينِ',
        latin: 'Man yuridillahu bihi khairan yufaqqihhu fid-diin.',
        id_translation: 'Barangsiapa yang Allah kehendaki kebaikan baginya, maka Allah akan memahamkannya dalam urusan agama.',
        en_translation: 'If Allah wants to do good to a person, He makes him comprehend the religion.',
        reference: 'HR. Bukhari & Muslim'
    },
    {
        id: 'hadits-sabar', category: 'Hadits Pilihan', title_id: 'Sabar Menghadapi Musibah', title_en: 'Patience in Adversity',
        arabic: 'عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ',
        latin: '‘Ajaban li amril-mu’mini inna amrahu kullahu khairun.',
        id_translation: 'Sungguh menakjubkan urusan seorang mukmin, semua urusannya adalah baik baginya.',
        en_translation: 'How wonderful is the case of a believer; there is good for him in everything.',
        reference: 'HR. Muslim'
    },
    {
        id: 'hadits-doa-senjata', category: 'Hadits Pilihan', title_id: 'Doa adalah Senjata', title_en: 'Supplication is a Weapon',
        arabic: 'الدُّعَاءُ سِلاحُ الْمُؤْمِنِ، وَعِمَادُ الدِّينِ، وَنُورُ السَّمَاوَاتِ وَالأَرْضِ',
        latin: 'Ad-du’aau silaahul-mu’min, wa ‘imaadud-diin, wa nuurus-samaawaati wal ardh.',
        id_translation: 'Doa adalah senjata orang beriman, tiang agama, serta cahaya langit dan bumi.',
        en_translation: 'Supplication is the weapon of the believer, the pillar of religion, and the light of the heavens and the earth.',
        reference: 'HR. Al-Hakim'
    },
    {
        id: 'doa-belajar', category: 'Doa Harian', title_id: 'Doa Sebelum Belajar', title_en: 'Prayer Before Studying',
        arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
        latin: 'Rabbi zidni \'ilman warzuqni fahman.',
        id_translation: 'Ya Tuhanku, tambahkanlah kepadaku ilmu pengetahuan, dan berikanlah kepadaku karunia untuk dapat memahaminya.',
        en_translation: 'O my Lord, increase me in knowledge and grant me understanding.',
        reference: 'Q.S Taha: 114 & Doa Ulama'
    },
    {
        id: 'doa-husnul-khatimah', category: 'Doa Harian', title_id: 'Doa Mohon Husnul Khatimah', title_en: 'Prayer for a Good Ending',
        arabic: 'اللَّهُمَّ اخْتِمْ لَنَا بِحُسْنِ الْخَاتِمَةِ وَلاَ تَخْتِمْ عَلَيْنَا بِسُوءِ الْخَاتِمَةِ',
        latin: 'Allahummakhtim lana bi husnil khatimah wa la takhtim ‘alaina bi su’il khatimah.',
        id_translation: 'Ya Allah, akhirilah hidup kami dengan husnul-khatimah (akhir yang baik), dan jangan Kau akhiri hidup kami dengan su\'ul-khatimah (akhir yang buruk).',
        en_translation: 'O Allah, make our end a good end, and do not make our end a bad end.',
        reference: 'Doa Umum'
    },
    {
        id: 'doa-kemudahan', category: 'Doa Harian', title_id: 'Doa Mohon Kemudahan Urusan', title_en: 'Prayer for Ease of Affairs',
        arabic: 'اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الحَزْنَ إِذَا شِئْتَ سَهْلاً',
        latin: 'Allahumma laa sahla illa maa ja\'altahu sahlan wa anta taj\'alul hazna idza syi\'ta sahlan.',
        id_translation: 'Ya Allah, tidak ada kemudahan kecuali yang Engkau buat mudah. Dan Engkau menjadikan kesedihan (kesulitan), jika Engkau kehendaki, pasti akan menjadi mudah.',
        en_translation: 'O Allah, there is no ease except in that which You have made easy, and You make the difficulty, if You wish, easy.',
        reference: 'HR. Ibnu Hibban'
    },
    {
        id: 'doa-kesembuhan', category: 'Doa Harian', title_id: 'Doa Menjenguk Orang Sakit', title_en: 'Prayer When Visiting the Sick',
        arabic: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لاَ شَافِيَ إِلاَّ أَنْتَ شِفَاءً لاَ يُغَادِرُ سَقَمًا',
        latin: 'Allahumma Rabban naas, adzhibil ba\'sa, isyfi antas syaafi, laa syaafiya illaa anta syifaa\'an laa yughaadiru saqaman.',
        id_translation: 'Ya Allah Rabb manusia, dzat yang menghilangkan rasa sakit, sembuhkanlah, Engkaulah Dzat Yang Maha Menyembuhkan. Tidak ada kesembuhan melainkan dari kesembuhan-Mu, yaitu kesembuhan yang tidak menyisakan rasa sakit.',
        en_translation: 'O Allah, Lord of mankind, remove the disease, cure the disease. You are the One Who cures. There is no cure except Your cure. Grant us a cure that leaves no illness.',
        reference: 'HR. Bukhari'
    },
    {
        id: 'doa-naik-kendaraan', category: 'Doa Harian', title_id: 'Doa Naik Kendaraan', title_en: 'Prayer When Boarding a Vehicle',
        arabic: 'سُبْحَانَ الَّذِى سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        latin: 'Subhaanal-ladzii sakh-khara lanaa haadzaa wa maa kunnaa lahu muqriniin. Wa innaa ilaa Rabbinaa lamunqalibuun.',
        id_translation: 'Maha Suci Tuhan yang menundukkan kendaraan ini untuk kami, padahal kami sebelumnya tidak mampu menguasainya. Dan sesungguhnya kami akan kembali kepada Tuhan kami (di hari Kiamat).',
        en_translation: 'Glory to Him who has brought this [vehicle] under our control, though we were unable to control it [ourselves], and indeed, to our Lord we will return.',
        reference: 'Q.S Az-Zukhruf: 13-14'
    },
    {
        id: 'doa-penghapus-dosa-majelis', category: 'Doa Harian', title_id: 'Doa Kafaratul Majelis', title_en: 'Expiation of Assembly Prayer',
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، أَشْهَدُ أَنْ لا إِلَهَ إِلا أَنْتَ ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
        latin: 'Subhaanakallahumma wa bihamdika, asyhadu allaa ilaaha illaa anta, astaghfiruka wa atuubu ilaik.',
        id_translation: 'Maha Suci Engkau Ya Allah, dan segala puji bagi-Mu, aku bersaksi bahwa tiada Tuhan yang berhak disembah selain Engkau. Aku memohon ampun kepada-Mu dan bertaubat kepada-Mu.',
        en_translation: 'Glory be to You, O Allah, and praise be to You. I bear witness that none has the right to be worshipped except You. I ask Your forgiveness and turn to You in repentance.',
        reference: 'HR. Tirmidzi'
    },
    {
        id: 'hadits-adab-makan', category: 'Hadits Pilihan', title_id: 'Makan dengan Tangan Kanan', title_en: 'Eating with the Right Hand',
        arabic: 'يَا غُلاَمُ سَمِّ اللَّهَ ، وَكُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ',
        latin: 'Yaa ghulaam, sammillaah, wa kul bi yamiinika, wa kul mimmaa yaliik.',
        id_translation: 'Wahai anakku, sebutlah nama Allah, makanlah dengan tangan kananmu, dan makanlah makanan yang ada di dekatmu.',
        en_translation: 'O boy, mention the Name of Allah, eat with your right hand, and eat from what is near to you.',
        reference: 'HR. Bukhari & Muslim'
    },
    {
        id: 'zp-6', category: 'Zikir Pagi', title_id: 'Zikir Meminta Keselamatan', title_en: 'Adhkar for Safety',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ',
        latin: 'Allahumma inni as-alukal ‘aafiyata fid-dunya wal aakhirah.',
        id_translation: 'Ya Allah, sesungguhnya aku memohon keselamatan di dunia dan akhirat.',
        en_translation: 'O Allah, I ask You for well-being in this world and the Hereafter.',
        reference: 'HR. Abu Dawud'
    },
    {
        id: 'zt-6', category: 'Zikir Petang', title_id: 'Zikir Meminta Ilham Petunjuk', title_en: 'Adhkar for Guidance',
        arabic: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ...',
        latin: 'Allahumma ‘Aalimal ghoibi wasy-syahaadati faathiros-samaawaati wal ardh...',
        id_translation: 'Ya Allah, Yang Maha Mengetahui yang ghaib dan yang nyata, wahai Rabb pencipta langit dan bumi, Rabb segala sesuatu dan yang merajainya...',
        en_translation: 'O Allah, Knower of the unseen and the evident, Creator of the heavens and the earth, Lord of everything and its Sovereign...',
        reference: 'HR. Tirmidzi'
    }
];

let doas = [];
try {
    const raw = fs.readFileSync('src/data/doa.json', 'utf-8');
    doas = JSON.parse(raw);
} catch (e) { }

const newDoas = [...doas, ...more_doas];

// remove duplicates by ID just in case
const uniqueDoas = Object.values(newDoas.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
}, {}));

fs.writeFileSync('src/data/doa.json', JSON.stringify(uniqueDoas, null, 2));
console.log("Appended 12 high-quality synthesized Doa/Hadith. Total:", uniqueDoas.length);
