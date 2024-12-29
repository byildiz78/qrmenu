"use client";

import { Logo } from '@/components/layout/logo';
import { ColorPicker } from '@/components/theme/color-picker';
import { SearchDialog } from '@/components/search/search-dialog';
import { LanguageSwitcher } from '@/components/language/language-switcher';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 h-16 z-50"
    >
      <div className="relative h-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm" />
        </div>

        <div className="container mx-auto px-4 h-full relative">
          <div className="h-full flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
              <SearchDialog />
              <LanguageSwitcher />
              <ColorPicker />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="h-[1px] mt-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </motion.header>
  );
}