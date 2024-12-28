"use client";

import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { themes } from '@/lib/themes';
import { useThemeStore } from '@/store/theme';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function ColorPicker() {
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 grid grid-cols-3 gap-1 p-1">
        {themes.map((theme) => (
          <motion.button
            key={theme.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-10 h-10 rounded-full relative",
              "hover:scale-105 transition-transform",
              "focus:outline-none focus:ring-2 focus:ring-white/20",
            )}
            style={{ background: `hsl(${theme.primary})` }}
            onClick={() => {
              setTheme(theme.name);
              document.documentElement.style.setProperty('--primary', theme.primary);
            }}
          >
            {currentTheme === theme.name && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}