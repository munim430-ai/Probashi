import React, { useState } from 'react';
import { Heart, MessageCircle, Plus, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POSTS = [
  { id: 1, user: 'Karim M.',  loc: 'Riyadh, KSA',    time: '2h ago',  text: 'Anyone know a good halal restaurant near Olaya district? New arrival, need help!', likes: 14, replies: 5,  av: 'K', color: 'bg-brand-green-600' },
  { id: 2, user: 'Nasrin A.', loc: 'Kuala Lumpur',   time: '5h ago',  text: 'My iqama was renewed in 3 days using the Deshantari legal service. Highly recommend to everyone here!', likes: 42, replies: 11, av: 'N', color: 'bg-blue-600' },
  { id: 3, user: 'Rahim S.',  loc: 'Dubai, UAE',     time: '1d ago',  text: 'Free Arabic course on Skills tab — completed module 3 today. My employer noticed already!', likes: 67, replies: 20, av: 'R', color: 'bg-purple-600' },
  { id: 4, user: 'Mina B.',   loc: 'Singapore',      time: '2d ago',  text: 'পরিবারকে মিস করছি। কিন্তু আলহামদুলিল্লাহ, এই মাসে ভালো আয় হয়েছে।', likes: 98, replies: 33, av: 'M', color: 'bg-brand-gold-600', bengali: true },
];

export const SocialHub = () => {
  const [liked, setLiked] = useState(new Set());
  const [compose, setCompose] = useState(false);
  const [text, setText] = useState('');

  const toggleLike = (id) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-full bg-neutral-100">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-green-600 to-brand-green-700 px-4 pt-4 pb-6 relative overflow-hidden shrink-0">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-red-600/25" />
        <div className="relative z-10">
          <div className="font-display text-base text-white/70 mb-1">আপনার সম্প্রদায়</div>
          <div className="text-lg font-extrabold text-white leading-snug mb-3">3,241 Bangladeshis<br/>near you</div>
          <div className="flex gap-2">
            <button
              onClick={() => setCompose(true)}
              className="bg-white text-brand-green-600 border-none rounded-lg px-3 py-2 font-bold text-xs cursor-pointer flex items-center gap-1 active:scale-95 transition-transform"
            >
              <Plus size={14} /> Post
            </button>
            <button className="bg-white/15 border border-white/30 text-white rounded-lg px-3 py-2 font-semibold text-xs cursor-pointer">
              <MapPin size={14} className="inline mr-1" />Find nearby
            </button>
          </div>
        </div>
      </div>

      {/* Compose Box */}
      <AnimatePresence>
        {compose && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-3.5 mt-3 bg-white rounded-2xl p-3.5 shadow-card"
          >
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Share with your community… (English or বাংলা)"
              className="w-full border-none outline-none resize-none text-[13px] text-neutral-900 leading-relaxed min-h-[60px] font-sans"
            />
            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-neutral-100">
              <button onClick={() => { setCompose(false); setText(''); }} className="bg-transparent border-none text-neutral-400 text-xs font-bold cursor-pointer">Cancel</button>
              <button onClick={() => { setCompose(false); setText(''); }} className="bg-brand-green-600 text-white border-none rounded-lg px-4 py-1.5 text-xs font-bold cursor-pointer">Post</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts */}
      <div className="flex flex-col gap-2.5 p-3.5 pb-6">
        {POSTS.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-3.5 shadow-card"
          >
            <div className="flex gap-2.5 mb-2.5 items-start">
              <div className={`w-9 h-9 rounded-full ${post.color} flex items-center justify-center font-bold text-sm text-white shrink-0`}>
                {post.av}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-[13px] font-bold text-neutral-900">{post.user}</span>
                  <span className="text-[11px] text-neutral-400">{post.time}</span>
                </div>
                <div className="text-[11px] text-neutral-400">{post.loc}</div>
              </div>
            </div>

            <p className={`text-[13px] text-neutral-700 leading-relaxed mb-2.5 ${post.bengali ? 'font-bengali' : 'font-sans'}`}>
              {post.text}
            </p>

            <div className="flex gap-4 pt-2 border-t border-neutral-100">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer"
              >
                <Heart
                  size={15}
                  className={liked.has(post.id) ? 'text-brand-red-600 fill-brand-red-600' : 'text-neutral-300'}
                  strokeWidth={2}
                />
                <span className={`text-xs font-bold ${liked.has(post.id) ? 'text-brand-red-600' : 'text-neutral-400'}`}>
                  {post.likes + (liked.has(post.id) ? 1 : 0)}
                </span>
              </button>
              <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer">
                <MessageCircle size={15} className="text-neutral-300" strokeWidth={2} />
                <span className="text-xs font-bold text-neutral-400">{post.replies}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
