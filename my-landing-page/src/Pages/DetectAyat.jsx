import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Square, Loader2, ArrowLeft, Volume2 } from 'lucide-react';

const DetectAyat = () => {
  const [status, setStatus] = useState('idle'); // idle, recording, analyzing, result

  // Simulasi proses
  const handleMicClick = () => {
    if (status === 'idle') {
      setStatus('recording');
    } else if (status === 'recording') {
      setStatus('analyzing');
      // Simulasi proses analisis AI (3 detik)
      setTimeout(() => {
        setStatus('result');
      }, 3000);
    }
  };

  const resetDetect = () => {
    setStatus('idle');
  };

  return (
    <div className="min-h-screen text-gray-700 bg-gradient-to-b from-[#87CEEB] via-[#B5E3F0] to-[#E8F4F8] relative overflow-x-hidden selection:bg-teal-200/40 flex flex-col">

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-10 py-6 mx-auto max-w-[1400px] w-full">
        <Link to="/" className="flex items-center gap-3 text-[#264653]/60 transition-colors hover:text-[#264653] group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Kembali</span>
        </Link>
        <Link to="/" className="text-lg font-bold text-[#264653]">Holy Verse</Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 mx-auto max-w-4xl py-10">
        
        {/* Title Section */}
        <div className="mb-16 text-center transition-all duration-500" style={{ opacity: status === 'result' ? 0 : 1, transform: status === 'result' ? 'translateY(-20px)' : 'translateY(0)', height: status === 'result' ? 0 : 'auto', overflow: 'hidden' }}>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#264653] md:text-5xl">
            Deteksi <span className="text-[#2A9D8F]">Suara Anda</span>
          </h1>
          <p className="text-[#264653]/50 max-w-lg mx-auto">
            Bacakan sebuah ayat suci Al-Qur'an, dan AI kami akan mendeteksinya serta menampilkan ayat sesudahnya.
          </p>
        </div>

        {/* Mic / Status Area */}
        {status !== 'result' && (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleMicClick}
              className={`relative flex items-center justify-center w-32 h-32 rounded-full transition-all duration-500 ${
                status === 'idle' 
                  ? 'bg-white/60 backdrop-blur-md hover:scale-105 shadow-[0_8px_40px_rgba(38,70,83,0.12)] border border-white/80 hover:border-[#264653]/20' 
                  : status === 'recording'
                  ? 'bg-red-50 shadow-[0_0_60px_rgba(239,68,68,0.3)] border border-red-300 animate-pulse'
                  : 'bg-white/40 backdrop-blur-sm border border-[#264653]/15'
              }`}
              disabled={status === 'analyzing'}
            >
              {/* Ripple Effect for Recording */}
              {status === 'recording' && (
                <>
                  <div className="absolute inset-0 rounded-full border border-red-300/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute inset-[-20px] rounded-full border border-red-200/20 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                </>
              )}
              
              {status === 'idle' && <Mic className="w-12 h-12 text-[#264653]" />}
              {status === 'recording' && <Square className="w-10 h-10 text-red-500" fill="currentColor" />}
              {status === 'analyzing' && <Loader2 className="w-12 h-12 text-[#2A9D8F] animate-spin" />}
            </button>

            <div className="mt-10 h-8 flex items-center justify-center">
              {status === 'idle' && <p className="text-sm font-semibold tracking-widest text-[#264653]/35 uppercase">Tekan untuk merekam</p>}
              {status === 'recording' && (
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                  <p className="text-sm font-semibold tracking-widest text-red-500 uppercase">Mendengarkan...</p>
                </div>
              )}
              {status === 'analyzing' && <p className="text-sm font-semibold tracking-widest text-[#2A9D8F] uppercase animate-pulse">Menganalisis Suara AI...</p>}
            </div>
          </div>
        )}

        {/* Result Area */}
        {status === 'result' && (
          <div className="w-full max-w-3xl animate-[fadeIn_0.5s_ease-out]">
            {/* Ayat yang dibaca */}
            <div className="mb-8 p-8 border rounded-3xl bg-white/50 backdrop-blur-md border-white/70 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#264653]"></div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold tracking-widest text-[#2A9D8F] uppercase">Ayat yang Anda Baca</span>
                <span className="px-3 py-1 text-xs text-[#264653]/60 bg-[#264653]/5 rounded-full font-medium">Al-Ikhlas: 1</span>
              </div>
              <div className="text-right mb-6">
                <p className="text-3xl leading-loose font-arabic text-[#264653]" dir="rtl">
                  قُلْ هُوَ اللَّهُ أَحَدٌ
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[#264653]/50">
                Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."
              </p>
            </div>

            {/* Ayat Sesudahnya */}
            <div className="p-8 border rounded-3xl bg-white/60 backdrop-blur-md border-white/80 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/10 rounded-full blur-[50px]"></div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-sm font-bold tracking-widest text-[#264653] uppercase flex items-center gap-2">
                  <Volume2 className="w-4 h-4" /> Ayat Sesudahnya
                </span>
                <span className="px-3 py-1 text-xs text-[#264653]/60 bg-[#264653]/5 rounded-full font-medium">Al-Ikhlas: 2</span>
              </div>
              <div className="text-right mb-6 relative z-10">
                <p className="text-4xl leading-[2.5] font-arabic text-[#264653]" dir="rtl">
                  اللَّهُ الصَّمَدُ
                </p>
              </div>
              <p className="text-base leading-relaxed text-[#264653]/50 relative z-10">
                Allah tempat meminta segala sesuatu.
              </p>
            </div>

            {/* Tombol Ulangi */}
            <div className="flex justify-center mt-12">
              <button 
                onClick={resetDetect}
                className="px-8 py-3 text-sm font-semibold tracking-wide text-white transition-all bg-[#264653] rounded-full hover:bg-[#1d3640] shadow-[0_4px_20px_rgba(38,70,83,0.3)] hover:shadow-[0_6px_30px_rgba(38,70,83,0.4)] flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Mic className="w-4 h-4" /> Coba Lagi
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DetectAyat;
