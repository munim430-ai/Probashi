import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

const TITLES = {
  '/send':   'Send Money',
  '/social': 'Community Hub',
  '/legal':  'Legal Guardian',
  '/skills': 'Voice Skills',
  '/docs':   'Documents',
};

const HIDE_BOTTOM_NAV = ['/send', '/social', '/legal', '/skills', '/docs'];

export const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const showBack = Object.keys(TITLES).includes(path);
  const title = TITLES[path] || '';
  const showNav = !HIDE_BOTTOM_NAV.includes(path);

  return (
    <>
      {/* iOS Status Bar Mock */}
      <div className="bg-brand-green-600 pt-2 pb-1 px-6 flex justify-between items-center shrink-0 z-20">
        <span className="text-white text-xs font-bold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <svg width="14" height="10" viewBox="0 0 24 16" fill="none">
            <rect x="0" y="2" width="20" height="11" rx="2" stroke="white" fill="none" strokeWidth="2" />
            <rect x="21" y="4" width="2" height="7" rx="1" fill="white" />
            <rect x="1" y="3" width="15" height="9" rx="1" fill="white" />
          </svg>
        </div>
      </div>
      
      <Header showBack={showBack} title={title} notifCount={2} />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-neutral-100 relative z-0">
        <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
          <Outlet />
        </div>
      </main>

      {showNav && <BottomNav />}
    </>
  );
};
