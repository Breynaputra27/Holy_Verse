import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight, Trophy, Clock, Zap, CheckCircle2, XCircle, RotateCcw, Star, HelpCircle, ArrowRight } from 'lucide-react';

// Data juz (ringkas)
const juzList = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: [
    'Alif Lam Mim', 'Sayaqul', 'Tilkar Rusul', 'Lan Tanaalu', 'Wal Muhsanat',
    'La Yuhibbullah', "Wa Idza Sami'u", 'Wa Lau Annana', "Qalal Mala'u", "Wa A'lamu",
    "Ya'tadziruna", 'Wa Ma Min Daabbah', "Wa Ma Ubarri'u", 'Rubama', 'Subhanallazi',
    'Qal Alam', 'Iqtaraba', 'Qad Aflaha', 'Wa Qalalladzina', 'Amman Khalaqa',
    'Utlu Ma Uhiya', 'Wa Man Yaqnut', 'Wa Mali', 'Faman Azlamu', 'Ilaihi Yuraddu',
    'Ha Mim', 'Qala Fama Khathbukum', "Qad Sami'allah", 'Tabarakallazi', "Amma Yatasa'alun"
  ][i]
}));

// Mock soal placeholder
const mockQuestions = [
  {
    id: 1,
    ayatFragment: 'بِسْمِ اللَّهِ الرَّحْمَنِ ...',
    surahInfo: 'Al-Fatihah: 1',
    options: [
      { id: 'a', text: 'الرَّحِيمِ', isCorrect: true },
      { id: 'b', text: 'الْعَالَمِينَ', isCorrect: false },
      { id: 'c', text: 'الدِّينِ', isCorrect: false },
      { id: 'd', text: 'نَسْتَعِينُ', isCorrect: false },
    ],
  },
  {
    id: 2,
    ayatFragment: 'الْحَمْدُ لِلَّهِ رَبِّ ...',
    surahInfo: 'Al-Fatihah: 2',
    options: [
      { id: 'a', text: 'الرَّحِيمِ', isCorrect: false },
      { id: 'b', text: 'الْعَالَمِينَ', isCorrect: true },
      { id: 'c', text: 'الدِّينِ', isCorrect: false },
      { id: 'd', text: 'الْمُسْتَقِيمَ', isCorrect: false },
    ],
  },
  {
    id: 3,
    ayatFragment: 'مَالِكِ يَوْمِ ...',
    surahInfo: 'Al-Fatihah: 4',
    options: [
      { id: 'a', text: 'الرَّحِيمِ', isCorrect: false },
      { id: 'b', text: 'الْعَالَمِينَ', isCorrect: false },
      { id: 'c', text: 'الدِّينِ', isCorrect: true },
      { id: 'd', text: 'نَسْتَعِينُ', isCorrect: false },
    ],
  },
  {
    id: 4,
    ayatFragment: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ ...',
    surahInfo: 'Al-Fatihah: 5',
    options: [
      { id: 'a', text: 'نَسْتَعِينُ', isCorrect: true },
      { id: 'b', text: 'الْمُسْتَقِيمَ', isCorrect: false },
      { id: 'c', text: 'الضَّالِّينَ', isCorrect: false },
      { id: 'd', text: 'الدِّينِ', isCorrect: false },
    ],
  },
  {
    id: 5,
    ayatFragment: 'اهْدِنَا الصِّرَاطَ ...',
    surahInfo: 'Al-Fatihah: 6',
    options: [
      { id: 'a', text: 'الرَّحِيمِ', isCorrect: false },
      { id: 'b', text: 'الْمُسْتَقِيمَ', isCorrect: true },
      { id: 'c', text: 'الْعَالَمِينَ', isCorrect: false },
      { id: 'd', text: 'نَسْتَعِينُ', isCorrect: false },
    ],
  },
];

const SambungAyat = () => {
  const [phase, setPhase] = useState('select-juz'); // select-juz | quiz | result
  const [selectedJuz, setSelectedJuz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]); // track semua jawaban

  const totalQuestions = mockQuestions.length;

  const handleSelectJuz = (juz) => {
    setSelectedJuz(juz);
    setPhase('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleSelectAnswer = (option) => {
    if (showAnswer) return; // sudah dijawab
    setSelectedAnswer(option.id);
    setShowAnswer(true);
    const isCorrect = option.isCorrect;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, { questionId: mockQuestions[currentQuestion].id, answerId: option.id, isCorrect }]);
  };

  const handleNext = () => {
    if (currentQuestion + 1 >= totalQuestions) {
      setPhase('result');
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setPhase('select-juz');
    setSelectedJuz(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleRetryJuz = () => {
    setPhase('quiz');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const question = mockQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + (showAnswer ? 1 : 0)) / totalQuestions) * 100;
  const scorePercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen text-gray-700 bg-gradient-to-b from-[#87CEEB] via-[#B5E3F0] to-[#E8F4F8] relative overflow-x-hidden selection:bg-teal-200/40 flex flex-col">

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-10 py-6 mx-auto max-w-[1400px] w-full">
        {phase === 'select-juz' ? (
          <Link to="/" className="flex items-center gap-3 text-[#264653]/60 transition-colors hover:text-[#264653] group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">Kembali</span>
          </Link>
        ) : (
          <button onClick={phase === 'result' ? handleRestart : () => { setPhase('select-juz'); }} className="flex items-center gap-3 text-[#264653]/60 transition-colors hover:text-[#264653] group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">{phase === 'result' ? 'Pilih Juz Lain' : 'Ganti Juz'}</span>
          </button>
        )}
        <Link to="/" className="text-lg font-bold text-[#264653]">Holy Verse</Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 w-full px-6 md:px-10 mx-auto max-w-[1400px] pb-20">

        {/* ======================== */}
        {/* PHASE 1: SELECT JUZ     */}
        {/* ======================== */}
        {phase === 'select-juz' && (
          <div className="animate-[fadeIn_0.4s_ease-out]">
            {/* Title */}
            <div className="mb-12 text-center md:text-left">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#264653] md:text-5xl">
                Sambung <span className="text-[#2A9D8F]">Ayat</span>
              </h1>
              <p className="text-[#264653]/50 max-w-lg mx-auto md:mx-0">
                Uji hafalan Anda! Pilih Juz yang ingin diuji, lalu sambung ayat yang ditampilkan.
              </p>
            </div>

            {/* How it works */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl">
              {[
                { icon: BookOpen, title: 'Pilih Juz', desc: 'Tentukan juz yang ingin diuji' },
                { icon: HelpCircle, title: 'Jawab Soal', desc: 'Sambung potongan ayat yang muncul' },
                { icon: Trophy, title: 'Lihat Skor', desc: 'Pantau progres hafalan Anda' },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border rounded-2xl bg-white/60 backdrop-blur-sm border-white/80 shadow-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#264653]/10 border border-[#264653]/15 shrink-0">
                    <step.icon className="w-5 h-5 text-[#264653]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#264653] mb-0.5">{step.title}</p>
                    <p className="text-[11px] text-[#264653]/40">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Juz Selector Label */}
            <p className="mb-6 text-xs tracking-widest text-[#2A9D8F] uppercase font-bold">
              Pilih Juz untuk memulai
            </p>

            {/* Juz Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3">
              {juzList.map((juz) => (
                <button
                  key={juz.number}
                  id={`sambung-juz-${juz.number}`}
                  onClick={() => handleSelectJuz(juz)}
                  className="group relative flex flex-col items-center justify-center p-4 border rounded-2xl transition-all duration-300
                    bg-white/50 backdrop-blur-sm border-white/70 shadow-sm
                    hover:bg-white/80 hover:border-[#264653]/20 hover:shadow-[0_4px_24px_rgba(38,70,83,0.12)]
                    hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-lg font-bold text-[#264653] group-hover:text-[#2A9D8F] transition-colors">{juz.number}</span>
                  <span className="text-[9px] text-[#264653]/30 mt-1 truncate max-w-full group-hover:text-[#264653]/50 transition-colors">{juz.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======================== */}
        {/* PHASE 2: QUIZ           */}
        {/* ======================== */}
        {phase === 'quiz' && question && (
          <div className="max-w-2xl mx-auto animate-[fadeIn_0.4s_ease-out]">
            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-[#2A9D8F] uppercase font-bold mb-1">Juz {selectedJuz.number} — {selectedJuz.name}</p>
                <h2 className="text-2xl font-bold text-[#264653]">Soal {currentQuestion + 1} <span className="text-[#264653]/30 text-lg font-normal">/ {totalQuestions}</span></h2>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-[#2A9D8F]">
                  <Zap className="w-4 h-4" />
                  <span className="font-bold">{score}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#264653]/30">
                  <Clock className="w-4 h-4" />
                  <span>{currentQuestion + 1}/{totalQuestions}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-1.5 mb-10 rounded-full bg-white/60 overflow-hidden shadow-inner">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#264653] to-[#2A9D8F] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="relative p-8 md:p-10 mb-8 border rounded-3xl bg-white/60 backdrop-blur-md border-white/80 shadow-lg overflow-hidden">
              {/* Decorative */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2A9D8F]/10 rounded-full blur-[50px]"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#264653]/5 rounded-full blur-[40px]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.2em] text-[#2A9D8F] uppercase font-bold">Sambung ayat berikut</span>
                  <span className="px-3 py-1 text-[11px] text-[#264653]/60 bg-[#264653]/5 rounded-full font-medium">{question.surahInfo}</span>
                </div>

                {/* Ayat Fragment */}
                <div className="text-center py-6">
                  <p className="text-4xl md:text-5xl leading-[2] text-[#264653] font-arabic" dir="rtl">
                    {question.ayatFragment}
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {question.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let cardStyle = 'bg-white/50 backdrop-blur-sm border-white/70 hover:bg-white/80 hover:border-[#264653]/20';
                let textStyle = 'text-[#264653]';
                let letterStyle = 'bg-[#264653]/5 border-[#264653]/10 text-[#264653]/50';
                let iconEl = null;

                if (showAnswer) {
                  if (option.isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-300';
                    textStyle = 'text-emerald-700';
                    letterStyle = 'bg-emerald-100 border-emerald-300 text-emerald-600';
                    iconEl = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
                  } else if (selectedAnswer === option.id) {
                    cardStyle = 'bg-red-50 border-red-300';
                    textStyle = 'text-red-700';
                    letterStyle = 'bg-red-100 border-red-300 text-red-500';
                    iconEl = <XCircle className="w-5 h-5 text-red-500 shrink-0" />;
                  } else {
                    cardStyle = 'bg-white/30 border-white/40 opacity-50';
                    textStyle = 'text-gray-400';
                    letterStyle = 'bg-gray-50 border-gray-200 text-gray-300';
                  }
                }

                return (
                  <button
                    key={option.id}
                    id={`answer-${option.id}`}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={showAnswer}
                    className={`relative flex items-center gap-4 p-5 text-left border rounded-2xl transition-all duration-300 group shadow-sm ${cardStyle} ${!showAnswer ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
                  >
                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-bold shrink-0 transition-colors ${letterStyle}`}>
                      {letter}
                    </div>
                    <p className={`text-xl font-arabic flex-1 transition-colors ${textStyle}`} dir="rtl">
                      {option.text}
                    </p>
                    {iconEl}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {showAnswer && (
              <div className="flex justify-center animate-[fadeIn_0.3s_ease-out]">
                <button
                  id="next-question"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all rounded-full bg-[#264653] hover:bg-[#1d3640] shadow-[0_4px_20px_rgba(38,70,83,0.3)] hover:shadow-[0_6px_30px_rgba(38,70,83,0.4)] hover:-translate-y-0.5"
                >
                  {currentQuestion + 1 >= totalQuestions ? (
                    <>Lihat Hasil <Trophy className="w-4 h-4" /></>
                  ) : (
                    <>Soal Berikutnya <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================== */}
        {/* PHASE 3: RESULT         */}
        {/* ======================== */}
        {phase === 'result' && (
          <div className="max-w-lg mx-auto text-center animate-[fadeIn_0.5s_ease-out]">
            {/* Result Card */}
            <div className="relative p-10 mb-8 border rounded-3xl bg-white/60 backdrop-blur-md border-white/80 shadow-lg overflow-hidden">
              {/* Decorative glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#2A9D8F]/10 rounded-full blur-[80px]"></div>

              <div className="relative z-10">
                {/* Trophy Icon */}
                <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-yellow-50 border border-amber-200">
                  <Trophy className={`w-10 h-10 ${scorePercent >= 80 ? 'text-amber-500' : scorePercent >= 50 ? 'text-[#2A9D8F]' : 'text-gray-400'}`} />
                </div>

                {/* Score */}
                <p className="text-[10px] tracking-[0.2em] text-[#2A9D8F] uppercase font-bold mb-2">Hasil Anda</p>
                <h2 className="text-6xl font-extrabold text-[#264653] mb-2">
                  {score}<span className="text-2xl text-[#264653]/30 font-normal">/{totalQuestions}</span>
                </h2>
                <p className="text-lg text-[#264653]/40 mb-6">{scorePercent}% Benar</p>

                {/* Verdict */}
                <div className={`inline-block px-5 py-2 rounded-full text-sm font-semibold mb-8 ${
                  scorePercent >= 80 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : scorePercent >= 50 ? 'bg-amber-50 text-amber-600 border border-amber-200'
                    : 'bg-red-50 text-red-500 border border-red-200'
                }`}>
                  {scorePercent >= 80 ? '🌟 Luar Biasa!' : scorePercent >= 50 ? '💪 Bagus, terus berlatih!' : '📖 Ayo perbanyak hafalan!'}
                </div>

                {/* Ornament */}
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#264653]/15"></div>
                  <Star className="w-4 h-4 mx-3 text-[#264653]/15" />
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#264653]/15"></div>
                </div>

                {/* Stats Row */}
                <div className="flex justify-center gap-8 mb-8">
                  <div>
                    <p className="text-2xl font-bold text-emerald-500">{score}</p>
                    <p className="text-[10px] tracking-widest text-[#264653]/30 uppercase mt-1">Benar</p>
                  </div>
                  <div className="w-px bg-[#264653]/10"></div>
                  <div>
                    <p className="text-2xl font-bold text-red-400">{totalQuestions - score}</p>
                    <p className="text-[10px] tracking-widest text-[#264653]/30 uppercase mt-1">Salah</p>
                  </div>
                  <div className="w-px bg-[#264653]/10"></div>
                  <div>
                    <p className="text-2xl font-bold text-[#2A9D8F]">{totalQuestions}</p>
                    <p className="text-[10px] tracking-widest text-[#264653]/30 uppercase mt-1">Total</p>
                  </div>
                </div>

                {/* Juz Info */}
                <p className="text-xs text-[#264653]/30">Juz {selectedJuz.number} — {selectedJuz.name}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                id="retry-quiz"
                onClick={handleRetryJuz}
                className="flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all rounded-full bg-[#264653] hover:bg-[#1d3640] shadow-[0_4px_20px_rgba(38,70,83,0.3)] hover:shadow-[0_6px_30px_rgba(38,70,83,0.4)] hover:-translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" /> Coba Lagi
              </button>
              <button
                id="change-juz"
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide text-[#264653] transition-all rounded-full border-2 border-[#264653]/20 hover:bg-[#264653]/5 hover:border-[#264653]/40"
              >
                <BookOpen className="w-4 h-4" /> Pilih Juz Lain
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default SambungAyat;
