import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function VendorSubscriptionPage() {
  const plans = [
    {
      name: "Free Plan",
      price: 0,
      period: "month",
      description: "For new businesses exploring e-commerce",
      features: [
        "Up to 10 product listings per vendor",
        "Standard delivery scheduling",
        "Access to basic order management tools",
        "Community access and vendor onboarding support",
        "Email-only support",
      ],
      isCurrent: true,
    },
    {
      name: "Starter Plan",
      price: 17000,
      period: "month",
      description: "For growing businesses ready to scale visibility & efficiency",
      features: [
        "Everything in the Free Plan",
        "Unlimited product listings",
        "Priority delivery slots for faster dispatch",
        "Basic analytics dashboard, sales, revenue & order trends",
        "Priority placement on category listings",
        "Access to promotional campaign for product listings",
        "24h support response via chat/email",
        "Custom branding tools: shop logo, banner, and product tagging",
      ],
      isCurrent: false,
    },
    {
      name: "Growth Plan",
      price: 50000,
      period: "month",
      description: "For established vendors managing volume & data-driven decisions",
      features: [
        "Everything in Starter Plan",
        "Advanced Analytics Suite: in-depth insights into sales, traffic, delivery speed & customer retention",
        "Team Access: Add and manage multiple staff members with custom permissions",
        "Access to small business loans via partner fintechs",
        "Smart order automation: assign deliveries & update status automatically",
        "Revenue reports & exportable data (Excel, PDF)",
        "Wallet access with no transaction limits",
        "Priority delivery dispatch & customer support (6h response window)",
      ],
      isCurrent: false,
      popular: true,
    },
    {
      name: "Enterprise Plan",
      price: null,
      period: "Custom Pricing",
      description: "Tailored for large businesses and partners needing scale, reliability, and custom integrations",
      features: [
        "Everything in the Growth Plan",
        "Custom contract & invoicing options (monthly/quarterly/annual)",
        "Dedicated Account Manager for strategic growth support",
        "API Access for custom integrations",
        "White-label marketplace options",
        "Priority technical support (24/7)",
      ],
      isCurrent: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#171717]">Subscription</h1>
          <p className="text-[#757575] mt-1">Upgrade and get more out of Dispa8ch</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-[#E6E6E6] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#F5F5F5] transition-colors">
            Contact Us
          </button>
          <button className="bg-[#E41F47] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#C11A3D] transition-colors">
            Change Plan
          </button>
        </div>
      </div>

      {/* Current Plan Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#757575]">Current Plan</p>
              <h2 className="text-2xl font-bold text-[#171717] mt-1">Free Plan</h2>
              <p className="text-[#757575] mt-2">Get started at no cost and experience the basics of Dispa8ch</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#757575]">Plan Cost</p>
              <p className="text-3xl font-bold text-[#171717] mt-1">
                ₦0.00<span className="text-base font-normal text-[#757575]">/month</span>
              </p>
              <p className="text-sm text-[#757575] mt-2">Renewal Date</p>
              <p className="text-sm font-medium text-[#171717]">Oct 25, 2025 08:20 AM</p>
              <p className="text-sm text-green-600 mt-1">Forever Free</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 py-4">
        <span className="text-sm font-medium text-[#171717]">Bill Monthly</span>
        <button className="relative w-12 h-6 bg-[#E6E6E6] rounded-full transition-colors">
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
        </button>
        <span className="text-sm font-medium text-[#171717]">
          Bill Yearly <span className="text-[#E41F47]">-30%</span>
        </span>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-2 border-[#E41F47] relative" : ""}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#E41F47] text-white px-3 py-1 rounded-full text-xs font-medium">Most Popular</span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg font-bold text-[#171717]">{plan.name}</CardTitle>
              <div className="mt-4">
                {plan.price !== null ? (
                  <>
                    <span className="text-3xl font-bold text-[#171717]">₦{plan.price.toLocaleString()}</span>
                    <span className="text-[#757575]">/{plan.period}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-[#171717]">{plan.period}</span>
                )}
              </div>
              <p className="text-sm text-[#757575] mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-[#171717]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  plan.isCurrent
                    ? "bg-[#F5F5F5] text-[#757575] cursor-not-allowed"
                    : plan.popular
                      ? "bg-[#E41F47] text-white hover:bg-[#C11A3D]"
                      : "border border-[#E6E6E6] text-[#171717] hover:bg-[#F5F5F5]"
                }`}
              >
                {plan.isCurrent
                  ? "Current Plan"
                  : plan.price !== null
                    ? `Upgrade to ${plan.name.split(" ")[0]}`
                    : "Contact Sales"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#171717]">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E6E6E6]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Plan Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Card</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Purchase Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">End Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[#171717]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    plan: "Growth Oct 2025",
                    card: "4664 **** **** 1678",
                    amount: "₦50,000/month",
                    status: "Success",
                    purchaseDate: "01/10/2025 03:45AM",
                    endDate: "31/10/2025 03:45AM",
                  },
                  {
                    plan: "Growth Sep 2025",
                    card: "4664 **** **** 1678",
                    amount: "₦50,000/month",
                    status: "Success",
                    purchaseDate: "01/09/2025 10:15PM",
                    endDate: "31/09/2025 10:15PM",
                  },
                  {
                    plan: "Growth Aug 2025",
                    card: "4664 **** **** 1678",
                    amount: "₦50,000/month",
                    status: "Pending",
                    purchaseDate: "01/08/2025 04:12AM",
                    endDate: "31/08/2025 04:12AM",
                  },
                  {
                    plan: "Growth Jul 2025",
                    card: "4664 **** **** 1678",
                    amount: "₦50,000/month",
                    status: "Success",
                    purchaseDate: "01/07/2025 11:45PM",
                    endDate: "31/07/2025 11:45PM",
                  },
                  {
                    plan: "Starter Jun 2025",
                    card: "4664 **** **** 1678",
                    amount: "₦17,000/month",
                    status: "Failed",
                    purchaseDate: "01/06/2025 09:29AM",
                    endDate: "31/06/2025 09:29AM",
                  },
                  {
                    plan: "Starter May 2025",
                    card: "4664 **** **** 1678",
                    amount: "₦17,000/month",
                    status: "Success",
                    purchaseDate: "01/05/2025 09:22AM",
                    endDate: "31/05/2025 09:22AM",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#FFEDF0]/30">
                    <td className="py-4 px-4 text-sm text-[#171717]">{item.plan}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.card}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.amount}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Success"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.purchaseDate}</td>
                    <td className="py-4 px-4 text-sm text-[#757575]">{item.endDate}</td>
                    <td className="py-4 px-4">
                      <button className="text-[#757575] hover:text-[#171717]">•••</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E6E6E6]">
            <p className="text-sm text-[#757575]">6 out of 25 entries</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">&lt;</button>
              <button className="px-3 py-1 bg-[#E41F47] text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">2</button>
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">5</button>
              <button className="px-3 py-1 border border-[#E6E6E6] rounded text-sm hover:bg-[#F5F5F5]">&gt;</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
