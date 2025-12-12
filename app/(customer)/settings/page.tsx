"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Customer } from "@/components/marketplace/nav-bar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * SettingsPage provides account and shipping preferences for the user. It
 * loads data from the `users` and `profiles` tables, allowing the user
 * to edit their first/last name, email, phone, and shipping address.
 * Account fields (first name, last name, phone) are saved to
 * `profiles`. Email changes go through `supabase.auth.updateUser()` and
 * reflect in the `users` table. Shipping fields reside in `profiles` and
 * are persisted via upsert.
 */
export default function SettingsPage() {
  const { toast } = useToast();
  // The combined customer record (id, name, email, phone, role, address)
  const [customer, setCustomer] = useState<Customer | null>(null);
  // Editing flags for each section
  const [editingAccount, setEditingAccount] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);
  // Saving flags for network operations
  const [savingAccount, setSavingAccount] = useState(false);
  const [savingShipping, setSavingShipping] = useState(false);
  // Dropdown lists for dynamic country/state/LGA selection
  const [countries, setCountries] = useState<string[]>([]);
  const [statesList, setStatesList] = useState<string[]>([]);
  const [lgasList, setLgasList] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingLgas, setLoadingLgas] = useState(false);
  // Local form state reflecting editable fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    lga: "",
    street1: "",
    street2: "",
    postal: "",
  });

  /** Fetch countries once on mount. Uses RestCountries API to populate the dropdown. */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const data = await res.json();
        const names = data.map((c: any) => c.name.common).sort();
        setCountries(names);
      } catch (err) {
        console.error("Failed to load countries:", err);
      }
    };
    fetchCountries();
  }, []);

  /** When the selected country changes, fetch states for Nigeria or clear the list. */
  useEffect(() => {
    const fetchStates = async () => {
      if (!form.country) return;
      setStatesList([]);
      setForm((prev) => ({ ...prev, state: "", lga: "" }));
      setLoadingStates(true);
      try {
        if (form.country.toLowerCase() === "nigeria") {
          const res = await fetch(
            "https://nga-states-lga.onrender.com/fetch"
          );
          const states: string[] = await res.json();
          setStatesList(states);
          if (editingShipping && states.length === 0) {
            toast({
              title: "No states found",
              description: `No states available for ${form.country}.`,
            });
          }
        } else {
          setStatesList([]);
          if (editingShipping) {
            toast({
              title: "Unsupported country",
              description: `Automatic state lookup is not available for ${form.country}.`,
            });
          }
        }
      } catch (err: any) {
        console.error(err);
        if (editingShipping) {
          toast({
            title: "Error",
            description:
              err?.message ?? `Failed to fetch states for ${form.country}`,
          });
        }
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [form.country]);

  /** When the selected state changes, fetch LGAs for Nigeria or clear the list. */
  useEffect(() => {
    const fetchLgas = async () => {
      if (form.country.toLowerCase() !== "nigeria" || !form.state) {
        setLgasList([]);
        return;
      }
      setLgasList([]);
      setLoadingLgas(true);
      setForm((prev) => ({ ...prev, lga: "" }));
      try {
        const res = await fetch(
          `https://nga-states-lga.onrender.com/?state=${encodeURIComponent(
            form.state
          )}`
        );
        const lgas: string[] = await res.json();
        setLgasList(lgas);
        if (editingShipping && lgas.length === 0) {
          toast({
            title: "No LGAs found",
            description: `No LGAs available for ${form.state}.`,
          });
        }
      } catch (err: any) {
        console.error(err);
        if (editingShipping) {
          toast({
            title: "Error",
            description:
              err?.message ?? `Failed to fetch LGAs for ${form.state}`,
          });
        }
      } finally {
        setLoadingLgas(false);
      }
    };
    fetchLgas();
  }, [form.country, form.state]);

  /**
   * Hydrate profile on mount. Attempt localStorage first; otherwise fetch
   * from Supabase. Combine users and profiles data into a single
   * customer object and update form fields accordingly.
   */
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Check localStorage first
      const storedCustomer =
        typeof window !== "undefined"
          ? localStorage.getItem("dispa8ch_customer")
          : null;
      if (storedCustomer) {
        try {
          const parsed = JSON.parse(storedCustomer);
          setCustomer(parsed);
          setForm((prev) => ({
            ...prev,
            firstName: parsed.name?.split(" ")[0] ?? "",
            lastName:
              parsed.name?.split(" ").slice(1).join(" ") ?? "",
            email: parsed.email ?? "",
            phone: parsed.phone ?? "",
            country: parsed.country ?? "",
            state: parsed.state ?? "",
            lga: parsed.lga ?? "",
            street1: parsed.street1 ?? "",
            street2: parsed.street2 ?? "",
            postal: parsed.postal ?? "",
          }));
          return;
        } catch (e) {
          // fall through
        }
      }
      // Fetch session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;
      const userId = session.user.id;
      // Get account info from users
      const { data: userRow } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("id", userId)
        .single();
      // Get personal and shipping info from profiles
      const { data: profileRow } = await supabase
        .from("profiles")
        .select(
          "first_name, last_name, phone, country, state, lga, street1, street2, postal"
        )
        .eq("id", userId)
        .single();
      if (userRow) {
        const fullName = `${profileRow?.first_name ?? ""} ${
          profileRow?.last_name ?? ""
        }`.trim();
        const combined = {
          id: userRow.id,
          name: fullName,
          email: userRow.email,
          phone: profileRow?.phone ?? "",
          role: userRow.role,
          country: profileRow?.country ?? "",
          state: profileRow?.state ?? "",
          lga: profileRow?.lga ?? "",
          street1: profileRow?.street1 ?? "",
          street2: profileRow?.street2 ?? "",
          postal: profileRow?.postal ?? "",
        } as any;
        setCustomer(combined);
        if (typeof window !== "undefined") {
          localStorage.setItem("dispa8ch_customer", JSON.stringify(combined));
        }
        setForm((prev) => ({
          ...prev,
          firstName: profileRow?.first_name ?? "",
          lastName: profileRow?.last_name ?? "",
          email: userRow.email ?? "",
          phone: profileRow?.phone ?? "",
          country: profileRow?.country ?? "",
          state: profileRow?.state ?? "",
          lga: profileRow?.lga ?? "",
          street1: profileRow?.street1 ?? "",
          street2: profileRow?.street2 ?? "",
          postal: profileRow?.postal ?? "",
        }));
      }
    };
    fetchUserProfile();
  }, []);

  /** Save account fields (first name, last name, phone, email). Names and phone are stored in `profiles`. Email changes are sent to Auth and reflected in `users`. */
  const saveAccount = async () => {
    if (!customer) return;
    setSavingAccount(true);
    try {
      // Upsert names and phone into profiles
      const updatedProfile = {
        id: customer.id,
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
      };
      const { error: profileErr } = await supabase
        .from("profiles")
        .upsert(updatedProfile, { onConflict: "id" });
      if (profileErr) {
        toast({ title: "Error", description: profileErr.message });
        return;
      }
      // Update email if changed
      if (form.email && form.email !== customer.email) {
        // Update in auth user
        const { error: authErr } = await supabase.auth.updateUser({
          email: form.email,
        });
        if (authErr) {
          toast({ title: "Error", description: authErr.message });
          return;
        }
        // Update email in users table
        const { error: userUpdateErr } = await supabase
          .from("users")
          .update({ email: form.email })
          .eq("id", customer.id);
        if (userUpdateErr) {
          toast({ title: "Error", description: userUpdateErr.message });
          return;
        }
      }
      const newCustomer = {
        ...customer,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
      } as any;
      setCustomer(newCustomer);
      if (typeof window !== "undefined") {
        localStorage.setItem("dispa8ch_customer", JSON.stringify(newCustomer));
        localStorage.setItem("dispa8ch_user", JSON.stringify(form));
      }
      toast({
        title: "Saved",
        description: "Account settings saved successfully",
      });
      setEditingAccount(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message ?? "Failed to save account settings",
      });
    } finally {
      setSavingAccount(false);
    }
  };

  /** Save shipping fields to profiles via upsert. */
  const saveShipping = async () => {
    if (!customer) return;
    setSavingShipping(true);
    try {
      const updated = {
        id: customer.id,
        country: form.country,
        state: form.state,
        lga: form.lga,
        street1: form.street1,
        street2: form.street2,
        postal: form.postal,
      };
      const { error } = await supabase
        .from("profiles")
        .upsert(updated, { onConflict: "id" });
      if (error) {
        toast({ title: "Error", description: error.message });
        return;
      }
      const { id: _ignore, ...shippingFields } = updated;
      const newCustomer = { ...customer, ...shippingFields } as any;
      setCustomer(newCustomer);
      if (typeof window !== "undefined") {
        localStorage.setItem("dispa8ch_customer", JSON.stringify(newCustomer));
        localStorage.setItem("dispa8ch_user", JSON.stringify(form));
      }
      toast({
        title: "Saved",
        description: "Shipping settings saved successfully",
      });
      setEditingShipping(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message ?? "Failed to save shipping settings",
      });
    } finally {
      setSavingShipping(false);
    }
  };

  /** Cancel editing for account section and revert to cached form values. */
  const cancelAccount = () => {
    const raw =
      typeof window !== "undefined"
        ? localStorage.getItem("dispa8ch_user")
        : null;
    if (raw) {
      try {
        setForm(JSON.parse(raw));
      } catch (e) {}
    }
    setEditingAccount(false);
    toast({
      title: "Cancelled",
      description: "Account changes discarded",
    });
  };

  /** Cancel editing for the shipping section. */
  const cancelShipping = () => {
    const raw =
      typeof window !== "undefined"
        ? localStorage.getItem("dispa8ch_user")
        : null;
    if (raw) {
      try {
        setForm(JSON.parse(raw));
      } catch (e) {}
    }
    setEditingShipping(false);
    toast({
      title: "Cancelled",
      description: "Shipping changes discarded",
    });
  };

  // Show loading screen while customer is not yet loaded
  if (!customer) {
    return <p>Loading…</p>;
  }

  return (
    <div className="bg-background border rounded-lg p-6">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <p className="text-muted-foreground text-sm">
          Manage your account information and preferences
        </p>
      </div>
      {/* Account info */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              disabled={!editingAccount}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              disabled={!editingAccount}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            disabled={!editingAccount}
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex gap-2">
            <Input className="w-20" value="+234" readOnly />
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              disabled={!editingAccount}
              className="w-full"
            />
          </div>
        </div>
        {!editingAccount ? (
          <Button onClick={() => setEditingAccount(true)}>Edit</Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={cancelAccount}
              disabled={savingAccount}
            >
              Cancel
            </Button>
            {savingAccount ? (
              <Button disabled>Saving…</Button>
            ) : (
              <Button onClick={saveAccount}>Save</Button>
            )}
          </div>
        )}
      </div>
      {/* Shipping info */}
      <div className="mt-8 pt-8 border-t">
        <div className="mb-6 flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Shipping Settings</h3>
          <p className="text-muted-foreground text-sm">
            Set your location and delivery preferences
          </p>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Country dropdown */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={form.country}
                onValueChange={(value: string) =>
                  setForm({ ...form, country: value })
                }
                disabled={!editingShipping}
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    !editingShipping && "text-muted-foreground"
                  )}
                >
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* State dropdown */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={form.state}
                onValueChange={(value: string) =>
                  setForm({ ...form, state: value })
                }
                disabled={
                  !editingShipping ||
                  loadingStates ||
                  statesList.length === 0
                }
              >
                <SelectTrigger
                  className={cn(
                    "w-full",
                    (!editingShipping ||
                      loadingStates ||
                      statesList.length === 0) &&
                      "text-muted-foreground"
                  )}
                >
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {statesList.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* LGA dropdown */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="lga">Local Government Area (LGA)</Label>
            <Select
              value={form.lga}
              onValueChange={(value: string) =>
                setForm({ ...form, lga: value })
              }
              disabled={
                !editingShipping ||
                loadingLgas ||
                lgasList.length === 0 ||
                !form.state
              }
            >
              <SelectTrigger
                className={cn(
                  "w-full",
                  (!editingShipping ||
                    loadingLgas ||
                    lgasList.length === 0 ||
                    !form.state) &&
                    "text-muted-foreground"
                )}
              >
                <SelectValue placeholder="Select LGA" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {lgasList.map((lga) => (
                  <SelectItem key={lga} value={lga}>
                    {lga}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Street address fields */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="street1">Street Address</Label>
            <Input
              id="street1"
              value={form.street1}
              placeholder="Street Address Line 1"
              onChange={(e) =>
                setForm({ ...form, street1: e.target.value })
              }
              disabled={!editingShipping}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="street2">Street Address 2 (Optional)</Label>
            <Input
              id="street2"
              value={form.street2}
              placeholder="Street Address Line 2"
              onChange={(e) =>
                setForm({ ...form, street2: e.target.value })
              }
              disabled={!editingShipping}
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="postal">Postal Code (Optional)</Label>
            <Input
              id="postal"
              value={form.postal}
              placeholder="Postal Code"
              onChange={(e) =>
                setForm({ ...form, postal: e.target.value })
              }
              disabled={!editingShipping}
              className="w-full"
            />
          </div>
          {!editingShipping ? (
            <Button onClick={() => setEditingShipping(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={cancelShipping}
                disabled={savingShipping}
              >
                Cancel
              </Button>
              {savingShipping ? (
                <Button disabled>Saving…</Button>
              ) : (
                <Button onClick={saveShipping}>Save</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
