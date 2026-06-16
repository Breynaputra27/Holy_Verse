import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

// Floating particles for the sky area
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 55}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1 + 'px',
      animationDuration: `${Math.random() * 3 + 3}s`,
      animationDelay: `${Math.random() * 2}s`
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="star"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay
          }}
        />
      ))}
    </div>
  );
};

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-700 relative overflow-hidden selection:bg-teal-200/40 flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg-landing.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
      <FloatingParticles />

      {/* === NAVBAR === */}
      <header className="relative z-50 w-full">
        <div className="flex items-center justify-between px-6 lg:px-12 py-5 mx-auto w-full max-w-[1400px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#264653]/15 flex items-center justify-center">
              <span className="text-lg">☪</span>
            </div>
            <span className="text-xl font-bold tracking-wide text-[#264653]">Holy Verse</span>
          </Link>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#264653]/70">
            <Link to="/" className="hover:text-[#264653] transition-colors">Beranda</Link>
            <a href="#tentang" className="hover:text-[#264653] transition-colors">Tentang Kami</a>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#264653] transition-colors">
                Program
                <svg className="w-3.5 h-3.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-52 py-2 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/sambung-ayat" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#264653] hover:bg-[#264653]/5 transition-colors">Sambung Ayat</Link>
                <Link to="/pilih-juz" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#264653] hover:bg-[#264653]/5 transition-colors">Pilih Juz</Link>
                <Link to="/detect" className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#264653] hover:bg-[#264653]/5 transition-colors">Detect Ayat</Link>
              </div>
            </div>
            <a href="#kontak" className="hover:text-[#264653] transition-colors">Kontak</a>
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-medium text-[#264653] rounded-full hover:bg-[#264653]/5 transition-colors">
              Sign in
            </button>
            <Link
              to="/sambung-ayat"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-[#264653] rounded-full hover:bg-[#1d3640] transition-all shadow-[0_4px_15px_rgba(38,70,83,0.3)] hover:shadow-[0_6px_20px_rgba(38,70,83,0.4)] hover:-translate-y-0.5"
            >
              Get Started Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-[#264653] transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#264653] transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#264653] transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-xl z-50 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col px-6 py-4 gap-1">
              <Link to="/" className="py-3 text-[#264653] font-medium border-b border-gray-100">Beranda</Link>
              <a href="#tentang" className="py-3 text-[#264653]/70 hover:text-[#264653] border-b border-gray-100">Tentang Kami</a>
              <Link to="/sambung-ayat" className="py-3 text-[#264653]/70 hover:text-[#264653] border-b border-gray-100">Sambung Ayat</Link>
              <Link to="/pilih-juz" className="py-3 text-[#264653]/70 hover:text-[#264653] border-b border-gray-100">Pilih Juz</Link>
              <Link to="/detect" className="py-3 text-[#264653]/70 hover:text-[#264653] border-b border-gray-100">Detect Ayat</Link>
              <a href="#kontak" className="py-3 text-[#264653]/70 hover:text-[#264653] border-b border-gray-100">Kontak</a>
              <div className="flex flex-col gap-2 pt-4 pb-2">
                <button className="py-2.5 text-sm font-medium text-[#264653] rounded-full border border-[#264653]/20">Sign in</button>
                <Link to="/sambung-ayat" className="py-2.5 text-sm font-semibold text-white text-center bg-[#264653] rounded-full">Get Started Now</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* === HERO SECTION === */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 text-center animate-[fadeIn_0.6s_ease-out]">

        {/* Bismillah Badge */}
        <div className="mb-8">
          <div className="inline-block px-6 py-2.5 rounded-full bg-[#264653] shadow-[0_4px_20px_rgba(38,70,83,0.25)]">
            <p className="text-lg md:text-xl font-arabic text-white tracking-wide" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#264653] leading-[1.15] max-w-3xl drop-shadow-sm">
          Bangun Kebiasaan,{' '}
          <br className="hidden sm:block" />
          Jaga Hafalan.
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mb-10 text-sm sm:text-base md:text-lg text-[#264653]/60 leading-relaxed">
          Langkah kecil setiap hari untuk interaksi yang lebih baik dengan Al-Quran.
          Mulai dari tilawah yang nyaman dibaca, hingga fitur deteksi ayat untuk menemani perjalanan murojaahmu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <Link
            to="/sambung-ayat"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-[#264653] rounded-full hover:bg-[#1d3640] transition-all shadow-[0_4px_15px_rgba(38,70,83,0.3)] hover:shadow-[0_6px_25px_rgba(38,70,83,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Lihat Program
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="#support"
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-[#264653] bg-transparent rounded-full border-2 border-[#264653]/25 hover:border-[#264653]/50 hover:bg-[#264653]/5 transition-all flex items-center justify-center gap-2"
          >
            Support Saweria
          </a>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;