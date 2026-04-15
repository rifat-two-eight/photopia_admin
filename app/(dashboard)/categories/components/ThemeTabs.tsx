import React from 'react';
import { Camera, Video, Edit3, Globe } from 'lucide-react';
import { ThemeOption } from '../types';

interface ThemeTabsProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
  themes: ThemeOption[];
}

export const ThemeTabs = ({ selectedTheme, onThemeChange, themes }: ThemeTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 pb-2">
      <button
        onClick={() => onThemeChange('ALL')}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          selectedTheme === 'ALL'
            ? 'bg-black text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        }`}
      >
        <Globe className="w-4 h-4" />
        All Themes
      </button>
      
      {themes.map((theme) => {
        const Icon = theme.icon;
        return (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedTheme === theme.id
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            {theme.name}
          </button>
        );
      })}
    </div>
  );
};
