import React from 'react';
import { ChevronLeft, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = ({ title, showBack = false, notifCount = 0, avatarInitial = 'R' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-green-600 px-4 py-3 flex items-center justify-between shrink-0 min-h-[56px] relative z-20">
      <div className="flex items-center gap-2.5">
        {showBack ? (
          <>
            <button 
              onClick={() => navigate(-1)} 
              className="bg-white/15 border-none rounded-full w-[34px] h-[34px] flex items-center justify-center cursor-pointer text-white shrink-0 hover:bg-white/25 transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <span className="text-white font-bold text-base">{title}</span>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] rounded-full bg-white/15 flex items-center justify-center">
              <div className="w-[17px] h-[17px] rounded-full bg-brand-red-600" />
            </div>
            <span className="text-white font-extrabold text-[18px] tracking-tight">Deshantari</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2 items-center">
        <button className="relative bg-white/15 border-none rounded-full w-[34px] h-[34px] flex items-center justify-center cursor-pointer text-white hover:bg-white/25 transition-colors">
          <Bell size={18} strokeWidth={2} />
          {notifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-brand-red-600 text-white text-[9px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 border-brand-green-600">
              {notifCount}
            </span>
          )}
        </button>
        <div className="w-[32px] h-[32px] rounded-full bg-brand-red-600 flex items-center justify-center text-white font-bold text-[13px] shadow-sm">
          {avatarInitial}
        </div>
      </div>
    </div>
  );
};
