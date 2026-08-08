import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState({ INR: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/INR");
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
        }
      } catch (err) {
        console.error("Failed to fetch exchange rates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const formatPrice = (priceInINR) => {
    if (!priceInINR) return "";
    const rate = rates[currency] || 1;
    const converted = priceInINR * rate;
    
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: currency === "INR" ? 0 : 2,
    }).format(converted);
  };

  const value = { currency, setCurrency, formatPrice, loading };
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
