export interface TataCaraStep {
    title: string;
    desc: string;
    arabic?: string;
    latin?: string;
    translation?: string;
}

export interface TataCaraGuide {
    id: string;
    title: string;
    shortDesc: string;
    icon: string; // We'll map this to Lucide icons dynamically
    steps: TataCaraStep[];
}

export const tataCaraGuides: TataCaraGuide[] = [
    {
        id: "wudhu",
        title: "Tata Cara Wudhu",
        shortDesc: "Urutan wudhu yang benar sesuai sunnah Nabi Muhammad SAW.",
        icon: "Droplets",
        steps: [
            {
                title: "1. Membaca Niat",
                desc: "Niat wudhu di dalam hati. Jika dilafadzkan:",
                arabic: "نَوَيْتُ الْوُضُوْءَ لِرَفْعِ الْحَدَثِ اْلاَصْغَرِ فَرْضًا لِلّٰهِ تَعَالَى",
                latin: "Nawaitul wudhua liraf'il hadatsil asghari fardhan lillaahi ta’aalaa.",
                translation: "Aku niat berwudhu untuk menghilangkan hadast kecil, fardhu karena Allah Ta’ala."
            },
            {
                title: "2. Mencuci Kedua Telapak Tangan",
                desc: "Mencuci kedua telapak tangan sebanyak 3 kali hingga ke sela-sela jari."
            },
            {
                title: "3. Berkumur-kumur",
                desc: "Berkumur-kumur sebanyak 3 kali untuk membersihkan sisa makanan dalam mulut."
            },
            {
                title: "4. Menghirup Air ke Hidung (Istinsyaq)",
                desc: "Menghirup air ke dalam hidung kemudian mengeluarkannya sebanyak 3 kali."
            },
            {
                title: "5. Membasuh Wajah",
                desc: "Membasuh seluruh batas wajah mulai dari tumbuhnya rambut hingga bawah dagu sebanyak 3 kali."
            },
            {
                title: "6. Membasuh Kedua Tangan Hingga Siku",
                desc: "Mendahulukan tangan kanan, kemudian tangan kiri, masing-masing 3 kali."
            },
            {
                title: "7. Mengusap Sebagian Kepala",
                desc: "Mengusap ubun-ubun atau sebagian rambut kepala dengan air sebanyak 3 kali."
            },
            {
                title: "8. Mengusap Kedua Telinga",
                desc: "Mengusap bagian luar dan dalam telinga secara bersamaan sebanyak 3 kali."
            },
            {
                title: "9. Membasuh Kedua Kaki Hingga Mata Kaki",
                desc: "Mendahulukan kaki kanan, kemudian kaki kiri, hingga ke sela-sela jari sebanyak 3 kali."
            },
            {
                title: "10. Membaca Doa Setelah Wudhu",
                desc: "Menghadap kiblat dan berdoa:",
                arabic: "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اَللّٰهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
                latin: "Asyhadu an laa ilaaha illallahu wahdahu laa syariika lahu, wa asyhadu anna muhammadan 'abduhu wa rasuluhu. Allahummaj'alnii minat tawwaabiina waj'alnii minal mutathahhiriin.",
                translation: "Aku bersaksi bahwa tidak ada Tuhan sesembahan yang berhak disembah selain Allah Yang Maha Esa, tidak ada sekutu bagi-Nya. Dan aku bersaksi bahwa Nabi Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku termasuk orang-orang yang bertaubat dan jadikanlah aku termasuk orang-orang yang suci."
            }
        ]
    },
    {
        id: "sholat-fardhu",
        title: "Tata Cara Sholat Fardhu",
        shortDesc: "Panduan lengkap gerakan dan bacaan sholat 5 waktu yang benar.",
        icon: "Heart",
        steps: [
            {
                title: "1. Niat Sholat (Contoh: Subuh)",
                desc: "Berniat di dalam hati untuk melaksanakan sholat fardhu.",
                arabic: "أُصَلِّى فَرْضَ الصُّبْح رَكَعتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلّٰهِ تَعَالَى",
                latin: "Ushalli fardhash-shubhi rak'ataini mustaqbilal qiblati adaa-an lillaahi ta'aalaa.",
                translation: "Aku niat sholat fardhu Subuh dua rakaat menghadap kiblat karena Allah Ta'ala."
            },
            {
                title: "2. Takbiratul Ihram",
                desc: "Mengangkat kedua tangan sejajar telinga sambil mengucapkan Takbir.",
                arabic: "اللّٰهُ أَكْبَر",
                latin: "Allahu Akbar",
                translation: "Allah Maha Besar"
            },
            {
                title: "3. Membaca Doa Iftitah",
                desc: "Bersedekap dan membaca doa pembuka sholat.",
                arabic: "كَبِيرًا وَالْحَمْدُ لِلّٰهِ كَثِيرًا وَسُبْحَانَ اللّٰهِ بُكْرَةً وَأَصِيلًا...",
                latin: "Allahu akbar kabiiraa walhamdu lillaahi katsiiraa, wa subhaanallahi bukratan wa asyiilaa...",
                translation: "Allah Maha Besar dengan sebesar-besarnya, segala puji bagi Allah dengan pujian yang banyak..."
            },
            {
                title: "4. Membaca Surah Al-Fatihah",
                desc: "Membaca Surah Al-Fatihah yang merupakan rukun wajib sholat."
            },
            {
                title: "5. Membaca Surah Pendek",
                desc: "Membaca salah satu surah atau ayat dari Al-Quran pada dua rakaat pertama."
            },
            {
                title: "6. Ruku' dan Tumakninah",
                desc: "Membungkuk datar, tangan di lutut, dan membaca tasbih 3 kali.",
                arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
                latin: "Subhaana rabbiyal ‘adziimi wa bihamdih.",
                translation: "Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya."
            },
            {
                title: "7. I'tidal",
                desc: "Bangkit dari ruku' sambil membaca:",
                arabic: "سَمِعَ اللّٰهُ لِمَنْ حَمِدَهُ",
                latin: "Sami'allahu liman hamidah.",
                translation: "Allah Maha Mendengar orang yang memuji-Nya."
            },
            {
                title: "8. Sujud",
                desc: "Sujud menempelkan dahi, hidung, kedua telapak tangan, lutut, dan jemari kaki, lalu membaca 3 kali:",
                arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
                latin: "Subhaana rabbiyal a'laa wa bihamdih.",
                translation: "Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya."
            },
            {
                title: "9. Duduk di Antara Dua Sujud",
                desc: "Duduk dan memohon ampunan serta rezeki:",
                arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي",
                latin: "Rabbighfirlii warhamnii wajburnii warfa'nii warzuqnii wahdinii wa'aafinii wa'fu 'annii.",
                translation: "Ya Tuhanku, ampunilah aku, rahmatilah aku, cukupkanlah kekuranganku, angkatlah derajatku, berilah aku rezeki, berilah aku petunjuk, berilah aku kesehatan, dan maafkanlah (kesalahan)ku."
            },
            {
                title: "10. Tahiyat Akhir dan Salam",
                desc: "Membaca tasyahud akhir, sholawat nabi, kemudian menoleh ke kanan dan kiri sambil mengucapkan salam:",
                arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللّٰهِ",
                latin: "Assalaamu 'alaikum wa rahmatullah.",
                translation: "Semoga keselamatan dan rahmat Allah terlimpah kepadamu."
            }
        ]
    },
    {
        id: "mandi-wajib",
        title: "Tata Cara Mandi Wajib",
        shortDesc: "Rukun dan tata tertib mandi junub secara syariat.",
        icon: "Waves",
        steps: [
            {
                title: "1. Membaca Niat",
                desc: "Dibaca bersamaan saat air pertama kali menyentuh tubuh.",
                arabic: "نَوَيْتُ الْغُسْلَ لِرَفْعِ الْحَدَثِ اْلاَكْبَرِ فَرْضًا ِللهِ تَعَالَى",
                latin: "Nawaitul ghusla liraf'il hadatsil akbari fardhan lillaahi ta'aalaa.",
                translation: "Aku berniat mandi untuk menghilangkan hadats besar, fardhu karena Allah Ta'ala."
            },
            {
                title: "2. Mencuci Kedua Tangan",
                desc: "Mencuci kedua tangan sebanyak 3 kali untuk membersihkan najis."
            },
            {
                title: "3. Membersihkan Kemaluan",
                desc: "Membersihkan kemaluan dan kotoran di sekitarnya menggunakan tangan kiri."
            },
            {
                title: "4. Mencuci Tangan Kembali",
                desc: "Mencuci tangan kiri yang baru saja digunakan untuk membersihkan kotoran dengan sabun atau tanah."
            },
            {
                title: "5. Berwudhu",
                desc: "Berwudhu dengan sempurna seperti wudhu untuk sholat."
            },
            {
                title: "6. Menyela Rambut",
                desc: "Menyela-nyela pangkal rambut dengan jari-jari tangan yang basah hingga merata."
            },
            {
                title: "7. Mengguyur Kepala",
                desc: "Mengguyur kepala dengan air sebanyak 3 kali."
            },
            {
                title: "8. Mengguyur Seluruh Tubuh",
                desc: "Mengguyur air ke seluruh tubuh, dimulai dari sisi kanan kemudian sisi kiri, memastikan air meresap ke lipatan tubuh."
            }
        ]
    },
    {
        id: "sholat-jenazah",
        title: "Tata Cara Sholat Jenazah",
        shortDesc: "Sholat 4 takbir fardhu kifayah untuk mensholati jenazah.",
        icon: "Users",
        steps: [
            {
                title: "1. Niat Sholat Jenazah (Laki-laki)",
                desc: "Niat sholat untuk jenazah laki-laki (sebagai makmum).",
                arabic: "أُصَلَّى عَلَى هٰذَا الـمَيِّتِ أَرْبَعَ تَكْبِيرَاتٍ فَرْضَ كِفَايَةِ مَأْمُومًا لِلّٰهِ تَعَالَى",
                latin: "Ushalli 'ala hadzal mayyiti arba'a takbiratin fardha kifayati ma'muman lillahi ta'ala.",
                translation: "Saya niat sholat atas jenazah laki-laki ini empat kali takbir fardu kifayah, sebagai makmum karena Allah Ta’ala."
            },
            {
                title: "2. Niat Sholat Jenazah (Perempuan)",
                desc: "Niat sholat untuk jenazah perempuan (sebagai makmum).",
                arabic: "أُصَلَّى عَلَى هٰذِهِ الـمَيِّتَةِ أَرْبَعَ تَكْبِيرَاتٍ فَرْضَ كِفَايَةِ مَأْمُومًا لِلّٰهِ تَعَالَى",
                latin: "Ushalli 'ala hadzihil mayyitati arba'a takbiratin fardha kifayati ma'muman lillahi ta'ala.",
                translation: "Saya niat sholat atas jenazah perempuan ini empat kali takbir fardu kifayah, sebagai makmum karena Allah Ta’ala."
            },
            {
                title: "3. Takbir Pertama",
                desc: "Membaca Surah Al-Fatihah tanpa doa Iftitah."
            },
            {
                title: "4. Takbir Kedua",
                desc: "Membaca Sholawat Ibrahimiyah.",
                arabic: "اللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ...",
                latin: "Allahumma sholli 'ala Muhammad wa 'ala aali Muhammad...",
                translation: "Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarganya..."
            },
            {
                title: "5. Takbir Ketiga",
                desc: "Membaca doa untuk jenazah (Contoh untuk laki-laki).",
                arabic: "اللّٰهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ",
                latin: "Allahummaghfirlahu warhamhu wa 'afihi wa'fu 'anhu.",
                translation: "Ya Allah, ampunilah dia, berilah rahmat, sejahtera dan maafkanlah kesalahannya."
            },
            {
                title: "6. Takbir Keempat",
                desc: "Membaca doa penutup.",
                arabic: "اللّٰهُمَّ لَا تَحْرِمْنَا أَجْرَهُ وَلَا تَفْتِنَّا بَعْدَهُ وَاغْفِرْ لَنَا وَلَهُ",
                latin: "Allahumma laa tahrimna ajrahu wa laa taftinna ba'dahu waghfirlana wa lahu.",
                translation: "Ya Allah, janganlah kiranya pahalanya tidak sampai kepada kami, dan janganlah Engkau beri kami fitnah sepeninggalannya, dan ampunilah kami dan dia."
            },
            {
                title: "7. Salam",
                desc: "Selesai takbir keempat, mengucapkan salam ke kanan dan kiri (tanpa menolehkan badan)."
            }
        ]
    }
];
