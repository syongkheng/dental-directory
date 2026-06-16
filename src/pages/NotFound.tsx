import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>
      <h1>404</h1>
      <p>We couldn&apos;t find that page.</p>
      <Link to="/">Back to home</Link>
    </div>
  )
}
