import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Determine whether a navigation `href` should be considered active for a given pathname.
 * - strips query/hash
 * - normalizes trailing slashes
 * - if `exact` is true, requires exact match
 * - otherwise treats matching prefix (e.g. `/vendor` active for `/vendor/products`)
 */
export function isActivePath(pathname: string | null | undefined, href: string, options?: { exact?: boolean }) {
  if (!pathname) return false
  const strip = (p: string) => {
    const withoutQS = p.split("?")[0].split("#")[0]
    const trimmed = withoutQS.replace(/\/+$|^\s+|\s+$/g, "")
    return trimmed === "" ? "/" : trimmed
  }

  const p = strip(pathname)
  const h = strip(href)

  if (options?.exact) {
    return p === h
  }

  if (h === "/") {
    return p === "/"
  }

  return p === h || p.startsWith(h + "/")
}
