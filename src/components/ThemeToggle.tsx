import { useTheme } from '../theme/useTheme'
import { Sun, Moon } from './icons'
import './ThemeToggle.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  )
}
