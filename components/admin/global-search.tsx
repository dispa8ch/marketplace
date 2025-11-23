"use client"

import { useState, useEffect } from "react"
import { Search, Store, Users, Truck, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Iconex } from "@/components/icons/iconex"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface SearchResult {
  type: "vendor" | "customer" | "logistics"
  id: string
  title: string
  subtitle?: string
  badge?: string
}

export function AdminGlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      // TODO: Connect to backend API
      const mockResults: SearchResult[] = [
        { type: "vendor", id: "1", title: "Tech Hub Electronics", subtitle: "contact@techhub.ng", badge: "Verified" },
        { type: "customer", id: "2", title: "John Doe", subtitle: "john@example.com", badge: "Active" },
        { type: "logistics", id: "3", title: "QuickMove Express", subtitle: "Lagos, Abuja" },
      ]
      setTimeout(() => {
        setResults(mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase())))
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  const getIcon = (type: string) => {
    switch (type) {
      case "vendor":
        return Store
      case "customer":
        return Users
      case "logistics":
        return Truck
      default:
        return Search
    }
  }

  const handleSelect = (result: SearchResult) => {
    switch (result.type) {
      case "vendor":
        router.push(`/admin/vendors`)
        break
      case "customer":
        router.push(`/admin/customers`)
        break
      case "logistics":
        router.push(`/admin/logistics`)
        break
      default:
        break
    }
    setOpen(false)
    setQuery("")
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-muted rounded-md hover:bg-muted/80 transition-colors w-full max-w-sm"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-xs">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-0 gap-0">
          <div className="flex items-center border-b px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendors, customers, logistics..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="ml-2">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {isLoading && <div className="p-4 text-center text-sm text-muted-foreground">Searching...</div>}

            {!isLoading && query && results.length === 0 && (
              <div className="p-4 text-center text-sm text-muted-foreground">No results found</div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="space-y-1">
                {results.map((result) => {
                  const Icon = getIcon(result.type)
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-left"
                    >
                      <Iconex className="text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </Iconex>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{result.title}</p>
                        {result.subtitle && <p className="text-xs text-muted-foreground">{result.subtitle}</p>}
                      </div>
                      {result.badge && (
                        <Badge variant="outline" className="text-xs">
                          {result.badge}
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
