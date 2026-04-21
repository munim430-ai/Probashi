import React from 'react';
import { Home, Send, Briefcase, MoreHorizontal, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const NAV = [
  { id: '/',        label: 'Home',    icon: Home },
  { id: '/send',    label: 'Send',    icon: Send },
  { id: '/jobs',    label: 'Jobs',    icon: Briefcase },
  { id: '/more',    label: 'More',    icon: MoreHorizontal },
  { id: '/profile', label: 'Profile', icon: User },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // We'll treat sub-pages under More as active="more" in the nav
  const activePath = location.pathname;
  
  const getActiveId = () => {
    if (activePath === '/') return '/';
    if (activePath.startsWith('/send')) return '/send';
    if (activePath.startsWith('/jobs')) return '/jobs';
    if (activePath.startsWith('/profile')) return '/profile';
    return '/more';
  };
  
  const active = getActiveId();

  return (
    <div className="bg-white border-t border-neutral-200 flex shrink-0 pb-2 relative z-20">
      {NAV.map(item => {
        const isActive = active === item.id;
        const Icon = item.icon;
        return (
          <button 
            key={item.id} 
            onClick={() => navigate(item.id)} 
            className="flex-1 flex flex-col items-center gap-[3px] py-2 pt-2.5 border-none bg-transparent cursor-pointer relative"
          >
            <div className={clsx("transition-colors duration-200", isActive ? 'text-brand-green-600' : 'text-neutral-400')}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={clsx("text-[10px] font-sans transition-colors duration-200", isActive ? 'font-semibold text-brand-green-600' : 'font-medium text-neutral-400')}>
              {item.label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="w-1 h-1 rounded-full bg-brand-green-600 absolute bottom-1"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
