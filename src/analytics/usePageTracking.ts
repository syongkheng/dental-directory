import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Analytics } from './events'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/services': 'Services',
  '/about': 'About',
  '/contact': 'Contact',
}

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] ?? '404'
    Analytics.pageView(location.pathname, title)
  }, [location.pathname])
}
