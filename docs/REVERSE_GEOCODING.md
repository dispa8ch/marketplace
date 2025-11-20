Reverse geocoding integration

Where to integrate

- Client: `components/marketplace/location-modal.tsx` currently uses a mocked reverse-geocode string when the browser geolocation API returns coordinates.
- Server: create a server-side endpoint `/api/reverse-geocode` that accepts `lat` and `lng` and calls a geocoding provider (OpenCage, LocationIQ, Google Maps, etc.). Keep API keys in env vars (NEXT_PUBLIC_ is NOT appropriate for secret keys).

Example server handler (next.js api route /app/api/reverse-geocode/route.ts):

```ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { lat, lng } = await request.json()
  if (!lat || !lng) return NextResponse.json({ error: 'missing coords' }, { status: 400 })

  const key = process.env.REVERSE_GEOCODING_KEY
  if (!key) return NextResponse.json({ error: 'no key configured' }, { status: 500 })

  // Example for OpenCage
  const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${key}`)
  if (!res.ok) return NextResponse.json({ error: 'provider error' }, { status: 502 })

  const data = await res.json()
  const formatted = data?.results?.[0]?.formatted || ''
  return NextResponse.json({ address: formatted })
}
```

Client integration

- In `LocationModal.requestGeolocation`, after obtaining coords, call your server endpoint to translate to a human readable address:

```ts
const res = await fetch('/api/reverse-geocode', { method: 'POST', body: JSON.stringify({ lat, lng }), headers: { 'Content-Type': 'application/json' } })
const json = await res.json()
setAddress(json.address || `Lat ${lat}, Lng ${lng}`)
```

Security notes

- Never embed provider API keys in client-side code.
- Use environment variables (e.g., in Vercel dashboard or `.env.local`) for server-side keys and reference them via `process.env` on the server.
- Add rate limiting / abuse protection to the server endpoint if public-facing.

Fallback behavior

- Keep the client-side mock text for development and when the server endpoint or provider keys are not configured.
- Show a user-friendly message when reverse geocoding fails and still allow manual address entry.
