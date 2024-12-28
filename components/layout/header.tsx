"use client";

import { Logo } from '@/components/layout/logo';
import { ColorPicker } from '@/components/theme/color-picker';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 h-16 z-50"
    >
      <div className="relative h-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 h-full relative">
          <div className="h-full flex items-center justify-between">
            <Logo />
            <ColorPicker />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="h-[1px] mt-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </motion.header>
  );
}