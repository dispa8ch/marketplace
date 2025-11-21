import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to customer marketplace by default
  redirect("/marketplace")
}
