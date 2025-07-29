'use client';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = document.documentElement.dataset.theme;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        setIsDark(initialDark);
        document.documentElement.dataset.theme = initialDark ? 'dark' : 'light';
        if (initialDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    if (!mounted) return null;

    const toggleTheme = () => {
        if (typeof window === 'undefined') return;
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                const newDark = !isDark;
                setIsDark(newDark);
                document.documentElement.dataset.theme = newDark ? 'dark' : 'light';
                if (newDark) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });
        } else {
            const newDark = !isDark;
            setIsDark(newDark);
            document.documentElement.dataset.theme = newDark ? 'dark' : 'light';
            if (newDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    return (
        <Button onClick={toggleTheme} className="cursor-pointer" size={"icon"} variant={"ghost"} >
            {isDark ? <Sun /> : <Moon />}
        </Button>
    );
}