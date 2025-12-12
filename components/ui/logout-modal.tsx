"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/contexts/auth-context";

export function LogoutModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { logout } = useAuth();

  const confirmLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    // Clear cached profile (important to stop reload loops)
    if (typeof window !== "undefined") {
      localStorage.removeItem("dispa8ch_customer");
      localStorage.removeItem("dispa8ch_user");
    }

    await logout?.(); // clear auth-context token and set user = null

    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been signed out.",
      });
    }

    setLoading(false);
    onOpenChange(false);

    // Send the user to the login screen
    router.push("/auth/login");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogDescription>
          Are you sure you want to log out? You’ll need to sign in again to
          access your account.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={confirmLogout} disabled={loading} className="ml-2">
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutModal;
