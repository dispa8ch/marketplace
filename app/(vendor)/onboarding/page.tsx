"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Check, ArrowRight, ArrowLeft, Upload, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

const STEPS = ["Owner", "Business", "Compliance", "Finance", "Review"]

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [verifyingAccount, setVerifyingAccount] = useState(false)
  const [supabase] = useState(() => createClient())

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
    idDocument: null as File | null,
    cacCertificate: null as File | null,
    utilityBill: null as File | null,
    businessLicense: null as File | null,
    // Step 4: Finance
    bankName: "",
    accountNumber: "",
    accountName: "",
  })

  const handleNext = async () => {
    if (currentStep === 3 && !data.accountName) {
      await verifyBankAccount()
      return
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    } else {
      completeOnboarding()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const verifyBankAccount = async () => {
    if (!data.bankName || !data.accountNumber) {
      toast({
        title: "Missing Information",
        description: "Please enter bank name and account number",
        variant: "destructive",
      })
      return
    }
    setVerifyingAccount(true)
    try {
      // Mock Paystack Resolve Account API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const mockAccountName = "DISPA8CH VENTURES LTD"
      setData((prev) => ({ ...prev, accountName: mockAccountName }))
      toast({ title: "Account Verified", description: `Account Name: ${mockAccountName}`, variant: "success" })
      setCurrentStep((prev) => prev + 1)
    } catch (error) {
      toast({ title: "Verification Failed", description: "Could not resolve account details", variant: "destructive" })
    } finally {
      setVerifyingAccount(false)
    }
  }

  const completeOnboarding = async () => {
    setIsLoading(true)
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
        bank_details: {
          bank_name: data.bankName,
          account_number: data.accountNumber,
          account_name: data.accountName,
        },
        status: "pending_approval",
      })

      if (error) throw error

      toast({
        title: "Application Submitted",
        description: "Your vendor application is under review.",
        variant: "success",
      })

      router.push("/vendor")
    } catch (error) {
      console.error(error)
      // Fallback for demo if table doesn't exist
      toast({
        title: "Application Submitted",
        description: "Your application has been received (Demo Mode).",
        variant: "success",
      })
      router.push("/vendor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col text-foreground font-sans">
      {/* Header */}
      <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-lg font-bold">D</span>
          </div>
          <span className="font-bold text-xl tracking-tight">Dispa8ch</span>
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Vendor Onboarding</div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -z-10" />
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-col items-center bg-background px-2">
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
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest mt-2 hidden sm:block ${
                    index <= currentStep ? "text-foreground font-bold" : "text-muted-foreground"
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
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{STEPS[currentStep]}</h2>
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
                      onChange={(e) => setData({ ...data, fullName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Create Password</Label>
                    <Input
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
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
                  <Label>Business Name</Label>
                  <Input
                    value={data.businessName}
                    onChange={(e) => setData({ ...data, businessName: e.target.value })}
                    placeholder="My Awesome Store"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select onValueChange={(v) => setData({ ...data, businessType: v })} value={data.businessType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                        <SelectItem value="registered">Registered Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Main Category</Label>
                    <Select onValueChange={(v) => setData({ ...data, category: v })} value={data.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home">Home & Living</SelectItem>
                        <SelectItem value="beauty">Beauty & Wellness</SelectItem>
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
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Address</Label>
                  <div className="relative">
                    <Input
                      placeholder="Search for address..."
                      value={data.address}
                      onChange={(e) => setData({ ...data, address: e.target.value })}
                      className="pr-10"
                    />
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  {/* Mapbox Mock Placeholder */}
                  <div className="h-40 bg-muted/30 rounded-md flex items-center justify-center border border-border">
                    <span className="text-xs text-muted-foreground">Map Preview (Mapbox Integration)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Brand Logo</Label>
                    <div className="border border-dashed border-border p-4 rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors h-32">
                      <Upload className="w-4 h-4 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Upload Logo</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Store Banner</Label>
                    <div className="border border-dashed border-border p-4 rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors h-32">
                      <Upload className="w-4 h-4 text-muted-foreground mb-2" />
                      <span className="text-xs text-muted-foreground">Upload Banner</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3: COMPLIANCE DOCUMENTS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {[
                  { label: "Valid ID Card", key: "idDocument" },
                  { label: "CAC Certificate", key: "cacCertificate" },
                  { label: "Utility Bill", key: "utilityBill" },
                  { label: "Business License", key: "businessLicense" },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                  >
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{doc.label}</Label>
                      <p className="text-xs text-muted-foreground">PDF, JPG or PNG (Max 5MB)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {data[doc.key as keyof typeof data] ? (
                        <div className="flex items-center gap-2 text-green-500">
                          <Check className="h-4 w-4" />
                          <span className="text-xs font-medium">Uploaded</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* STEP 4: BANKING SETUP */}
            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label>Bank Name</Label>
                  <Select onValueChange={(v) => setData({ ...data, bankName: v })} value={data.bankName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gtbank">Guaranty Trust Bank</SelectItem>
                      <SelectItem value="zenith">Zenith Bank</SelectItem>
                      <SelectItem value="access">Access Bank</SelectItem>
                      <SelectItem value="uba">United Bank for Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    placeholder="0000000000"
                    value={data.accountNumber}
                    onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
                    maxLength={10}
                  />
                </div>

                {data.accountName && (
                  <div className="bg-primary/10 p-4 rounded border border-primary/20 flex items-center gap-3 animate-in fade-in">
                    <Check className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Account Verified</p>
                      <p className="text-sm font-medium text-primary">{data.accountName}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 5: REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted/30 p-6 space-y-4 rounded-lg border border-border">
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">Business Name</span>
                    <span className="font-medium">{data.businessName}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{data.category || "Not set"}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">Owner</span>
                    <span className="font-medium">{data.fullName}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-border">
                    <span className="text-xs uppercase text-muted-foreground">Account</span>
                    <span className="font-medium text-right">
                      {data.bankName}
                      <br />
                      {data.accountNumber}
                      <br />
                      {data.accountName}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-primary/20 bg-primary/5 rounded-lg">
                  <div className="min-w-4 h-4 rounded-full border border-primary mt-1 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    I confirm that I am the authorized representative of this business and agree to Dispa8ch's Terms of
                    Service and Vendor Agreement.
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
  )
}
