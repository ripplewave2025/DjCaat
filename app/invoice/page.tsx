import { redirect } from "next/navigation";

export default function InvoiceRedirect() {
  redirect("/admin/plan");
}
