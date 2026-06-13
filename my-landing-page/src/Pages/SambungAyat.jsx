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

// Mini StarrySky
const MiniStars = () => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const newStars = Array.from({ length: 60 }).map((_, i) => ({
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
        <div key={star.id} className="star" style={{ top: star.top, left: star.left, width: star.size, height: star.size, animationDuration: star.animationDuration, animationDelay: star.animationDelay }} />
      ))}
    </div>
  );
};

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
    <div className="min-h-screen text-gray-200 bg-gradient-to-b from-[#121B43] via-[#0A0F24] to-[#040611] relative overflow-x-hidden selection:bg-blue-500/30 flex flex-col">
      <MiniStars />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 md:px-10 py-8 mx-auto max-w-[1400px] w-full">
        {phase === 'select-juz' ? (
          <Link to="/" className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">Kembali</span>
          </Link>
        ) : (
          <button onClick={phase === 'result' ? handleRestart : () => { setPhase('select-juz'); }} className="flex items-center gap-3 text-gray-400 transition-colors hover:text-white group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide">{phase === 'result' ? 'Pilih Juz Lain' : 'Ganti Juz'}</span>
          </button>
        )}
        <div className="flex items-end gap-[3px]">
          <div className="w-1.5 h-3 bg-white rounded-sm"></div>
          <div className="w-1.5 h-5 bg-white rounded-sm"></div>
          <div className="w-1.5 h-4 bg-white rounded-sm"></div>
        </div>
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
              <h1 className="mb-4 text-4xl font-light tracking-wide text-white md:text-5xl">
                Sambung <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B85D9] to-purple-400">Ayat</span>
              </h1>
              <p className="text-[#94A3B8] max-w-lg mx-auto md:mx-0">
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
                <div key={idx} className="flex items-start gap-3 p-4 border rounded-2xl bg-white/[0.02] border-white/[0.06]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#5B85D9]/10 border border-[#5B85D9]/15 shrink-0">
                    <step.icon className="w-5 h-5 text-[#5B85D9]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-0.5">{step.title}</p>
                    <p className="text-[11px] text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Juz Selector Label */}
            <p className="mb-6 text-xs tracking-widest text-[#5B85D9] uppercase font-semibold">
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
                    bg-white/[0.02] border-white/[0.06]
                    hover:bg-white/[0.07] hover:border-[#5B85D9]/30 hover:shadow-[0_4px_24px_rgba(91,133,217,0.15)]
                    hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-lg font-semibold text-white group-hover:text-[#5B85D9] transition-colors">{juz.number}</span>
                  <span className="text-[9px] text-gray-600 mt-1 truncate max-w-full group-hover:text-gray-400 transition-colors">{juz.name}</span>
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
                <p className="text-[10px] tracking-[0.2em] text-[#5B85D9] uppercase font-semibold mb-1">Juz {selectedJuz.number} — {selectedJuz.name}</p>
                <h2 className="text-2xl font-light text-white">Soal {currentQuestion + 1} <span className="text-gray-600 text-lg">/ {totalQuestions}</span></h2>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span className="font-semibold">{score}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{currentQuestion + 1}/{totalQuestions}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-1.5 mb-10 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#5B85D9] to-purple-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="relative p-8 md:p-10 mb-8 border rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 backdrop-blur-md overflow-hidden">
              {/* Decorative */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5B85D9]/10 rounded-full blur-[50px]"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/10 rounded-full blur-[40px]"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.2em] text-[#5B85D9] uppercase font-semibold">Sambung ayat berikut</span>
                  <span className="px-3 py-1 text-[11px] text-gray-300 bg-white/10 rounded-full">{question.surahInfo}</span>
                </div>

                {/* Ayat Fragment */}
                <div className="text-center py-6">
                  <p className="text-4xl md:text-5xl leading-[2] text-white font-arabic" dir="rtl">
                    {question.ayatFragment}
                  </p>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {question.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let cardStyle = 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.18]';
                let textStyle = 'text-gray-200';
                let letterStyle = 'bg-white/[0.06] border-white/[0.1] text-gray-400';
                let iconEl = null;

                if (showAnswer) {
                  if (option.isCorrect) {
                    cardStyle = 'bg-emerald-500/[0.08] border-emerald-500/30';
                    textStyle = 'text-emerald-300';
                    letterStyle = 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400';
                    iconEl = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
                  } else if (selectedAnswer === option.id) {
                    cardStyle = 'bg-red-500/[0.08] border-red-500/30';
                    textStyle = 'text-red-300';
                    letterStyle = 'bg-red-500/20 border-red-500/30 text-red-400';
                    iconEl = <XCircle className="w-5 h-5 text-red-400 shrink-0" />;
                  } else {
                    cardStyle = 'bg-white/[0.01] border-white/[0.04] opacity-50';
                    textStyle = 'text-gray-500';
                    letterStyle = 'bg-white/[0.03] border-white/[0.05] text-gray-600';
                  }
                }

                return (
                  <button
                    key={option.id}
                    id={`answer-${option.id}`}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={showAnswer}
                    className={`relative flex items-center gap-4 p-5 text-left border rounded-2xl transition-all duration-300 group ${cardStyle} ${!showAnswer ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
                  >
                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-semibold shrink-0 transition-colors ${letterStyle}`}>
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
                  className="flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-all rounded-full bg-gradient-to-r from-[#1E2A5E] to-[#2A3479] hover:from-[#263570] hover:to-[#344090] shadow-[0_4px_20px_rgba(30,42,94,0.4)] hover:shadow-[0_6px_30px_rgba(30,42,94,0.6)] hover:-translate-y-0.5"
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
            <div className="relative p-10 mb-8 border rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 backdrop-blur-md overflow-hidden">
              {/* Decorative glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#5B85D9]/15 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px]"></div>

              <div className="relative z-10">
                {/* Trophy Icon */}
                <div className="flex items-center justify-center mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/20">
                  <Trophy className={`w-10 h-10 ${scorePercent >= 80 ? 'text-amber-400' : scorePercent >= 50 ? 'text-[#5B85D9]' : 'text-gray-400'}`} />
                </div>

                {/* Score */}
                <p className="text-[10px] tracking-[0.2em] text-[#5B85D9] uppercase font-semibold mb-2">Hasil Anda</p>
                <h2 className="text-6xl font-light text-white mb-2">
                  {score}<span className="text-2xl text-gray-500">/{totalQuestions}</span>
                </h2>
                <p className="text-lg text-gray-400 mb-6">{scorePercent}% Benar</p>

                {/* Verdict */}
                <div className={`inline-block px-5 py-2 rounded-full text-sm font-medium mb-8 ${
                  scorePercent >= 80 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : scorePercent >= 50 ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    : 'bg-red-500/15 text-red-400 border border-red-500/20'
                }`}>
                  {scorePercent >= 80 ? '🌟 Luar Biasa!' : scorePercent >= 50 ? '💪 Bagus, terus berlatih!' : '📖 Ayo perbanyak hafalan!'}
                </div>

                {/* Ornament */}
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#5B85D9]/30"></div>
                  <Star className="w-4 h-4 mx-3 text-[#5B85D9]/30" />
                  <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#5B85D9]/30"></div>
                </div>

                {/* Stats Row */}
                <div className="flex justify-center gap-8 mb-8">
                  <div>
                    <p className="text-2xl font-semibold text-emerald-400">{score}</p>
                    <p className="text-[10px] tracking-widest text-gray-500 uppercase mt-1">Benar</p>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div>
                    <p className="text-2xl font-semibold text-red-400">{totalQuestions - score}</p>
                    <p className="text-[10px] tracking-widest text-gray-500 uppercase mt-1">Salah</p>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div>
                    <p className="text-2xl font-semibold text-[#5B85D9]">{totalQuestions}</p>
                    <p className="text-[10px] tracking-widest text-gray-500 uppercase mt-1">Total</p>
                  </div>
                </div>

                {/* Juz Info */}
                <p className="text-xs text-gray-600">Juz {selectedJuz.number} — {selectedJuz.name}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                id="retry-quiz"
                onClick={handleRetryJuz}
                className="flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium tracking-wide text-white transition-all rounded-full bg-gradient-to-r from-[#1E2A5E] to-[#2A3479] hover:from-[#263570] hover:to-[#344090] shadow-[0_4px_20px_rgba(30,42,94,0.4)] hover:shadow-[0_6px_30px_rgba(30,42,94,0.6)] hover:-translate-y-0.5"
              >
                <RotateCcw className="w-4 h-4" /> Coba Lagi
              </button>
              <button
                id="change-juz"
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium tracking-wide text-gray-300 transition-all rounded-full border border-white/15 hover:bg-white/5 hover:text-white"
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
