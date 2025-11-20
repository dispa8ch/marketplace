import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function VendorSettingsGeneralPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#171717]">Profile Settings</CardTitle>
        <p className="text-sm text-[#757575]">Update your business or personal information</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Banner Upload */}
        <div>
          <label className="block text-sm font-medium text-[#171717] mb-2">Upload Banner</label>
          <div className="border-2 border-dashed border-[#E6E6E6] rounded-lg p-8 text-center hover:border-[#E41F47] transition-colors cursor-pointer">
            <p className="text-sm text-[#757575]">Click to upload or drag and drop</p>
            <p className="text-xs text-[#757575] mt-1">PNG, JPG up to 10MB</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Business Name *</label>
            <input
              type="text"
              defaultValue="Paris Food Ventures"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Display/Brand Name *</label>
            <input
              type="text"
              defaultValue="Paris Super Mart"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Phone Number *</label>
            <div className="flex gap-2">
              <select className="border border-[#E6E6E6] rounded-md px-3 py-2 text-sm">
                <option>+234</option>
              </select>
              <input
                type="tel"
                defaultValue="809 456 7890"
                className="flex-1 border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Email Address *</label>
            <input
              type="email"
              defaultValue="johndoe@gmail.com"
              className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Business Type *</label>
            <select className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20">
              <option>Registered Company</option>
              <option>Individual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">Business Category *</label>
            <select className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20">
              <option>Food & Beverages</option>
              <option>Fashion</option>
              <option>Electronics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">City *</label>
            <select className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20">
              <option>Port Harcourt</option>
              <option>Lagos</option>
              <option>Abuja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#171717] mb-2">State *</label>
            <select className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20">
              <option>Rivers</option>
              <option>Lagos</option>
              <option>FCT</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#171717] mb-2">Business Address *</label>
          <input
            type="text"
            defaultValue="123 Main Street Avenue, Off Highway Road"
            className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#171717] mb-2">Short Description</label>
          <textarea
            defaultValue="We sell premium pastries across Owerri"
            rows={4}
            maxLength={500}
            className="w-full border border-[#E6E6E6] rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F47]/20"
          />
          <p className="text-xs text-[#757575] mt-1">20/500</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#E6E6E6]">
          <button className="border border-[#E6E6E6] px-6 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Cancel
          </button>
          <button className="bg-[#E41F47] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
            Save Changes
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
