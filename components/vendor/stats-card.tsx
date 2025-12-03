import type React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col w-full gap-4">
            <div className="w-full flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{title}</p>
              <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
                {icon}
              </div>
            </div>

            <div className="flex flex-col gap-0">
              <p className="text-2xl font-medium mt-2">{value}</p>
              {trend && (
                <p
                  className={`text-xs mt-2 ${
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}% from last month
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
