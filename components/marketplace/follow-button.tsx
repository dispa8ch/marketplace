"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Iconex from "@/components/icons/iconex";

type FollowButtonProps = {
  vendorId: string;
  initialFollowed?: boolean;
  onChange?: (followed: boolean) => void;
};

const STORAGE_KEY = "dispa8ch_followed_vendors";

export function FollowButton({
  vendorId,
  initialFollowed = false,
  onChange,
}: FollowButtonProps) {
  const [followed, setFollowed] = useState(initialFollowed);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        if (Array.isArray(obj) && obj.includes(vendorId)) {
          setFollowed(true);
          return;
        }
      }
      setFollowed(initialFollowed);
    } catch (e) {
      setFollowed(initialFollowed);
    }
  }, [vendorId, initialFollowed]);

  function toggle() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      let arr: string[] = [];
      if (raw) arr = JSON.parse(raw);
      if (!Array.isArray(arr)) arr = [];

      if (followed) {
        arr = arr.filter((id) => id !== vendorId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        setFollowed(false);
        onChange && onChange(false);
      } else {
        arr.push(vendorId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
        setFollowed(true);
        onChange && onChange(true);
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <Button
      onClick={toggle}
      className="flex items-center gap-2"
      variant={followed ? "default" : "outline"}
    >
      <Iconex icon={Users} className="h-5 w-5 text-white"/>
      {followed ? "Following" : "Follow"}
    </Button>
  );
}

export default FollowButton;
