"use client";
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Bell } from "lucide-react";
import Iconex from "@/components/icons/iconex";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState([
    { message: "Alert Message", time: "Yesterday 08:40 AM", read: false },
    { message: "Alert Message", time: "Yesterday 08:40 AM", read: false },
    { message: "Alert Message", time: "Yesterday 08:40 AM", read: false },
    { message: "Alert Message", time: "Yesterday 08:40 AM", read: false },
  ]);

  const [settings, setSettings] = useState({
    orderPurchase: { sms: false, email: true },
    accountActivity: { sms: false, email: false },
    promotions: { sms: false, email: true },
    news: { sms: false, email: true },
    feedback: { sms: false, email: true },
    platformUpdates: { sms: false, email: true },
  });

  const [masterSmsDisabled, setMasterSmsDisabled] = useState(false);
  const { toast } = useToast();

  // Load saved settings from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dispa8ch_notifications");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.settings) setSettings(parsed.settings);
        if (typeof parsed.masterSmsDisabled === "boolean")
          setMasterSmsDisabled(parsed.masterSmsDisabled);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  function saveSettings() {
    try {
      localStorage.setItem(
        "dispa8ch_notifications",
        JSON.stringify({ settings, masterSmsDisabled })
      );
      toast({ title: "Notification settings saved" });
    } catch (e) {
      toast({ title: "Could not save settings", variant: "destructive" });
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-white">Notifications</h1>
        <p className="text-sm text-muted-foreground">
          Manage your notification alerts and preferences
        </p>
      </div>

      {/* Notifications List */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            Recent Notifications
          </h2>
          <Button variant="ghost" size="sm" className="font-medium text-primary">
            Mark All As Read
          </Button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-accent rounded-lg"
            >
              <div className="p-2 bg-[#2d080f] rounded-full">
                <Iconex icon={Bell} className="h-5 w-5 text-primary"/>
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{alert.message}</p>
                <p className="text-sm text-[#757575]">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="mt-6 text-center">
          <Button variant="ghost" size="sm">
            Mark All As Read
          </Button>
        </div> */}
      </Card>

      {/* Alert Settings */}
      <Card className="p-6">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-white">
            Alert Settings
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage your notification alerts and preferences
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 pb-4 border-b text-sm font-medium text-[#757575]">
            <div>Alert Type</div>
            <div className="text-center">SMS</div>
            <div className="text-center">Email</div>
          </div>

          {[
            { key: "orderPurchase", label: "Order & Purchase" },
            { key: "accountActivity", label: "Account Activity" },
            { key: "promotions", label: "Promotions & Offers" },
            { key: "news", label: "News & Programs" },
            { key: "feedback", label: "Feedback" },
            { key: "platformUpdates", label: "Platform Updates" },
          ].map((item) => (
            <div
              key={item.key}
              className="grid grid-cols-3 gap-4 items-center py-4 border-b last:border-0"
            >
              <div className="text-white">{item.label}</div>
              <div className="flex justify-center">
                <Switch
                  checked={settings[item.key as keyof typeof settings].sms}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      [item.key]: {
                        ...prev[item.key as keyof typeof settings],
                        sms: checked,
                      },
                    }))
                  }
                  disabled={masterSmsDisabled}
                />
              </div>
              <div className="flex justify-center">
                <Switch
                  checked={settings[item.key as keyof typeof settings].email}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      [item.key]: {
                        ...prev[item.key as keyof typeof settings],
                        email: checked,
                      },
                    }))
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm">Disable SMS notifications</div>
          <div>
            <Switch
              checked={masterSmsDisabled}
              onCheckedChange={(v) => setMasterSmsDisabled(!!v)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              try {
                localStorage.removeItem("dispa8ch_notifications");
                setMasterSmsDisabled(false);
                setSettings({
                  orderPurchase: { sms: false, email: true },
                  accountActivity: { sms: false, email: false },
                  promotions: { sms: false, email: true },
                  news: { sms: false, email: true },
                  feedback: { sms: false, email: true },
                  platformUpdates: { sms: false, email: true },
                });
                toast({ title: "Settings reset" });
              } catch (e) {
                toast({
                  title: "Could not reset settings",
                  variant: "destructive",
                });
              }
            }}
          >
            Reset
          </Button>
          <Button onClick={saveSettings}>Save</Button>
        </div>
      </Card>
    </div>
  );
}
