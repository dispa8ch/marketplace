'use client'

 import { useState, useEffect } from 'react'
 import { Button } from '@/components/ui/button'
 import { Input } from '@/components/ui/input'
 import { Label } from '@/components/ui/label'
 import { useToast } from '@/hooks/use-toast'

 export default function SettingsPage() {
   const toastHook = useToast()
   const { toast } = toastHook

   const [editing, setEditing] = useState(false)
   const [form, setForm] = useState({
     firstName: 'John',
     lastName: 'Doe',
     email: 'johndoe@gmail.com',
     phone: '809 485 2456',
     country: 'Nigeria',
     state: 'Rivers',
     lga: 'Obia/Akpor',
     street1: '123 Ajakaja Street, Road 15, Rumuodumaya Port Harcout',
     street2: '',
     postal: '500102',
   })

   useEffect(() => {
     // hydrate stored user if available
     const raw = typeof window !== 'undefined' ? localStorage.getItem('dispa8ch_user') : null
     if (raw) {
       try {
         const parsed = JSON.parse(raw)
         setForm((prev) => ({ ...prev, ...parsed }))
       } catch (e) {}
     }
   }, [])

   const save = () => {
     if (typeof window !== 'undefined') {
       localStorage.setItem('dispa8ch_user', JSON.stringify(form))
     }
     setEditing(false)
     toast({ title: 'Saved', description: 'Settings saved successfully' })
   }

   const cancel = () => {
     // re-hydrate from storage
     const raw = typeof window !== 'undefined' ? localStorage.getItem('dispa8ch_user') : null
     if (raw) {
       try { setForm(JSON.parse(raw)) } catch (e) {}
     }
     setEditing(false)
     toast({ title: 'Cancelled', description: 'Changes discarded' })
   }

   return (
     <div className="bg-white border rounded-lg p-6">
       <div className="mb-6">
         <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
         <p className="text-gray-600">Manage your account information and preferences</p>
       </div>

       <div className="space-y-6">
         <div className="grid grid-cols-2 gap-4">
           <div>
             <Label htmlFor="firstName">First Name</Label>
             <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} disabled={!editing} className="w-full" />
           </div>
           <div>
             <Label htmlFor="lastName">Last Name</Label>
             <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} disabled={!editing} className="w-full" />
           </div>
         </div>

         <div>
           <Label htmlFor="email">Email Address</Label>
           <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={!editing} className="w-full" />
         </div>

         <div>
           <Label htmlFor="phone">Phone Number</Label>
           <div className="flex gap-2">
             <Input className="w-20" value="+234" readOnly />
             <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} className="w-full" />
           </div>
         </div>

         {!editing ? (
           <Button onClick={() => setEditing(true)}>Edit</Button>
         ) : (
           <div className="flex gap-3">
             <Button variant="outline" onClick={cancel}>Cancel</Button>
             <Button onClick={save}>Save</Button>
           </div>
         )}
       </div>

       <div className="mt-8 pt-8 border-t">
         <h3 className="text-lg font-semibold mb-4">Shipping Settings</h3>
         <p className="text-gray-600 mb-6">Set your location and delivery preferences</p>

         <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label htmlFor="country">Country</Label>
               <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} disabled={!editing} className="w-full" />
             </div>
             <div>
               <Label htmlFor="state">State</Label>
               <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} disabled={!editing} className="w-full" />
             </div>
           </div>

           <div>
             <Label htmlFor="lga">Local Government Area (LGA)</Label>
             <Input id="lga" value={form.lga} onChange={(e) => setForm({ ...form, lga: e.target.value })} disabled={!editing} className="w-full" />
           </div>

           <div>
             <Label htmlFor="street1">Street Address</Label>
             <Input id="street1" value={form.street1} onChange={(e) => setForm({ ...form, street1: e.target.value })} disabled={!editing} className="w-full" />
           </div>

           <div>
             <Label htmlFor="street2">Street Address 2 (Optional)</Label>
             <Input id="street2" value={form.street2} onChange={(e) => setForm({ ...form, street2: e.target.value })} disabled={!editing} className="w-full" />
           </div>

           <div>
             <Label htmlFor="postal">Postal Code (Optional)</Label>
             <Input id="postal" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} disabled={!editing} className="w-full" />
           </div>

           {!editing ? (
             <Button onClick={() => setEditing(true)}>Edit</Button>
           ) : (
             <div className="flex gap-3">
               <Button variant="outline" onClick={cancel}>Cancel</Button>
               <Button onClick={save}>Save</Button>
             </div>
           )}
         </div>
       </div>
     </div>
   )
 }
