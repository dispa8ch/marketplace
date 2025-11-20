"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export function LogoutModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const confirmLogout = () => {
    setLoading(true)
    // Clear auth keys used in the app
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dispa8ch_token')
      localStorage.removeItem('dispa8ch_user')
      localStorage.removeItem('auth_token')
    }
    toast({ title: 'Logged out', description: 'You have been signed out' })
    setLoading(false)
    onOpenChange(false)
    router.push('/auth/login')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogDescription>Are you sure you want to logout? You'll need to sign in again to access your account.</DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={confirmLogout} disabled={loading} className="ml-2">Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutModal
