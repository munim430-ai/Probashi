import React, { useState, useRef } from 'react';
import { Mic, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/Badge';

const COURSES = [
  { lang: 'Arabic',  flag: '🇸🇦', level: 'Beginner',     progress: 65, color: 'text-brand-green-600', bg: 'bg-brand-green-50', barColor: 'bg-brand-green-600' },
  { lang: 'Malay',   flag: '🇲🇾', level: 'Intermediate', progress: 30, color: 'text-blue-600',         bg: 'bg-blue-50',        barColor: 'bg-blue-600' },
  { lang: 'English', flag: '🇬🇧', level: 'Advanced',     progress: 82, color: 'text-purple-600',       bg: 'bg-purple-50',      barColor: 'bg-purple-600' },
];

const SKILLS = [
  { emoji: '🔧', title: 'Electrical Safety', badge: 'Cert',    color: 'text-brand-gold-600', bg: 'bg-brand-gold-50' },
  { emoji: '💰', title: 'Financial Literacy', badge: 'New',    color: 'text-brand-green-600', bg: 'bg-brand-green-50' },
  { emoji: '🏥', title: 'First Aid Basics',  badge: 'Popular', color: 'text-brand-red-600',  bg: 'bg-brand-red-50' },
  { emoji: '📱', title: 'Digital Skills',    badge: 'Free',    color: 'text-blue-600',        bg: 'bg-blue-50' },
];

const LessonView = ({ course, onBack }) => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const timerRef = useRef(null);

  const startRec = () => {
    setRecording(true);
    setTranscript('');
    let count = 0;
    timerRef.current = setInterval(() => {
      count++;
      if (count >= 4) {
        clearInterval(timerRef.current);
        setRecording(false);
        setTranscript('مرحباً، كيف حالك؟ (Hello, how are you?)');
      }
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-full bg-neutral-100">
      <button
        onClick={onBack}
        className="m-4 mb-0 bg-white border-none rounded-lg p-2.5 flex items-center gap-2 cursor-pointer font-sans text-xs font-bold text-neutral-600 shadow-sm w-fit"
      >
        <ChevronLeft size={16} strokeWidth={2.5} /> Back to Skills
      </button>

      <div className="p-4 flex flex-col gap-3">
        {/* Course Header */}
        <div
          className="rounded-2xl p-5 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
        >
          <div className={`rounded-2xl p-5 text-white -m-5 ${course.bg.replace('bg-', 'bg-').replace('-50', '-600')}`}
            style={{ background: course.barColor.replace('bg-', '#').includes('#') ? undefined : undefined }}
          >
            <div className={`rounded-2xl p-5 -m-0`} style={{background: course.barColor === 'bg-brand-green-600' ? '#006400' : course.barColor === 'bg-blue-600' ? '#2563eb' : '#9333ea'}}>
              <div className="text-3xl mb-2">{course.flag}</div>
              <div className="text-lg font-extrabold">{course.lang} · {course.level}</div>
              <div className="text-xs opacity-70 mt-0.5">Module 8 of 12</div>
              <div className="mt-3 bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${course.progress}%` }} />
              </div>
              <div className="text-[11px] opacity-70 mt-1">{course.progress}% complete</div>
            </div>
          </div>
        </div>

        {/* Voice Practice */}
        <div className="bg-white rounded-2xl p-5 shadow-card text-center">
          <div className="text-[11px] font-bold text-neutral-400 tracking-widest uppercase mb-2">Voice Practice</div>
          <div className="text-sm font-bold text-neutral-900 mb-1">Repeat this phrase:</div>
          <div className="text-2xl font-extrabold mb-5" style={{ fontFamily: 'serif', color: '#006400' }}>
            مرحباً كيف حالك
          </div>

          <motion.button
            onClick={startRec}
            disabled={recording}
            animate={{ scale: recording ? [1, 1.08, 1] : 1 }}
            transition={{ repeat: recording ? Infinity : 0, duration: 0.5 }}
            className="w-[72px] h-[72px] rounded-full border-none cursor-pointer flex items-center justify-center mx-auto text-white shadow-elevated"
            style={{ background: recording ? '#CE1126' : '#006400' }}
          >
            <Mic size={26} />
          </motion.button>

          {recording && <div className="text-xs font-bold text-brand-red-600 mt-3">Listening…</div>}

          <AnimatePresence>
            {transcript && !recording && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 bg-brand-green-50 rounded-xl p-3 text-[13px] font-bold text-brand-green-600"
              >
                ✓ Recognized: {transcript}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export const VoiceSkills = () => {
  const [lesson, setLesson] = useState(null);

  if (lesson !== null) {
    return <LessonView course={COURSES[lesson]} onBack={() => setLesson(null)} />;
  }

  return (
    <div className="flex flex-col min-h-full bg-neutral-100">
      {/* Hero */}
      <div className="px-4 pt-4 pb-6 relative overflow-hidden shrink-0" style={{ background: 'linear-gradient(135deg, #7C3AED, #5b21b6)' }}>
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-red-600/20" />
        <div className="relative z-10">
          <div className="font-display text-base text-white/70 mb-1">দক্ষতা বাড়ান</div>
          <div className="text-[17px] font-extrabold text-white leading-snug">Voice Language Training</div>
          <div className="text-xs text-white/70 mt-1">Speak. Get feedback. Grow.</div>
        </div>
      </div>

      <div className="p-3.5 flex flex-col gap-3 pb-6">
        {/* Language Courses */}
        <div>
          <div className="text-[13px] font-bold text-neutral-900 mb-2.5">Language Courses</div>
          <div className="flex flex-col gap-2">
            {COURSES.map((course, i) => (
              <button
                key={course.lang}
                onClick={() => setLesson(i)}
                className="bg-white rounded-xl p-3.5 shadow-card flex items-center gap-3 cursor-pointer border-none w-full text-left active:scale-95 transition-transform"
              >
                <div className={`w-11 h-11 rounded-xl ${course.bg} flex items-center justify-center text-2xl shrink-0`}>
                  {course.flag}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-neutral-900">{course.lang}</span>
                    <span className={`text-xs font-bold ${course.color}`}>{course.progress}%</span>
                  </div>
                  <div className="text-xs text-neutral-400 mb-1.5">{course.level}</div>
                  <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className={`h-full ${course.barColor} rounded-full`} style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral-300 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Vocational Skills */}
        <div>
          <div className="text-[13px] font-bold text-neutral-900 mb-2.5">Vocational Skills</div>
          <div className="grid grid-cols-2 gap-2.5">
            {SKILLS.map(s => (
              <div key={s.title} className={`${s.bg} rounded-xl p-3.5 cursor-pointer active:scale-95 transition-transform`}>
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div className={`text-xs font-bold leading-snug ${s.color}`}>{s.title}</div>
                <span className="text-[10px] font-bold bg-white/60 px-2 py-0.5 rounded-full mt-2 inline-block" style={{ color: 'inherit' }}>
                  {s.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
