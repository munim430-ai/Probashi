import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Mic, FileText, Bell, Phone, Globe, HelpCircle, ChevronRight } from 'lucide-react';
import { Badge } from '../components/Badge';

const FEATURES = [
  { id: 'social',  icon: Users,    label: 'Social Hub',    labelBn: 'সামাজিক',      color: 'text-purple-600', bg: 'bg-purple-50',               badge: null },
  { id: 'legal',   icon: Shield,   label: 'Legal Guardian',labelBn: 'আইনি সাহায্য', color: 'text-blue-600',   bg: 'bg-blue-50',   badgeLabel: '1 Alert',    badgeVariant: 'danger' },
  { id: 'skills',  icon: Mic,      label: 'Voice Skills',  labelBn: 'দক্ষতা',        color: 'text-purple-600', bg: 'bg-purple-50', badgeLabel: '3 New',      badgeVariant: 'brand' },
  { id: 'docs',    icon: FileText, label: 'Documents',     labelBn: 'কাগজপত্র',     color: 'text-brand-gold-600', bg: 'bg-brand-gold-50', badgeLabel: '1 Expiring', badgeVariant: 'warning' },
];

const QUICK_LINKS = [
  { icon: Bell,       label: 'Notifications',    value: '2 unread' },
  { icon: Phone,      label: 'Emergency Hotline', value: '24/7 support' },
  { icon: Globe,      label: 'Language',          value: 'English / বাংলা' },
  { icon: HelpCircle, label: 'Help & FAQ',        value: '' },
];

export const More = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-neutral-100 min-h-full pb-6">
      <div className="p-4">
        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3 px-1">More Features</div>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className="bg-white border-none rounded-2xl p-4 shadow-card cursor-pointer flex flex-col gap-2 items-start text-left active:scale-95 transition-transform"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-900">{item.label}</div>
                  <div className="text-[11px] text-neutral-400 font-bengali mt-0.5">{item.labelBn}</div>
                </div>
                {item.badgeLabel && (
                  <Badge label={item.badgeLabel} variant={item.badgeVariant} />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-4 bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="px-4 pt-4 pb-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Quick Links</div>
          {QUICK_LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <div
                key={link.label}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50 transition-colors ${i < QUICK_LINKS.length - 1 ? 'border-b border-neutral-100' : ''}`}
              >
                <Icon size={20} className="text-neutral-400" strokeWidth={1.5} />
                <span className="flex-1 text-sm font-semibold text-neutral-900">{link.label}</span>
                {link.value && <span className="text-xs text-neutral-400">{link.value}</span>}
                <ChevronRight size={16} className="text-neutral-300" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
