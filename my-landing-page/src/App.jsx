import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DetectAyat from './Pages/DetectAyat';
import PilihJuz from './Pages/PilihJuz';
import SambungAyat from './Pages/SambungAyat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/detect" element={<DetectAyat />} />
      <Route path="/pilih-juz" element={<PilihJuz />} />
      <Route path="/sambung-ayat" element={<SambungAyat />} />
    </Routes>
  );
}

export default App;
