"use client"

import { useEffect, useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { apiClient } from '@/lib/api-client'
import { useRouter } from 'next/navigation'

export default function SearchModal({ open, onOpenChange, initialQuery = '', initialCategory = 'all' }: { open: boolean, onOpenChange: (v: boolean) => void, initialQuery?: string, initialCategory?: string }) {
  const [q, setQ] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [debounced, setDebounced] = useState(q)
  const [suggestions, setSuggestions] = useState<any[]|null>(null)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 220)
    return () => clearTimeout(t)
  }, [q])

  useEffect(() => {
    let mounted = true
    if (!debounced) {
      setSuggestions(null)
      return
    }
    (async () => {
      try {
        const params = new URLSearchParams()
        params.set('search', debounced)
        params.set('limit', '8')
        const res = await apiClient.get(`/api/products?${params.toString()}`)
        const items = (res.products || []).map((p: any) => ({ id: p._id, title: p.name, href: `/product/${p._id}`, image: p.images && p.images[0], subtitle: p.category }))
        if (mounted) setSuggestions(items)
      } catch (e) {
        if (mounted) setSuggestions([])
      }
    })()
    return () => { mounted = false }
  }, [debounced])

  function submitSearch() {
    const trimmed = q.trim()
    if (!trimmed) return
    const params = new URLSearchParams()
    params.set('q', trimmed)
    if (category && category !== 'all') params.set('category', category)
    onOpenChange(false)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Select value={category} onValueChange={(v) => setCategory(v)}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1">
            <Input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submitSearch() }} placeholder="Search products, vendors..." />
          </div>
        </div>

        <div className="mt-3 max-h-64 overflow-auto">
          {suggestions && suggestions.length === 0 && <div className="text-sm text-muted-foreground">No suggestions</div>}
          {suggestions && suggestions.map((s) => (
            <button key={s.id} onClick={() => { onOpenChange(false); router.push(s.href) }} className="w-full text-left py-2 flex items-center gap-3 hover:bg-accent/50 px-2">
              {s.image ? (
                <div className="h-10 w-10 shrink-0 rounded overflow-hidden bg-muted">
                  <Image src={s.image} alt={s.title} width={40} height={40} />
                </div>
              ) : (
                <div className="h-10 w-10 shrink-0 rounded bg-muted flex items-center justify-center text-sm text-muted-foreground">P</div>
              )}
              <div>
                <div className="font-medium text-sm">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
