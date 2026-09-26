'use client';

import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'quill-dashboard-theme';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const dark = savedTheme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    setIsDark(dark);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.dataset.theme = nextIsDark ? 'dark' : 'light';
    window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
