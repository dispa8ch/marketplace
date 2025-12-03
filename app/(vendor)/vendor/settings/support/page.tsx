"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"
import Iconex from "@/components/icons/iconex"

export default function VendorSupportSettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#171717]">Help & Support</CardTitle>
          <p className="text-sm text-[#757575]">We're here to help you succeed</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search FAQ */}
          <div className="relative">
            <input
              type="search"
              placeholder='e.g., "How to withdraw"...'
              className="w-full border border-[#E6E6E6] rounded-md pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#E41F47] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#C11A3D]">
              Submit a Support Ticket
            </button>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-sm font-semibold text-[#171717] mb-4">FAQs</h3>
            <div className="space-y-3">
              {[
                {
                  question: "How to withdraw?",
                  answer:
                    'Navigate to the "Payout" section of your dashboard, in the right hand-side panel you\'ll identify your "Available Balance" and its interaction. Click the "Withdraw" button and follow the instructions.',
                  isOpen: true,
                },
                { question: "How do I add my bank account?", answer: "", isOpen: false },
                { question: "How do I change the status of my order?", answer: "", isOpen: false },
                { question: "What is Ready Stock vs Made-to-order?", answer: "", isOpen: false },
              ].map((faq, index) => (
                <div key={index} className="border border-[#E6E6E6] rounded-lg">
                  <button className="w-full flex items-center justify-between p-4 text-left hover:bg-[#F5F5F5]">
                    <span className="text-sm font-medium text-[#171717]">{faq.question}</span>
                    {faq.isOpen ? (
                      <Iconex icon={Minus} className="h-full w-full text-[#757575]"/>
                    ) : (
                      <Iconex icon={Plus} className="h-full w-full text-[#757575]"/>
                    )}
                  </button>
                  {faq.isOpen && <div className="px-4 pb-4 text-sm text-[#757575]">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Support & Resources */}
          <div className="grid gap-6 md:grid-cols-2 pt-6 border-t border-[#E6E6E6]">
            <div>
              <h3 className="text-sm font-semibold text-[#171717] mb-3">Chat Support</h3>
              <button className="w-full border border-[#E6E6E6] px-4 py-3 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
                Start Live Chat
              </button>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#171717] mb-3">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-[#E41F47] hover:underline">
                  Tutorials
                </a>
                <a href="#" className="block text-sm text-[#E41F47] hover:underline">
                  Community Forums
                </a>
                <p className="text-sm text-[#757575]">Contact Email</p>
                <a href="mailto:support@dispa8ch.com" className="block text-sm text-[#E41F47] hover:underline">
                  support@dispa8ch.com
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
