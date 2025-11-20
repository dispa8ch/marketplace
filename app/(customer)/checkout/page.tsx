"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Protected from "@/components/auth/protected";
import LocationPermissionPrompt from "@/components/ui/location-permission-prompt";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    phone: "809 485 2456",
    country: "Nigeria",
    state: "Rivers",
    lga: "Obia/Akpor",
    address: "123 Ajakaja Street, Road 15, Rumuodumaya Port Harcout",
    address2: "",
    postalCode: "500102",
  });

  const cartItems = [
    {
      name: "Amazing Brand - Cool product with nice color",
      quantity: 2,
      price: 60000,
    },
    {
      name: "Amazing Brand - Cool product with nice color",
      quantity: 2,
      price: 60000,
    },
  ];

  const subtotal = 120000;
  const shipping = 5;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const steps = [
    { number: 1, label: "Personal Details" },
    { number: 2, label: "Delivery Information" },
    { number: 3, label: "Payment" },
  ];

  const handlePayment = () => {
    // Simulate payment with Paystack
    router.push("/tracking/JE-ZAF-1862318952-0401");
  };

  return (
    <Protected>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Steps */}
            <div className="lg:col-span-2">
              {/* Stepper */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((s, index) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          step > s.number
                            ? "bg-green-500 text-white"
                            : step === s.number
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step > s.number ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          s.number
                        )}
                      </div>
                      <div className="ml-3 hidden md:block">
                        <p
                          className={`text-sm font-medium ${
                            step >= s.number ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {s.label}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-4 ${
                          step > s.number ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Personal Details */}
              {step === 1 && (
                <Card className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Personal Details
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Set your location and delivery preferences
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input value="+234" className="w-20" readOnly />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {step > 1 && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setStep(step - 1)}
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        className="flex-1"
                        size="lg"
                        onClick={() => setStep(2)}
                      >
                        Continue to Shipping
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <Card className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Shipping Settings
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Set your location and delivery preferences
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <LocationPermissionPrompt />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(val) =>
                          setFormData({ ...formData, country: val })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nigeria">Nigeria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(val) =>
                          setFormData({ ...formData, state: val })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rivers">Rivers</SelectItem>
                          <SelectItem value="Lagos">Lagos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="lga">Local Government Area (LGA)</Label>
                      <Select
                        value={formData.lga}
                        onValueChange={(val) =>
                          setFormData({ ...formData, lga: val })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Obia/Akpor">Obia/Akpor</SelectItem>
                          <SelectItem value="Ikeja">Ikeja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address2">
                        Street Address 2 (Optional)
                      </Label>
                      <Input
                        id="address2"
                        placeholder="Enter a street address..."
                        value={formData.address2}
                        onChange={(e) =>
                          setFormData({ ...formData, address2: e.target.value })
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-3">
                      {step > 1 && (
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setStep(step - 1)}
                        >
                          Previous
                        </Button>
                      )}
                      <Button
                        className="flex-1"
                        size="lg"
                        onClick={() => setStep(3)}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <Card className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Payment
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Review your order and complete payment
                    </p>
                  </div>

                  {/* Shipping Info Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Shipping
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name</span>
                        <span className="text-gray-900 font-medium">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone Number</span>
                        <span className="text-gray-900 font-medium">
                          +234 {formData.phone}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="text-gray-900 font-medium">
                          {formData.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Country</span>
                        <span className="text-gray-900 font-medium">
                          {formData.country}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">State & LGA</span>
                        <span className="text-gray-900 font-medium">
                          {formData.state}, {formData.lga}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Street Address</span>
                        <span className="text-gray-900 font-medium text-right">
                          {formData.address.slice(0, 40)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Postal Code</span>
                        <span className="text-gray-900 font-medium">
                          {formData.postalCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      className="flex-1"
                      size="lg"
                      onClick={handlePayment}
                    >
                      Continue to Payment Via Paystack
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Column - Summary */}
            <div>
              <Card className="p-6 sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Summary</h3>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input placeholder="Discount Code" className="flex-1" />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">${shipping}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span className="text-gray-900">${shipping}</span>
                  </div>

                  <div className="flex items-center justify-between font-bold text-lg pt-3 border-t">
                    <span>Total</span>
                    <span className="text-primary">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
}
