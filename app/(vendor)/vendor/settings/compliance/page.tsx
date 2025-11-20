import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorComplianceSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#171717]">Business Verification & Documents</CardTitle>
        <p className="text-sm text-[#757575]">Manage your legal and financial compliance information</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium text-[#171717] mb-2">
            Upload Business Certificate or ID (jpg/pdf)
          </label>
          <div className="border-2 border-dashed border-[#E6E6E6] rounded-lg p-8 text-center hover:border-[#E41F47] transition-colors cursor-pointer">
            <p className="text-sm text-[#757575]">Drag & Drop/Upload</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">CAC Registration Number *</label>
            <input
              type="text"
              placeholder="e.g. 123-202-200-409"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Tax ID (Optional)</label>
            <input
              type="text"
              placeholder="e.g. TIN-202-200-409"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Bank Account Name *</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Bank Account Number *</label>
            <input
              type="text"
              defaultValue="1234567890"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Bank Name *</label>
            <select className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20">
              <option>Access Bank</option>
              <option>GTBank</option>
              <option>First Bank</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Proof of Address *</label>
            <select className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20">
              <option>Utility Bill</option>
              <option>Bank Statement</option>
              <option>Rent Agreement</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E6E6]">
          <button className="border border-[#E6E6E6] px-6 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Edit
          </button>
          <button className="bg-[#E41F47] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
            Select File
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
