"use client";

import { useState } from 'react';
import { useLanguageStore } from '@/store/language';
import { languages, type Language } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: Language) => {
    setLanguage(language);
    setIsOpen(false);
    document.documentElement.dir = languages[language].dir;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 px-3 py-2 rounded-lg group flex items-center gap-2">
          <Globe className="h-4 w-4 text-white group-hover:rotate-12 transition-transform" />
          <span className="text-lg">{languages[currentLanguage].flag}</span>
          <span className="hidden sm:inline-block text-sm text-white font-medium">
            {languages[currentLanguage].name}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(languages).map(([key, { name, flag }]) => (
          <DropdownMenuItem
            key={key}
            className="flex items-center gap-3 cursor-pointer py-3"
            onSelect={() => handleSelect(key as Language)}
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-lg"
            >
              {flag}
            </motion.span>
            <span className="flex-1 font-medium">{name}</span>
            {currentLanguage === key && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}