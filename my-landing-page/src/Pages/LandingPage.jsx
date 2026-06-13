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
    <div className="min-h-screen text-gray-200 bg-gradient-to-b from-[#442C7D] via-[#2A3479] to-[#121B43] relative overflow-x-hidden selection:bg-blue-500/30">
      <StarrySky />

      {/* --- NAVBAR --- */}
      <header className="relative z-50 flex items-center justify-between px-10 py-8 mx-auto max-w-[1400px]">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-end gap-[3px]">
            <div className="w-1.5 h-3 bg-white rounded-sm"></div>
            <div className="w-1.5 h-5 bg-white rounded-sm"></div>
            <div className="w-1.5 h-4 bg-white rounded-sm"></div>
          </div>

          <nav className="hidden gap-10 md:flex pl-8">
            {['Offerings', 'Why Wealthy', 'Stories', 'Help'].map(item => (
              <a key={item} href="#" className="text-sm tracking-wide text-gray-200 transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </nav>
        </div>

        <button className="px-8 py-2 text-sm font-medium tracking-wide transition-colors border border-gray-400 rounded-full hover:bg-white hover:text-[#121B43]">
          Login
        </button>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex flex-col md:flex-row items-start min-h-[75vh] px-10 mx-auto max-w-[1400px]">
        <div className="w-full md:w-1/2 pt-28 pb-32">
          <h1 className="mb-10 text-[3.5rem] font-light leading-[1.1] tracking-wide text-white">
            Explore the life you want to live. <br />
            Put your money to work
          </h1>
          <button className="px-10 py-4 text-sm font-semibold tracking-wide text-white transition-colors bg-[#111636] rounded-full hover:bg-[#1A2352]">
            Get in Touch
          </button>
        </div>

        {/* Container untuk Landscape akan berada di belakang hero */}
        <Landscape />
      </section>

      {/* --- BACKGROUND BAWAH GELAP --- */}
      <div className="relative z-20 bg-gradient-to-b from-[#0A0F24] via-[#060917] to-[#0D1537] -mt-16 pt-32 pb-40">

        {/* --- ADVANTAGE SECTION --- */}
        <section className="px-10 mx-auto max-w-[1400px]">
          <h2 className="mb-20 text-[2rem] font-light text-[#5B85D9] tracking-wide">Fitur Kami</h2>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 text-[#94A3B8]">
            {/* Fitur 1 */}
            <Link to="/detect" className="block p-6 transition-all border border-transparent rounded-2xl hover:bg-white/5 hover:border-white/10 group cursor-pointer">
              <div className="mb-8 text-[#5B85D9] group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-medium tracking-wide text-white group-hover:text-blue-300 transition-colors">Detect Ayat</h3>
              <p className="text-sm leading-relaxed max-w-[280px]">
                Gunakan AI untuk mendeteksi suara bacaan Anda dan otomatis memunculkan ayat sesudahnya.
              </p>
            </Link>
            {/* Fitur 2 */}
            <Link to="/pilih-juz" className="block p-6 transition-all border border-transparent rounded-2xl hover:bg-white/5 hover:border-white/10 group cursor-pointer">
              <div className="mb-8 text-[#5B85D9] group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-medium tracking-wide text-white group-hover:text-blue-300 transition-colors">Pilih Juz</h3>
              <p className="text-sm leading-relaxed max-w-[280px]">
                Baca Al-Qur'an per Juz. Pilih dari 30 Juz dan mulai membaca dengan tampilan yang nyaman.
              </p>
            </Link>
            {/* Fitur 3 */}
            <Link to="/sambung-ayat" className="block p-6 transition-all border border-transparent rounded-2xl hover:bg-white/5 hover:border-white/10 group cursor-pointer">
              <div className="mb-8 text-[#5B85D9] group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-medium tracking-wide text-white group-hover:text-blue-300 transition-colors">Sambung Ayat</h3>
              <p className="text-sm leading-relaxed max-w-[280px]">
                Uji hafalan Anda dengan menyambung potongan ayat Al-Qur'an secara interaktif.
              </p>
            </Link>
          </div>
        </section>

        {/* --- ANALYSIS SECTION --- */}
        <section className="relative px-10 pt-48 mx-auto max-w-[1400px]">
          {/* Bintang-bintang rasi di background */}
          <div className="absolute top-20 right-40 w-full h-[400px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-40">
              <polyline points="100,200 250,150 400,280 550,220 700,50" fill="none" stroke="#5B85D9" strokeWidth="1" opacity="0.5" />
              <circle cx="100" cy="200" r="3" fill="#fff" />
              <circle cx="250" cy="150" r="4" fill="#fff" />
              <circle cx="400" cy="280" r="3" fill="#fff" />
              <circle cx="550" cy="220" r="6" fill="#fff" className="animate-pulse" />
              <circle cx="700" cy="50" r="3" fill="#fff" />
            </svg>
          </div>

          <div className="max-w-md relative z-10">
            <p className="mb-6 text-[10px] tracking-[0.2em] text-[#5B85D9] uppercase font-semibold">Analysis of your wealth</p>
            <h2 className="mb-10 text-[2.5rem] font-light leading-[1.2] text-white">
              Helping you connect the dots.<br />
              So you can see what life could look like into the future.
            </h2>
            <div className="text-[13px] leading-relaxed text-[#94A3B8] space-y-6 max-w-[400px]">
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
              <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
              <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default LandingPage;