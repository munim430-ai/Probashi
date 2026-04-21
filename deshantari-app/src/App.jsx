import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SendMoney } from './pages/SendMoney';
import { Jobs } from './pages/Jobs';
import { Profile } from './pages/Profile';
import { More } from './pages/More';
import { SocialHub } from './pages/SocialHub';
import { LegalGuardian } from './pages/LegalGuardian';
import { VoiceSkills } from './pages/VoiceSkills';
import { Documents } from './pages/Documents';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="send"    element={<SendMoney />} />
          <Route path="jobs"    element={<Jobs />} />
          <Route path="more"    element={<More />} />
          <Route path="profile" element={<Profile />} />
          <Route path="social"  element={<SocialHub />} />
          <Route path="legal"   element={<LegalGuardian />} />
          <Route path="skills"  element={<VoiceSkills />} />
          <Route path="docs"    element={<Documents />} />
          <Route path="*"       element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
