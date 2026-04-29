import { CommercialInvoice } from "./components/CommercialInvoice";
import { Analytics } from "@vercel/analytics/next";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <CommercialInvoice />
    </div>
  );
}