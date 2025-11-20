'use client';

import { NavBar } from '@/components/marketplace/nav-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, MapPin, ShoppingBag, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    apiClient.clearToken();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">First Name</p>
                  <p className="font-medium">John</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Name</p>
                  <p className="font-medium">Doe</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">+234 800 000 0000</p>
              </div>
              <Button variant="outline" className="mt-4">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Saved Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street, Ikeja, Lagos
                  </p>
                </div>
                <Button variant="outline">
                  Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
}
