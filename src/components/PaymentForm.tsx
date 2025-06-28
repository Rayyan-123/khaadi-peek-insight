
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building2 } from "lucide-react";

interface PaymentFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  currency: string;
  region: string;
  banks: string[];
  onPaymentSuccess: () => void;
}

export const PaymentForm = ({ product, currency, region, banks, onPaymentSuccess }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: ""
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ibanNumber: "",
    bankName: "",
    accountHolderName: "",
    routingNumber: ""
  });

  const handleCardChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (field: string, value: string) => {
    setBankDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    // Simulate payment processing
    console.log("Processing payment:", {
      product: product.id,
      currency,
      region,
      paymentMethod,
      details: paymentMethod === "card" ? cardDetails : bankDetails
    });
    
    // Simulate API call
    setTimeout(() => {
      alert("Payment successful! Order confirmed.");
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "bank")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">
              <CreditCard className="w-4 h-4 mr-2" />
              Card Payment
            </TabsTrigger>
            <TabsTrigger value="bank">
              <Building2 className="w-4 h-4 mr-2" />
              Bank Transfer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={(e) => handleCardChange("cardNumber", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={cardDetails.cardholderName}
                onChange={(e) => handleCardChange("cardholderName", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryMonth">Month</Label>
                <Select value={cardDetails.expiryMonth} onValueChange={(value) => handleCardChange("expiryMonth", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expiryYear">Year</Label>
                <Select value={cardDetails.expiryYear} onValueChange={(value) => handleCardChange("expiryYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                        {String(new Date().getFullYear() + i).slice(-2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  maxLength={4}
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardChange("cvv", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="space-y-4">
            <div>
              <Label htmlFor="bankName">Select Bank</Label>
              <Select value={bankDetails.bankName} onValueChange={(value) => handleBankChange("bankName", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                placeholder="John Doe"
                value={bankDetails.accountHolderName}
                onChange={(e) => handleBankChange("accountHolderName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="1234567890"
                value={bankDetails.accountNumber}
                onChange={(e) => handleBankChange("accountNumber", e.target.value)}
              />
            </div>
            {region === "Pakistan" && (
              <div>
                <Label htmlFor="ibanNumber">IBAN Number</Label>
                <Input
                  id="ibanNumber"
                  placeholder="PK36SCBL0000001123456702"
                  value={bankDetails.ibanNumber}
                  onChange={(e) => handleBankChange("ibanNumber", e.target.value)}
                />
              </div>
            )}
            {region !== "Pakistan" && (
              <div>
                <Label htmlFor="routingNumber">Routing Number</Label>
                <Input
                  id="routingNumber"
                  placeholder="123456789"
                  value={bankDetails.routingNumber}
                  onChange={(e) => handleBankChange("routingNumber", e.target.value)}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Order Summary</h4>
          <div className="flex justify-between items-center">
            <span>{product.name}</span>
            <span className="font-bold">{currency} {product.price}</span>
          </div>
        </div>

        <Button 
          onClick={handlePayment} 
          className="w-full mt-6 bg-amber-600 hover:bg-amber-700"
        >
          Pay {currency} {product.price}
        </Button>
      </CardContent>
    </Card>
  );
};
