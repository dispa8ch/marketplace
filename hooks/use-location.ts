"use client"

import { useEffect, useState, useCallback } from 'react'

type Status = 'idle' | 'prompting' | 'granted' | 'denied' | 'error'

export function useLocation() {
  const [status, setStatus] = useState<Status>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const requestPermission = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setError('Geolocation not supported')
      return
    }

    setStatus('prompting')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lng: longitude })
        setStatus('granted')
      },
      (err) => {
        setError(err.message)
        if (err.code === err.PERMISSION_DENIED) {
          setStatus('denied')
        } else {
          setStatus('error')
        }
      },
    )
  }, [])

  useEffect(() => {
    // Try to hydrate from localStorage first
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('dispa8ch_location')
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          if (parsed && parsed.lat && parsed.lng) {
            setCoords(parsed)
            setStatus('granted')
          }
        } catch (e) {}
      }
    }
  }, [])

  useEffect(() => {
    if (coords && typeof window !== 'undefined') {
      localStorage.setItem('dispa8ch_location', JSON.stringify(coords))
    }
  }, [coords])

  return { status, coords, error, requestPermission }
}

export default useLocation
