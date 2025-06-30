
// Currency conversion rates (PKR as base currency)
const CURRENCY_RATES = {
  PKR: 1,
  USD: 0.0036, // 1 PKR = 0.0036 USD
  AED: 0.013,  // 1 PKR = 0.013 AED
  GBP: 0.0028, // 1 PKR = 0.0028 GBP
};

export const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string): number => {
  // Convert to PKR first (base currency)
  const pkrAmount = fromCurrency === 'PKR' ? amount : amount / CURRENCY_RATES[fromCurrency as keyof typeof CURRENCY_RATES];
  
  // Convert from PKR to target currency
  const convertedAmount = toCurrency === 'PKR' ? pkrAmount : pkrAmount * CURRENCY_RATES[toCurrency as keyof typeof CURRENCY_RATES];
  
  return Math.round(convertedAmount);
};

export const getCurrencySymbol = (currency: string): string => {
  const symbols = {
    PKR: 'PKR',
    USD: '$',
    AED: 'AED',
    GBP: '£'
  };
  return symbols[currency as keyof typeof symbols] || currency;
};
