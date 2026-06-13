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
    <div className="min-h-screen text-gray-200 bg-gradient-to-b from-[#121B43] via-[#0A0F24] to-[#040611] relative overflow-x-hidden selection:bg-blue-500/30 flex flex-col">
      {/* Background Bintang */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
        <div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_15px_white]"></div>
        <div className="absolute bottom-[30%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-10 py-8 mx-auto max-w-[1400px] w-full">
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
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 mx-auto max-w-4xl py-10">
        
        {/* Title Section */}
        <div className="mb-16 text-center transition-all duration-500" style={{ opacity: status === 'result' ? 0 : 1, transform: status === 'result' ? 'translateY(-20px)' : 'translateY(0)', height: status === 'result' ? 0 : 'auto', overflow: 'hidden' }}>
          <h1 className="mb-4 text-4xl font-light tracking-wide text-white md:text-5xl">
            Deteksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B85D9] to-purple-400">Suara Anda</span>
          </h1>
          <p className="text-[#94A3B8] max-w-lg mx-auto">
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
                  ? 'bg-gradient-to-br from-[#1E2A5E] to-[#111A42] hover:scale-105 shadow-[0_0_40px_rgba(30,42,94,0.5)] border border-white/10' 
                  : status === 'recording'
                  ? 'bg-gradient-to-br from-red-500/20 to-red-900/40 shadow-[0_0_60px_rgba(239,68,68,0.4)] border border-red-500/50 animate-pulse'
                  : 'bg-[#0A0F24] border border-[#5B85D9]/30'
              }`}
              disabled={status === 'analyzing'}
            >
              {/* Ripple Effect for Recording */}
              {status === 'recording' && (
                <>
                  <div className="absolute inset-0 rounded-full border border-red-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute inset-[-20px] rounded-full border border-red-500/10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                </>
              )}
              
              {status === 'idle' && <Mic className="w-12 h-12 text-white" />}
              {status === 'recording' && <Square className="w-10 h-10 text-red-400" fill="currentColor" />}
              {status === 'analyzing' && <Loader2 className="w-12 h-12 text-[#5B85D9] animate-spin" />}
            </button>

            <div className="mt-10 h-8 flex items-center justify-center">
              {status === 'idle' && <p className="text-sm font-medium tracking-widest text-[#94A3B8] uppercase">Tekan untuk merekam</p>}
              {status === 'recording' && (
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                  <p className="text-sm font-medium tracking-widest text-red-400 uppercase">Mendengarkan...</p>
                </div>
              )}
              {status === 'analyzing' && <p className="text-sm font-medium tracking-widest text-[#5B85D9] uppercase animate-pulse">Menganalisis Suara AI...</p>}
            </div>
          </div>
        )}

        {/* Result Area */}
        {status === 'result' && (
          <div className="w-full max-w-3xl animate-[fadeIn_0.5s_ease-out]">
            {/* Ayat yang dibaca */}
            <div className="mb-8 p-8 border rounded-3xl bg-white/[0.02] border-white/5 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#5B85D9]"></div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold tracking-widest text-[#5B85D9] uppercase">Ayat yang Anda Baca</span>
                <span className="px-3 py-1 text-xs text-white bg-white/10 rounded-full">Al-Ikhlas: 1</span>
              </div>
              <div className="text-right mb-6">
                <p className="text-3xl leading-loose font-arabic text-white" dir="rtl">
                  قُلْ هُوَ اللَّهُ أَحَدٌ
                </p>
              </div>
              <p className="text-sm leading-relaxed text-[#94A3B8]">
                Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."
              </p>
            </div>

            {/* Ayat Sesudahnya */}
            <div className="p-8 border rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 backdrop-blur-md relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px]"></div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-sm font-bold tracking-widest text-purple-400 uppercase flex items-center gap-2">
                  <Volume2 className="w-4 h-4" /> Ayat Sesudahnya
                </span>
                <span className="px-3 py-1 text-xs text-white bg-white/10 rounded-full">Al-Ikhlas: 2</span>
              </div>
              <div className="text-right mb-6 relative z-10">
                <p className="text-4xl leading-[2.5] font-arabic text-white" dir="rtl">
                  اللَّهُ الصَّمَدُ
                </p>
              </div>
              <p className="text-base leading-relaxed text-[#B0BACD] relative z-10">
                Allah tempat meminta segala sesuatu.
              </p>
            </div>

            {/* Tombol Ulangi */}
            <div className="flex justify-center mt-12">
              <button 
                onClick={resetDetect}
                className="px-8 py-3 text-sm font-medium tracking-wide text-white transition-all bg-transparent border border-white/20 rounded-full hover:bg-white/10 flex items-center gap-2"
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
