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
      toast({ title: "Account Verified", description: `Account Name: ${mockAccountName}` })
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
      })

      router.push("/vendor")
    } catch (error) {
      console.error(error)
      // Fallback for demo if table doesn't exist
      toast({
        title: "Application Submitted",
        description: "Your application has been received (Demo Mode).",
      })
      router.push("/vendor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-[#2A402D]/10 bg-white/50 backdrop-blur-md sticky top-0 z-50 flex items-center px-6 justify-between">
        <span className="font-serif font-bold text-xl tracking-tight text-[#2A402D]">DISPA8CH</span>
        <div className="text-xs uppercase tracking-widest text-[#5C6B5E] font-medium">Vendor Onboarding</div>
      </header>

      <div className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-12">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex justify-between mb-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2A402D]/10 -z-10" />
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-col items-center bg-[#F5F5F0] px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors duration-300
                    ${
                      index <= currentStep
                        ? "bg-[#2A402D] text-white border-[#2A402D]"
                        : "bg-white text-[#5C6B5E] border-[#2A402D]/20"
                    }`}
                >
                  {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest mt-2 hidden sm:block ${index <= currentStep ? "text-[#2A402D] font-bold" : "text-[#5C6B5E]"}`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 shadow-sm border border-[#2A402D]/5 min-h-[400px]">
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-[#2A402D] mb-2">{STEPS[currentStep]}</h2>
            <p className="text-[#5C6B5E] text-sm">Please provide the requested information to set up your shop.</p>
          </div>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* STEP 1: OWNER INFO */}
            {currentStep === 0 && (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>FULL NAME</Label>
                    <Input
                      value={data.fullName}
                      onChange={(e) => setData({ ...data, fullName: e.target.value })}
                      className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>EMAIL ADDRESS</Label>
                    <Input
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>PHONE NUMBER</Label>
                    <Input
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>CREATE PASSWORD</Label>
                    <Input
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                      className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
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
                <div className="space-y-4">
                  <Label>BUSINESS NAME</Label>
                  <Input
                    value={data.businessName}
                    onChange={(e) => setData({ ...data, businessName: e.target.value })}
                    className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                    placeholder="My Awesome Store"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>BUSINESS TYPE</Label>
                    <Select onValueChange={(v) => setData({ ...data, businessType: v })} value={data.businessType}>
                      <SelectTrigger className="border-b border-[#2A402D]/30 rounded-none bg-transparent px-0 focus:ring-0 border-t-0 border-l-0 border-r-0">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                        <SelectItem value="registered">Registered Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label>MAIN CATEGORY</Label>
                    <Select onValueChange={(v) => setData({ ...data, category: v })} value={data.category}>
                      <SelectTrigger className="border-b border-[#2A402D]/30 rounded-none bg-transparent px-0 focus:ring-0 border-t-0 border-l-0 border-r-0">
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

                <div className="space-y-4">
                  <Label>DESCRIPTION</Label>
                  <Textarea
                    placeholder="Tell us about your brand..."
                    className="resize-none bg-[#F5F5F0]/50 border-0 rounded-none focus-visible:ring-1 ring-[#2A402D]/20 min-h-[100px]"
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                  />
                </div>

                <div className="space-y-4">
                  <Label>BUSINESS ADDRESS</Label>
                  <div className="relative">
                    <Input
                      placeholder="Search for address..."
                      value={data.address}
                      onChange={(e) => setData({ ...data, address: e.target.value })}
                      className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D] pr-10"
                    />
                    <MapPin className="absolute right-0 top-2 h-4 w-4 text-[#5C6B5E]" />
                  </div>
                  {/* Mapbox Mock Placeholder */}
                  <div className="h-40 bg-[#F5F5F0] rounded-md flex items-center justify-center border border-[#2A402D]/10">
                    <span className="text-xs text-[#5C6B5E]">Map Preview (Mapbox Integration)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>BRAND LOGO</Label>
                    <div className="border border-dashed border-[#2A402D]/30 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F5F5F0] transition-colors">
                      <Upload className="w-4 h-4 text-[#5C6B5E] mb-1" />
                      <span className="text-[10px] text-[#5C6B5E]">Upload Logo</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>STORE BANNER</Label>
                    <div className="border border-dashed border-[#2A402D]/30 p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#F5F5F0] transition-colors">
                      <Upload className="w-4 h-4 text-[#5C6B5E] mb-1" />
                      <span className="text-[10px] text-[#5C6B5E]">Upload Banner</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3: COMPLIANCE DOCUMENTS */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {[
                  { label: "VALID ID CARD", key: "idDocument" },
                  { label: "CAC CERTIFICATE", key: "cacCertificate" },
                  { label: "UTILITY BILL", key: "utilityBill" },
                  { label: "BUSINESS LICENSE", key: "businessLicense" },
                ].map((doc) => (
                  <div key={doc.key} className="flex items-center justify-between border-b border-[#2A402D]/10 pb-4">
                    <div className="space-y-1">
                      <Label className="text-xs">{doc.label}</Label>
                      <p className="text-[10px] text-[#757575]">PDF, JPG or PNG (Max 5MB)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {data[doc.key as keyof typeof data] ? (
                        <div className="flex items-center gap-2 text-[#2A402D]">
                          <Check className="h-4 w-4" />
                          <span className="text-xs">Uploaded</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs border-[#2A402D]/20 hover:bg-[#F5F5F0] hover:text-[#2A402D] bg-transparent"
                        >
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
                <div className="space-y-4">
                  <Label>BANK NAME</Label>
                  <Select onValueChange={(v) => setData({ ...data, bankName: v })} value={data.bankName}>
                    <SelectTrigger className="border-b border-[#2A402D]/30 rounded-none bg-transparent px-0 focus:ring-0 border-t-0 border-l-0 border-r-0">
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
                <div className="space-y-4">
                  <Label>ACCOUNT NUMBER</Label>
                  <Input
                    placeholder="0000000000"
                    value={data.accountNumber}
                    onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
                    className="bg-transparent border-b border-[#2A402D]/30 px-0 rounded-none focus-visible:ring-0 focus-visible:border-[#2A402D]"
                    maxLength={10}
                  />
                </div>

                {data.accountName && (
                  <div className="bg-[#E41F47]/5 p-4 rounded border border-[#E41F47]/20 flex items-center gap-3 animate-in fade-in">
                    <Check className="h-4 w-4 text-[#E41F47]" />
                    <div>
                      <p className="text-[10px] text-[#757575] uppercase tracking-wider">Account Verified</p>
                      <p className="text-sm font-medium text-[#2A402D]">{data.accountName}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 5: REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-[#F5F5F0] p-6 space-y-4 rounded-sm">
                  <div className="flex justify-between pb-4 border-b border-[#2A402D]/10">
                    <span className="text-xs uppercase text-[#5C6B5E]">Business Name</span>
                    <span className="font-serif text-[#2A402D]">{data.businessName}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-[#2A402D]/10">
                    <span className="text-xs uppercase text-[#5C6B5E]">Category</span>
                    <span className="font-serif text-[#2A402D] capitalize">{data.category || "Not set"}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-[#2A402D]/10">
                    <span className="text-xs uppercase text-[#5C6B5E]">Owner</span>
                    <span className="font-serif text-[#2A402D]">{data.fullName}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-[#2A402D]/10">
                    <span className="text-xs uppercase text-[#5C6B5E]">Account</span>
                    <span className="font-serif text-[#2A402D] text-right">
                      {data.bankName}
                      <br />
                      {data.accountNumber}
                      <br />
                      {data.accountName}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-[#E41F47]/20 bg-[#E41F47]/5">
                  <div className="min-w-4 h-4 rounded-full border border-[#E41F47] mt-1" />
                  <p className="text-xs text-[#2A402D]">
                    I confirm that I am the authorized representative of this business and agree to Dispa8ch's Terms of
                    Service and Vendor Agreement.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-12 mt-8 border-t border-[#2A402D]/10">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0 || isLoading}
              className="text-[#5C6B5E] hover:text-[#2A402D] hover:bg-transparent pl-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={isLoading || verifyingAccount}
              className="rounded-full px-8 bg-[#2A402D] hover:bg-[#2A402D]/90 text-white min-w-[140px]"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : verifyingAccount ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : currentStep === STEPS.length - 1 ? (
                "Submit Application"
              ) : currentStep === 3 && !data.accountName ? (
                "Verify Account"
              ) : (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
