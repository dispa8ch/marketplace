"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Check,
  ArrowRight,
  ArrowLeft,
  Upload,
  MapPin,
  CameraIcon,
  Building,
  UserCheck2,
  CreditCard,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const STEPS = ["Owner", "Business", "Compliance", "Finance", "Review"];
const PLANS = {
  planName: ["Free", "Starter", "Growth", "Enterpise"],
  planPrice: ["₦0.00", "₦17,000", "₦50,000", "Custom Pricing"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [supabase] = useState(() => createClient());

  const [data, setData] = useState({
    // Step 1: Owner
    fullName: "",
    email: "",
    phone: "",
    password: "",
    // Step 2: Business
    businessName: "",
    businessType: "",
    category: "",
    description: "",
    address: "",
    city: "",
    zip: "",
    logo: null as File | null,
    banner: null as File | null,
    // Step 3: Compliance
    selectedComplianceType: "",
    complianceFile: null as File | null,
    cacNumber: "",
    // Step 4: Finance
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const handleNext = async () => {
    if (currentStep === 3 && !data.accountName) {
      await verifyBankAccount();
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const verifyBankAccount = async () => {
    if (!data.bankName || !data.accountNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter bank name and account number",
        variant: "destructive",
      });
      return;
    }
    setVerifyingAccount(true);
    try {
      // Mock Paystack Resolve Account API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockAccountName = "DISPA8CH VENTURES LTD";
      setData((prev) => ({ ...prev, accountName: mockAccountName }));
      toast({
        title: "Account Verified",
        description: `Account Name: ${mockAccountName}`,
        variant: "success",
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not resolve account details",
        variant: "destructive",
      });
    } finally {
      setVerifyingAccount(false);
    }
  };

  const completeOnboarding = async () => {
    setIsLoading(true);
    try {
      // 1. Upload files to Supabase Storage (mocked for now as we need buckets)
      // 2. Insert vendor data into Supabase

      const { error } = await supabase.from("vendors").insert({
        business_name: data.businessName,
        category: data.category,
        owner_name: data.fullName,
        email: data.email,
        phone: data.phone,
        address: {
          street: data.address,
          city: data.city,
          zip: data.zip,
        },
        cac_number: data.cacNumber,
        bank_details: {
          bank_name: data.bankName,
          account_number: data.accountNumber,
          account_name: data.accountName,
        },
        status: "pending_approval",
      });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your vendor application is under review.",
        variant: "success",
      });

      router.push("/vendor");
    } catch (error) {
      console.error(error);
      // Fallback for demo if table doesn't exist
      toast({
        title: "Application Submitted",
        description: "Your application has been received (Demo Mode).",
        variant: "success",
      });
      router.push("/vendor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground font-sans">
      {/* Header */}
      <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.svg"
            alt="dispa8ch"
            width={16}
            height={16}
            className="lg:[w-0 h-0] w-7 h-7"
          />
          <span className="font-semibold text-lg hidden sm:inline">
            Dispa8ch
          </span>
        </Link>
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          Vendor Onboarding
        </div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-border -z-10" />
            {STEPS.map((step, index) => (
              <div
                key={step}
                className="flex flex-col items-center bg-background px-2"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-all duration-300
                    ${
                      index < currentStep
                        ? "bg-primary text-primary-foreground border-primary"
                        : index === currentStep
                        ? "bg-background text-primary border-primary ring-4 ring-primary/10"
                        : "bg-background text-muted-foreground border-border"
                    }`}
                >
                  {index < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest mt-2 hidden sm:block ${
                    index <= currentStep
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-card p-8 md:p-12 rounded-lg border border-border min-h-[400px]">
          <div className="mb-8 flex flex-col gap-1">
            <h2 className="text-2xl font-medium">{STEPS[currentStep]}</h2>
            <p className="text-muted-foreground text-sm">
              Please provide the requested information to set up your shop.
            </p>
          </div>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* STEP 1: OWNER INFO */}
            {currentStep === 0 && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={data.fullName}
                      onChange={(e) =>
                        setData({ ...data, fullName: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="flex gap-2">
                      <Input className="w-20" value="+234" readOnly />
                      <Input
                        className="w-full"
                        id="phone"
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={data.phone}
                        onChange={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Create Password</Label>
                    <Input
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      type="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: BUSINESS INFO */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <div className="h-auto mb-10">
                    {/* Business Logo Upload */}
                    <div className="space-y-1 absolute z-50 left-5 top-22">
                      <div className="border border-dashed border-accent p-4 rounded-full flex items-center justify-center cursor-pointer bg-background hover:bg-muted/50 transition-colors w-16 h-16">
                        <CameraIcon className="w-6 h-6 fill-white text-background" />
                      </div>
                    </div>

                    {/* Business Banner Upload */}
                    <div className="space-y-2 mb-6 relative">
                      <div className="border border-dashed border-accent p-4 rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors h-32">
                        <Upload className="w-4 h-4 text-muted-foreground mb-2" />
                        <span className="text-xs text-muted-foreground">
                          Upload Banner
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Business Name</Label>
                    <Input
                      value={data.businessName}
                      onChange={(e) =>
                        setData({ ...data, businessName: e.target.value })
                      }
                      placeholder="My Awesome Store"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select
                      onValueChange={(v) =>
                        setData({ ...data, businessType: v })
                      }
                      value={data.businessType}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">
                          Individual / Sole Proprietor
                        </SelectItem>
                        <SelectItem value="registered">
                          Registered Company
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Business Category</Label>
                    <Select
                      onValueChange={(v) => setData({ ...data, category: v })}
                      value={data.category}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">
                          Fashion & Apparel
                        </SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home">Home & Living</SelectItem>
                        <SelectItem value="beauty">
                          Beauty & Wellness
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Tell us about your brand..."
                    className="resize-none min-h-[100px]"
                    value={data.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <div className="relative">
                    <Input
                      placeholder="Search for address..."
                      value={data.address}
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                      className="pr-10"
                    />
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  {/* Mapbox Mock Placeholder */}
                  <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center border border-border">
                    <span className="text-xs text-muted-foreground">
                      Map Preview (Mapbox Integration)
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3: COMPLIANCE DOCUMENTS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Document Type</Label>
                  <Select
                    onValueChange={(v) =>
                      setData({ ...data, selectedComplianceType: v })
                    }
                    value={data.selectedComplianceType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idDocument">Valid ID Card</SelectItem>
                      <SelectItem value="cacCertificate">
                        CAC Certificate
                      </SelectItem>
                      <SelectItem value="utilityBill">Utility Bill</SelectItem>
                      <SelectItem value="businessLicense">
                        Business License
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    PDF, JPG or PNG (Max 5MB)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>CAC Registration Number</Label>
                  <Input
                    value={data.cacNumber}
                    onChange={(e) =>
                      setData({ ...data, cacNumber: e.target.value })
                    }
                    placeholder="XXX-XXX-XXX-XXX"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">
                    {data.selectedComplianceType
                      ? {
                          idDocument: "Valid ID Card",
                          cacCertificate: "CAC Certificate",
                          utilityBill: "Utility Bill",
                          businessLicense: "Business License",
                        }[data.selectedComplianceType]
                      : "Select a document type above"}
                  </div>

                  {data.complianceFile ? (
                    <div className="flex items-center gap-1 px-1.5 py-1 rounded-sm bg-[#032905] text-green-500">
                      <Check className="h-4 w-4" />
                      <span className="text-xs font-medium">Uploaded</span>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs bg-transparent"
                      disabled={!data.selectedComplianceType}
                      onClick={() =>
                        document.getElementById("complianceUpload")?.click()
                      }
                    >
                      Upload
                    </Button>
                  )}

                  <input
                    id="complianceUpload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) =>
                      setData({
                        ...data,
                        complianceFile: e.target.files
                          ? e.target.files[0]
                          : null,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* STEP 4: BANKING SETUP */}
            {currentStep === 3 && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label>Account Name</Label>
                    <Input
                      value={data.accountName}
                      onChange={(e) =>
                        setData({ ...data, businessName: e.target.value })
                      }
                      placeholder="My Awesome Store"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input
                      placeholder="0000000000"
                      value={data.accountNumber}
                      onChange={(e) =>
                        setData({ ...data, accountNumber: e.target.value })
                      }
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Select
                    onValueChange={(v) => setData({ ...data, bankName: v })}
                    value={data.bankName}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gtbank">
                        Guaranty Trust Bank
                      </SelectItem>
                      <SelectItem value="zenith">Zenith Bank</SelectItem>
                      <SelectItem value="access">Access Bank</SelectItem>
                      <SelectItem value="uba">
                        United Bank for Africa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {data.accountName && (
                  <div className="bg-primary/10 p-4 rounded border border-primary/20 flex items-center gap-3 animate-in fade-in">
                    <span className="bg-primary w-10 h-10 flex items-center justify-center rounded-sm">
                      <UserCheck2 className="h-6 w-6 text-white" />
                    </span>

                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Account Verified
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {data.accountName}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 5: REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="h-auto mb-10">
                  {/* Business Logo Upload */}
                  <div className="space-y-1 absolute z-50 left-5 top-22">
                    <div className="p-4 border-4 border-background/50 rounded-full flex items-center justify-center cursor-pointer bg-accent w-16 h-16">
                      {/* <CameraIcon className="w-6 h-6 fill-white text-background" /> */}
                    </div>
                  </div>

                  {/* Business Banner Upload */}
                  <div className="space-y-2 mb-6 relative">
                    <div className="bg-accent border border-border p-4 rounded-md flex flex-col items-center justify-center text-center h-32">
                      {/* <Upload className="w-4 h-4 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">
                        Upload Banner
                      </span> */}
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 rounded-lg border border-border">
                  <div className="flex items-center w-full gap-4 border-b border-border">
                    <div className="w-full flex flex-col pt-3 pb-2">
                      <p className="text-xs uppercase text-muted-foreground">
                        Selected Plan
                      </p>
                      <span className="font-normal text-sm flex items-center gap-2 mt-1">
                        <CreditCard className="fill-primary text-background w-4 h-4" />
                        Growth Plan
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-1 pt-3 pb-2">
                      <span className="text-xs uppercase text-muted-foreground">
                        Next Billing
                      </span>
                      <span className="font-medium text-sm capitalize">
                        Nov 15, 2025
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center w-full gap-4">
                    <div className="w-full flex flex-col gap-1 pt-3 pb-2">
                      <span className="text-xs uppercase text-muted-foreground">
                        Billing Amount
                      </span>
                      <span className="font-medium text-sm capitalize">
                        ₦50,000
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-1 pt-3 pb-2">
                      <span className="text-xs uppercase text-muted-foreground">
                        Billing Cycle
                      </span>
                      <span className="font-medium text-sm capitalize">
                        Monthly
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 space-y-4 rounded-lg border border-border">
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">
                      Business Name
                    </span>
                    <span className="font-normal text-sm">{data.businessName}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">
                      Category
                    </span>
                    <span className="font-normal text-sm capitalize">
                      {data.category || "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">
                      Owner
                    </span>
                    <span className="font-normal text-sm">{data.fullName}</span>
                  </div>
                  <div className="flex justify-between pb-4">
                    <span className="text-xs uppercase text-muted-foreground">
                      Account
                    </span>
                    <span className="font-normal text-sm text-right">
                      {data.bankName}
                      <br />
                      {data.accountNumber}
                      <br />
                      {data.accountName}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-primary/20 bg-primary/5 rounded-lg">
                  <Checkbox className="mt-1"/>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    I confirm that I am the authorized representative of this
                    business and agree to Dispa8ch's Terms of Service and Vendor
                    Agreement.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-8 mt-8 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0 || isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={isLoading || verifyingAccount}
              className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[140px]"
            >
              {isLoading || verifyingAccount ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : currentStep === STEPS.length - 1 ? (
                "Submit Application"
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
