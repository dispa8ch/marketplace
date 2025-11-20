'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function VendorSettingsPage() {
  const { toast } = useToast();
  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Tech Hub Electronics',
    businessEmail: 'contact@techhub.ng',
    businessPhone: '+234 800 000 0000',
    address: '123 Main Street, Ikeja, Lagos',
  });

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your changes have been saved successfully',
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessInfo.businessName}
              onChange={(e) =>
                setBusinessInfo({ ...businessInfo, businessName: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessEmail">Business Email</Label>
            <Input
              id="businessEmail"
              type="email"
              value={businessInfo.businessEmail}
              onChange={(e) =>
                setBusinessInfo({ ...businessInfo, businessEmail: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessPhone">Business Phone</Label>
            <Input
              id="businessPhone"
              type="tel"
              value={businessInfo.businessPhone}
              onChange={(e) =>
                setBusinessInfo({ ...businessInfo, businessPhone: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={businessInfo.address}
              onChange={(e) =>
                setBusinessInfo({ ...businessInfo, address: e.target.value })
              }
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">Premium Plan</p>
              <p className="text-sm text-muted-foreground">
                Unlimited products, advanced analytics, priority support
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Next billing: February 15, 2024
              </p>
            </div>
            <Badge>Active</Badge>
          </div>
          <Separator className="my-4" />
          <Button variant="outline">Manage Subscription</Button>
        </CardContent>
      </Card>
    </div>
  );
}
