import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LAT, LNG, COMPANY_NAME, ADDRESS_LINE_1, ADDRESS_LINE_2 } from '../constants'

// Vite mangles Leaflet's default icon asset URLs — supply them explicitly.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Brand-coloured SVG pin icon
const brandIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z"
          fill="#f06522" stroke="#d6541b" stroke-width="0.75"/>
    <circle cx="12" cy="12" r="5" fill="#fff" opacity="0.95"/>
  </svg>`,
  className: '',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -50],
})

const MAPS_QUERY = encodeURIComponent(`${ADDRESS_LINE_1} ${ADDRESS_LINE_2}`)
const MAPS_LL = `${LAT},${LNG}`

const POPUP_HTML = `
  <div class="map-popup">
    <strong>${COMPANY_NAME}</strong>
    <p>${ADDRESS_LINE_1}<br/>${ADDRESS_LINE_2}</p>
    <div class="map-popup-links">
      <a href="https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}" target="_blank" rel="noreferrer noopener">Google Maps</a>
      <a href="https://maps.apple.com/?q=${MAPS_QUERY}&ll=${MAPS_LL}" target="_blank" rel="noreferrer noopener">Apple Maps</a>
      <a href="https://waze.com/ul?ll=${MAPS_LL}&navigate=yes" target="_blank" rel="noreferrer noopener">Waze</a>
    </div>
  </div>
`

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { zoomControl: true }).setView([LAT, LNG], 17)
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    L.marker([LAT, LNG], { icon: brandIcon })
      .addTo(map)
      .bindPopup(POPUP_HTML, { maxWidth: 260 })
      .openPopup()

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="location-map" />
}
