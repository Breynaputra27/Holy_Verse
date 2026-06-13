import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, BookOpen, ChevronRight, X, Star } from 'lucide-react';

// Data 30 Juz dengan info surah yang dikandung
const juzData = [
  { number: 1,  name: 'Alif Lam Mim',         startSurah: 'Al-Fatihah',    endSurah: 'Al-Baqarah',     ayatRange: '1 – 141',   totalAyat: 148 },
  { number: 2,  name: 'Sayaqul',               startSurah: 'Al-Baqarah',    endSurah: 'Al-Baqarah',     ayatRange: '142 – 252', totalAyat: 111 },
  { number: 3,  name: 'Tilkar Rusul',           startSurah: 'Al-Baqarah',    endSurah: 'Ali Imran',      ayatRange: '253 – 92',  totalAyat: 126 },
  { number: 4,  name: 'Lan Tanaalu',            startSurah: 'Ali Imran',     endSurah: 'An-Nisa',        ayatRange: '93 – 23',   totalAyat: 131 },
  { number: 5,  name: 'Wal Muhsanat',           startSurah: 'An-Nisa',       endSurah: 'An-Nisa',        ayatRange: '24 – 147',  totalAyat: 124 },
  { number: 6,  name: 'La Yuhibbullah',          startSurah: 'An-Nisa',       endSurah: 'Al-Maidah',      ayatRange: '148 – 81',  totalAyat: 111 },
  { number: 7,  name: "Wa Idza Sami'u",          startSurah: 'Al-Maidah',     endSurah: 'Al-An\'am',      ayatRange: '82 – 110',  totalAyat: 149 },
  { number: 8,  name: 'Wa Lau Annana',           startSurah: 'Al-An\'am',     endSurah: 'Al-A\'raf',      ayatRange: '111 – 87',  totalAyat: 142 },
  { number: 9,  name: 'Qalal Mala\'u',           startSurah: 'Al-A\'raf',     endSurah: 'Al-Anfal',       ayatRange: '88 – 40',   totalAyat: 159 },
  { number: 10, name: "Wa A'lamu",               startSurah: 'Al-Anfal',      endSurah: 'At-Taubah',      ayatRange: '41 – 92',   totalAyat: 127 },
  { number: 11, name: "Ya'tadziruna",            startSurah: 'At-Taubah',     endSurah: 'Hud',            ayatRange: '93 – 5',    totalAyat: 149 },
  { number: 12, name: 'Wa Ma Min Daabbah',       startSurah: 'Hud',           endSurah: 'Yusuf',          ayatRange: '6 – 52',    totalAyat: 170 },
  { number: 13, name: 'Wa Ma Ubarri\'u',         startSurah: 'Yusuf',         endSurah: 'Ibrahim',        ayatRange: '53 – 52',   totalAyat: 154 },
  { number: 14, name: 'Rubama',                  startSurah: 'Al-Hijr',       endSurah: 'An-Nahl',        ayatRange: '1 – 128',   totalAyat: 227 },
  { number: 15, name: 'Subhanallazi',            startSurah: 'Al-Isra',       endSurah: 'Al-Kahf',        ayatRange: '1 – 74',    totalAyat: 185 },
  { number: 16, name: 'Qal Alam',                startSurah: 'Al-Kahf',       endSurah: 'Taha',           ayatRange: '75 – 135',  totalAyat: 269 },
  { number: 17, name: 'Iqtaraba',                startSurah: 'Al-Anbiya',     endSurah: 'Al-Hajj',        ayatRange: '1 – 78',    totalAyat: 190 },
  { number: 18, name: 'Qad Aflaha',              startSurah: 'Al-Mu\'minun',  endSurah: 'Al-Furqan',      ayatRange: '1 – 20',    totalAyat: 138 },
  { number: 19, name: 'Wa Qalalladzina',         startSurah: 'Al-Furqan',     endSurah: 'An-Naml',        ayatRange: '21 – 55',   totalAyat: 151 },
  { number: 20, name: 'Amman Khalaqa',           startSurah: 'An-Naml',       endSurah: 'Al-Ankabut',     ayatRange: '56 – 45',   totalAyat: 135 },
  { number: 21, name: 'Utlu Ma Uhiya',           startSurah: 'Al-Ankabut',    endSurah: 'Al-Ahzab',       ayatRange: '46 – 30',   totalAyat: 144 },
  { number: 22, name: 'Wa Man Yaqnut',           startSurah: 'Al-Ahzab',      endSurah: 'Ya-Sin',         ayatRange: '31 – 27',   totalAyat: 167 },
  { number: 23, name: 'Wa Mali',                 startSurah: 'Ya-Sin',        endSurah: 'Az-Zumar',       ayatRange: '28 – 31',   totalAyat: 140 },
  { number: 24, name: 'Faman Azlamu',            startSurah: 'Az-Zumar',      endSurah: 'Fussilat',       ayatRange: '32 – 46',   totalAyat: 140 },
  { number: 25, name: 'Ilaihi Yuraddu',          startSurah: 'Fussilat',      endSurah: 'Al-Jatsiyah',    ayatRange: '47 – 37',   totalAyat: 141 },
  { number: 26, name: 'Ha Mim',                  startSurah: 'Al-Ahqaf',      endSurah: 'Adz-Dzariyat',   ayatRange: '1 – 30',    totalAyat: 227 },
  { number: 27, name: 'Qala Fama Khathbukum',    startSurah: 'Adz-Dzariyat',  endSurah: 'Al-Hadid',       ayatRange: '31 – 29',   totalAyat: 399 },
  { number: 28, name: 'Qad Sami\'allah',         startSurah: 'Al-Mujadilah',  endSurah: 'At-Tahrim',      ayatRange: '1 – 12',    totalAyat: 137 },
  { number: 29, name: 'Tabarakallazi',           startSurah: 'Al-Mulk',       endSurah: 'Al-Mursalat',    ayatRange: '1 – 50',    totalAyat: 431 },
  { number: 30, name: "Amma Yatasa'alun",        startSurah: 'An-Naba',       endSurah: 'An-Nas',         ayatRange: '1 – 6',     totalAyat: 564 },
];

// Mini StarrySky untuk halaman ini
const MiniStars = () => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5 + 'px',
      animationDuration: `${Math.random() * 4 + 2}s`,
      animationDelay: `${Math.random() * 3}s`
    }));
    setStars(newStars);
  }, []);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay
          }}
        />
      ))}
    </div>
  );
};

const PilihJuz = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [hoveredJuz, setHoveredJuz] = useState(null);

  // Filter juz berdasarkan pencarian
  const filteredJuz = juzData.filter(juz =>
    juz.number.toString().includes(searchQuery) ||
    juz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    juz.startSurah.toLowerCase().includes(searchQuery.toLowerCase()) ||
    juz.endSurah.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen text-gray-200 bg-gradient-to-b from-[#121B43] via-[#0A0F24] to-[#040611] relative overflow-x-hidden selection:bg-blue-500/30 flex flex-col">
      <MiniStars />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-10 py-8 mx-auto max-w-[1400px] w-full">
        <Link to="/" className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Kembali</span>
        </Link>
        <div className="flex items-end gap-[3px]">
          <div className="w-1.5 h-3 bg-white rounded-sm"></div>
          <div className="w-1.5 h-5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-4 bg-white rounded-sm"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full px-6 md:px-10 mx-auto max-w-[1400px] pb-20">

        {/* Title Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-4xl font-light tracking-wide text-white md:text-5xl">
            Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B85D9] to-purple-400">Juz</span>
          </h1>
          <p className="text-[#94A3B8] max-w-lg mx-auto md:mx-0">
            Pilih Juz yang ingin Anda baca. Tersedia 30 Juz lengkap dari Al-Qur'an.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-10">
          <Search className="absolute w-4 h-4 text-gray-500 -translate-y-1/2 left-4 top-1/2" />
          <input
            id="search-juz"
            type="text"
            placeholder="Cari juz, nama, atau surah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3.5 pl-11 pr-10 text-sm text-gray-200 transition-all border rounded-2xl bg-white/[0.04] border-white/10 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:border-[#5B85D9]/50 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(91,133,217,0.1)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Juz Grid / Detail View */}
        {!selectedJuz ? (
          <>
            {/* Juz Count */}
            <p className="mb-6 text-xs tracking-widest text-[#5B85D9] uppercase font-semibold">
              {filteredJuz.length} Juz ditemukan
            </p>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredJuz.map((juz) => (
                <button
                  key={juz.number}
                  id={`juz-card-${juz.number}`}
                  onClick={() => setSelectedJuz(juz)}
                  onMouseEnter={() => setHoveredJuz(juz.number)}
                  onMouseLeave={() => setHoveredJuz(null)}
                  className="group relative p-5 text-left border rounded-2xl transition-all duration-300 overflow-hidden
                    bg-white/[0.02] border-white/[0.06] 
                    hover:bg-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_8px_32px_rgba(91,133,217,0.12)]
                    hover:-translate-y-1 active:scale-[0.98]"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full transition-opacity duration-500 blur-[30px] ${
                    hoveredJuz === juz.number ? 'opacity-100' : 'opacity-0'
                  } bg-[#5B85D9]/20`}></div>

                  {/* Juz Number */}
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B85D9]/20 to-purple-500/10 border border-[#5B85D9]/20 group-hover:border-[#5B85D9]/40 transition-colors">
                      <span className="text-sm font-semibold text-[#5B85D9]">{juz.number}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#5B85D9] transition-all group-hover:translate-x-0.5" />
                  </div>

                  {/* Juz Name */}
                  <h3 className="relative z-10 mb-2 text-sm font-medium text-white group-hover:text-blue-200 transition-colors leading-tight truncate">
                    {juz.name}
                  </h3>

                  {/* Surah range */}
                  <p className="relative z-10 text-[11px] text-gray-500 group-hover:text-gray-400 transition-colors leading-relaxed">
                    {juz.startSurah === juz.endSurah ? juz.startSurah : `${juz.startSurah} – ${juz.endSurah}`}
                  </p>
                </button>
              ))}
            </div>

            {/* Empty State */}
            {filteredJuz.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="w-12 h-12 text-gray-600 mb-4" />
                <p className="text-lg text-gray-400 mb-2">Juz tidak ditemukan</p>
                <p className="text-sm text-gray-600">Coba kata kunci lain atau reset pencarian.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-6 px-6 py-2 text-sm text-[#5B85D9] border border-[#5B85D9]/30 rounded-full hover:bg-[#5B85D9]/10 transition-colors"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </>
        ) : (
          /* === Detail / Reading View === */
          <div className="animate-[fadeIn_0.4s_ease-out]">
            {/* Back to Juz List */}
            <button
              id="back-to-juz-list"
              onClick={() => setSelectedJuz(null)}
              className="flex items-center gap-2 mb-8 text-sm text-gray-400 transition-colors hover:text-white group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Daftar Juz</span>
            </button>

            {/* Juz Header Card */}
            <div className="relative p-8 mb-8 border rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 backdrop-blur-md overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#5B85D9]/15 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5B85D9]/30 to-purple-500/20 border border-[#5B85D9]/30">
                      <span className="text-xl font-bold text-[#5B85D9]">{selectedJuz.number}</span>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.2em] text-[#5B85D9] uppercase font-semibold mb-1">Juz ke-{selectedJuz.number}</p>
                      <h2 className="text-2xl font-light text-white">{selectedJuz.name}</h2>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 text-center md:text-right">
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-500 uppercase mb-1">Surah</p>
                    <p className="text-sm text-gray-300">{selectedJuz.startSurah} – {selectedJuz.endSurah}</p>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div>
                    <p className="text-[10px] tracking-widest text-gray-500 uppercase mb-1">Ayat</p>
                    <p className="text-sm text-gray-300">{selectedJuz.ayatRange}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Area Placeholder */}
            <div className="relative p-10 border rounded-3xl bg-white/[0.02] border-white/[0.06] min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5B85D9]/5 rounded-full blur-[80px]"></div>
              </div>

              {/* Ornamental border */}
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#5B85D9]/40"></div>
                  <Star className="w-5 h-5 mx-3 text-[#5B85D9]/40" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#5B85D9]/40"></div>
                </div>

                <BookOpen className="w-16 h-16 text-[#5B85D9]/30 mx-auto mb-6" />
                
                <h3 className="text-xl font-light text-white mb-3">Area Bacaan Al-Qur'an</h3>
                <p className="text-sm text-gray-500 max-w-sm mb-8">
                  Ayat-ayat dari Juz {selectedJuz.number} akan ditampilkan di sini. Fitur ini sedang dalam pengembangan.
                </p>

                {/* Mockup surah list */}
                <div className="max-w-lg mx-auto space-y-3">
                  {[
                    { name: selectedJuz.startSurah, type: 'Makkiyah' },
                    ...(selectedJuz.startSurah !== selectedJuz.endSurah ? [{ name: selectedJuz.endSurah, type: 'Madaniyah' }] : [])
                  ].map((surah, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border rounded-2xl bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#5B85D9]/10 border border-[#5B85D9]/15 text-xs text-[#5B85D9] font-semibold">
                          {idx + 1}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{surah.name}</p>
                          <p className="text-[11px] text-gray-600">{surah.type}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-[#5B85D9] transition-all group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center mt-8">
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#5B85D9]/40"></div>
                  <Star className="w-5 h-5 mx-3 text-[#5B85D9]/40" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#5B85D9]/40"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PilihJuz;
