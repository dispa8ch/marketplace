"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IconexProps {
  children?: React.ReactNode;
  className?: string;
}

export function Iconex({ children, className }: IconexProps) {
  if (!children) return null;
  return <span className={cn("h-5 w-5 flex items-center", className)}>{children}</span>;
}

export default Iconex;
