import { useCurrency } from "../context/CurrencyContext";
import { ChevronDown } from "lucide-react";

const currencies = ["INR", "USD", "EUR", "GBP", "AED", "AUD", "CAD"];

export default function CurrencySelector() {
  const { currency, setCurrency, loading } = useCurrency();

  if (loading) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-[11px] font-body text-gray-600 hover:text-gold transition-colors tracking-wider">
        {currency} <ChevronDown size={12} />
      </button>
      <div className="absolute top-full right-0 mt-2 w-24 bg-white shadow-lg border border-gray-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        {currencies.map((cur) => (
          <button
            key={cur}
            onClick={() => setCurrency(cur)}
            className={`w-full text-left px-4 py-2 text-[11px] font-body hover:bg-gray-50 transition-colors ${cur === currency ? "text-gold font-medium" : "text-gray-600"}`}
          >
            {cur}
          </button>
        ))}
      </div>
    </div>
  );
}
