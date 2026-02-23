const fs = require('fs');

async function build() {
    let doas = [];
    try {
        const raw = fs.readFileSync('src/data/doa_full.json');
        doas = JSON.parse(raw);
    } catch (e) {
        console.log("No full doa base, using default");
    }

    const zikirData = [
        // Zikir Pagi
        {
            id: 'zp-1', category: 'Zikir Pagi', title_id: 'Ayat Kursi', title_en: 'Ayatul Kursi',
            arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
            latin: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum. La ta\'khudzuhu sinatun wa la naum...',
            id_translation: 'Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal lagi terus menerus mengurus (makhluk-Nya); tidak mengantuk dan tidak tidur...',
            en_translation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of [all] existence...',
            reference: 'HR. Al-Hakim'
        },
        {
            id: 'zp-2', category: 'Zikir Pagi', title_id: 'Al-Ikhlas, Al-Falaq, An-Nas (3x)', title_en: 'The 3 Quls (3x)',
            arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ اَحَدٌۚ. اَللّٰهُ الصَّمَدُۚ. لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ. وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ',
            latin: 'Bismillahir-rahmanir-rahim. Qul huwallahu ahad...',
            id_translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa...',
            en_translation: 'Say, He is Allah, [who is] One...',
            reference: 'HR. Abu Dawud & Tirmidzi'
        },
        {
            id: 'zp-3', category: 'Zikir Pagi', title_id: 'Sayyidul Istighfar', title_en: 'The Principal Prayer of Forgiveness',
            arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
            latin: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana \'abduka...',
            id_translation: 'Ya Allah, Engkau adalah Tuhanku. Tidak ada Tuhan yang berhak disembah selain Engkau. Engkau yang telah menciptakanku...',
            en_translation: 'O Allah, You are my Lord, none has the right to be worshipped except You...',
            reference: 'HR. Bukhari'
        },
        {
            id: 'zp-4', category: 'Zikir Pagi', title_id: 'Zikir Kerelaan Hati', title_en: 'Adhkar of Contentment',
            arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
            latin: 'Radhitu billahi rabba, wa bil-islami dina, wa bi Muhammadin shallallahu \'alaihi wa sallama nabiyya.',
            id_translation: 'Aku rela Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad shallallahu \'alaihi wa sallam sebagai Nabiku.',
            en_translation: 'I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad as my Prophet.',
            reference: 'HR. Abu Dawud'
        },
        {
            id: 'zp-5', category: 'Zikir Pagi', title_id: 'Doa Pagi Hari', title_en: 'Morning Supplication',
            arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
            latin: 'Allahumma bika ashbahna, wa bika amsaina, wa bika nahya, wa bika namutu, wa ilaikan-nusyur.',
            id_translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu petang...',
            en_translation: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening...',
            reference: 'HR. Tirmidzi'
        },

        // Zikir Petang
        {
            id: 'zt-1', category: 'Zikir Petang', title_id: 'Ayat Kursi', title_en: 'Ayatul Kursi',
            arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...',
            latin: 'Allahu la ilaha illa Huwa, Al-Hayyul-Qayyum...',
            id_translation: 'Allah, tidak ada Tuhan (yang berhak disembah) melainkan Dia Yang Hidup kekal...',
            en_translation: 'Allah! There is no deity except Him, the Ever-Living...',
            reference: 'HR. Al-Hakim'
        },
        {
            id: 'zt-2', category: 'Zikir Petang', title_id: 'Al-Ikhlas, Al-Falaq, An-Nas (3x)', title_en: 'The 3 Quls (3x)',
            arabic: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. قُلْ هُوَ اللّٰهُ اَحَدٌۚ...',
            latin: 'Bismillahir-rahmanir-rahim. Qul huwallahu ahad...',
            id_translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang...',
            en_translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful...',
            reference: 'HR. Abu Dawud & Tirmidzi'
        },
        {
            id: 'zt-3', category: 'Zikir Petang', title_id: 'Sayyidul Istighfar', title_en: 'The Principal Prayer of Forgiveness',
            arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
            latin: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana \'abduka...',
            id_translation: 'Ya Allah, Engkau adalah Tuhanku. Tidak ada Tuhan yang berhak disembah selain Engkau...',
            en_translation: 'O Allah, You are my Lord, none has the right to be worshipped except You...',
            reference: 'HR. Bukhari'
        },
        {
            id: 'zt-5', category: 'Zikir Petang', title_id: 'Doa Petang Hari', title_en: 'Evening Supplication',
            arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
            latin: 'Allahumma bika amsaina, wa bika ashbahna, wa bika nahya, wa bika namutu, wa ilaikal-mashir.',
            id_translation: 'Ya Allah, dengan rahmat dan pertolongan-Mu kami memasuki waktu petang, dan dengan rahmat dan pertolongan-Mu kami memasuki waktu pagi...',
            en_translation: 'O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning...',
            reference: 'HR. Tirmidzi'
        },
        {
            id: 'zt-4', category: 'Zikir Petang', title_id: 'Zikir Perlindungan', title_en: 'Adhkar of Protection',
            arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
            latin: 'A\'udzu bikalimatillahit-tammati min syarri ma khalaq.',
            id_translation: 'Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya. (Dibaca 3x)',
            en_translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
            reference: 'HR. Muslim'
        },

        // Hadits Pilihan
        {
            id: 'hadits-niat', category: 'Hadits Pilihan', title_id: 'Amal Bergantung Niat', title_en: 'Actions are by Intentions',
            arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
            latin: 'Innamal-a\'maalu bin-niyyaati, wa innamā likullimri\'in mā nawā.',
            id_translation: 'Sesungguhnya setiap amalan itu bergantung kepada niatnya, dan sesungguhnya setiap orang akan mendapatkan apa yang ia niatkan.',
            en_translation: 'Actions are according to intentions, and everyone will get what was intended.',
            reference: 'HR. Bukhari & Muslim'
        },
        {
            id: 'hadits-ilmu', category: 'Hadits Pilihan', title_id: 'Menuntut Ilmu', title_en: 'Seeking Knowledge',
            arabic: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
            latin: 'Thalabul ‘ilmi faridhatun ‘ala kulli muslimin.',
            id_translation: 'Menuntut ilmu itu wajib atas setiap muslim.',
            en_translation: 'Seeking knowledge is an obligation upon every Muslim.',
            reference: 'HR. Ibnu Majah'
        },
        {
            id: 'hadits-senyum', category: 'Hadits Pilihan', title_id: 'Senyum adalah Sedekah', title_en: 'Smiling is Charity',
            arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
            latin: 'Tabassumuka fi wajhi akhika laka shadaqah.',
            id_translation: 'Senyummu di hadapan saudaramu (sesama muslim) adalah bernilai sedekah bagimu.',
            en_translation: 'Your smile for your brother is a charity.',
            reference: 'HR. Tirmidzi'
        }
    ];

    const finalResult = [...doas, ...zikirData];
    fs.writeFileSync('src/data/doa.json', JSON.stringify(finalResult, null, 2));
    console.log("Written total to doa.json:", finalResult.length);
}
build();
