import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

// Komponen untuk me-render bintang secara acak
const StarrySky = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Membuat 150 bintang dengan posisi dan ukuran acak
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1 + 'px',
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`
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
      {/* Bintang jatuh */}
      <div className="absolute top-[15%] left-[40%] w-[100px] h-[1px] bg-gradient-to-r from-transparent via-white to-white -rotate-12 blur-[1px] opacity-70 animate-pulse"></div>
      {/* Bulan sabit */}
      <div className="absolute top-[12%] right-[35%] w-10 h-10 rounded-full shadow-[-8px_4px_0_0_#fefefe] rotate-[-25deg]"></div>
    </div>
  );
};

const Landscape = () => (
  <div className="absolute bottom-0 left-0 right-0 z-0 h-[500px] pointer-events-none overflow-hidden">
    {/* Siluet bukit menggunakan SVG melengkung */}
    <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Layer belakang */}
      <path d="M0 300 C400 150, 800 350, 1440 250 L1440 500 L0 500 Z" fill="#1B2E6F" />
      {/* Layer tengah */}
      <path d="M0 380 C300 450, 700 200, 1440 380 L1440 500 L0 500 Z" fill="#111F54" />
      {/* Layer depan */}
      <path d="M0 450 C500 350, 1000 500, 1440 420 L1440 500 L0 500 Z" fill="#0A0F24" />
      {/* Siluet rumput kasar */}
      <path d="M0 480 Q 20 460 40 480 T 80 480 T 120 480 T 160 480 T 200 480 T 240 480 T 280 480 T 320 480 T 360 480 T 400 480 T 440 480 T 480 480 T 520 480 T 560 480 T 600 480 T 640 480 T 680 480 T 720 480 T 760 480 T 800 480 T 840 480 T 880 480 T 920 480 T 960 480 T 1000 480 T 1040 480 T 1080 480 T 1120 480 T 1160 480 T 1200 480 T 1240 480 T 1280 480 T 1320 480 T 1360 480 T 1400 480 T 1440 480 L1440 500 L0 500 Z" fill="#040611" />
    </svg>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen text-gray-200 bg-gradient-to-b from-[#121B43] via-[#0A0F24] to-[#040611] relative overflow-hidden selection:bg-blue-500/30 flex flex-col">
      <StarrySky />

      {/* --- NAVBAR --- */}
      <header className="relative z-50 flex items-center justify-between px-6 py-6 mx-auto w-full max-w-[1400px]">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-semibold tracking-wide text-white">Holy</span>
          <span className="text-xl font-semibold tracking-wide text-[#5B85D9]">Verse</span>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
            <span className="cursor-pointer hover:text-white transition-colors">ID</span>
            <svg className="w-5 h-5 cursor-pointer hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          </div>
          <button className="px-6 py-2 text-sm font-medium tracking-wide text-white transition-all bg-[#5B85D9] rounded-full hover:bg-[#4A74C9] shadow-[0_0_15px_rgba(91,133,217,0.4)]">
            Login
          </button>
        </div>
      </header>

      {/* --- HERO SECTION (CENTERED) --- */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 text-center animate-[fadeIn_0.6s_ease-out]">
        
        {/* Bismillah */}
        <div className="mb-6">
          <p className="text-4xl md:text-5xl font-arabic text-emerald-400/90 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        {/* Version Badge */}
        <div className="px-3 py-1 mb-10 text-[10px] font-medium tracking-widest text-[#5B85D9] uppercase border border-[#5B85D9]/30 rounded-full bg-[#5B85D9]/10">
          Versi 1.1.0
        </div>

        {/* Main Title */}
        <h1 className="mb-8 text-6xl md:text-8xl font-medium tracking-tight text-white drop-shadow-lg">
          Holy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#5B85D9] italic pr-2">Verse</span>
        </h1>

        {/* Subtitle */}
        <div className="mb-10">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-emerald-400/80 uppercase mb-4">
            Latihan Hafalan Al-Qur'an
          </h2>
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent mx-auto"></div>
        </div>

        {/* Quote */}
        <div className="max-w-2xl mb-12 space-y-3">
          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light italic">
            "Dan Kami telah mudahkan Al-Qur'an untuk pelajaran, <br className="hidden md:block" />
            maka adakah orang yang mau mengambil pelajaran?"
          </p>
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            (QS. Al Qamar: 17)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap max-w-3xl mx-auto">
          <Link 
            to="/sambung-ayat"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium tracking-wide text-gray-300 transition-all border border-white/20 rounded-full hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_4px_20px_rgba(5,150,105,0.4)] hover:-translate-y-0.5 text-center flex-1 sm:flex-none"
          >
            Sambung Ayat
          </Link>
          <Link 
            to="/pilih-juz"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium tracking-wide text-gray-300 transition-all border border-white/20 rounded-full hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_4px_20px_rgba(5,150,105,0.4)] hover:-translate-y-0.5 text-center flex-1 sm:flex-none"
          >
            Pilih Juz
          </Link>
          <Link 
            to="/detect"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-medium tracking-wide text-gray-300 transition-all border border-white/20 rounded-full hover:bg-emerald-600 hover:border-emerald-500 hover:text-white hover:shadow-[0_4px_20px_rgba(5,150,105,0.4)] hover:-translate-y-0.5 text-center flex-1 sm:flex-none"
          >
            Detect Ayat
          </Link>
        </div>

      </main>
    </div>
  );
};

export default LandingPage;