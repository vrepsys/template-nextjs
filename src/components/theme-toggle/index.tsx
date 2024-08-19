'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-portal-content-button hover:text-portal-content-button-hover rounded p-1 transition active:translate-y-[1px]"
    >
      <MoonIcon size={16} className="block transition dark:hidden" />
      <SunIcon size={16} className="hidden transition dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
