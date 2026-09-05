'use client';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    return (
        <Button aria-label={isDark ? "Use light theme" : "Use dark theme"} onClick={toggleTheme} className="cursor-pointer" size={"icon"} variant={"ghost"} >
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
}
