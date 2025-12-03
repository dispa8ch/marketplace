'use client'

 import { useState } from 'react'
 import { Button } from '@/components/ui/button'
 import { Card } from '@/components/ui/card'
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

 export default function LanguagePage() {
  const [language, setLanguage] = useState('english')
  const [currency, setCurrency] = useState('naira')
  const [timezone, setTimezone] = useState('west-africa')

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-white">Language & Currency</h1>
        <p className="text-sm text-muted-foreground">Manage your notification alerts and preferences</p>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          {/* Preferred Language */}
          <div>
            <label className="block text-sm font-medium text-[#757575] mb-3">
              Preferred Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>

          <div className="border-t" />

          {/* Preferred Currency */}
          <div>
            <label className="block text-sm font-medium text-[#757575] mb-3">
              Preferred Currency
            </label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="naira">Nigerian (Naira)</SelectItem>
                <SelectItem value="usd">US Dollar</SelectItem>
                <SelectItem value="eur">Euro</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>

          <div className="border-t" />

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-[#757575] mb-3">
              Time zone
            </label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="west-africa">(GMT+01:00) West Central Africa</SelectItem>
                <SelectItem value="utc">(GMT+00:00) UTC</SelectItem>
                <SelectItem value="est">(GMT-05:00) Eastern Time</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
