import { createContext, useContext } from "react";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const currency = "INR";
  const loading = false;

  const formatPrice = (priceInINR) => {
    if (!priceInINR) return "";
    
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(priceInINR);
  };

  const value = { currency, formatPrice, loading };
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
