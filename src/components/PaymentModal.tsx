
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  region: string;
  currency: string;
}

const pakistaniBanks = [
  "HBL (Habib Bank Limited)",
  "MCB (Muslim Commercial Bank)",
  "Meezan Bank",
  "UBL (United Bank Limited)",
  "Allied Bank",
  "Bank Alfalah",
  "Faysal Bank",
  "Standard Chartered Pakistan"
];

const internationalBanks = {
  US: ["Bank of America", "Chase", "Wells Fargo", "Citibank"],
  UK: ["Barclays", "HSBC", "Lloyds Bank", "NatWest"],
  UAE: ["Emirates NBD", "ADCB", "Mashreq Bank", "RAKBANK"],
  Global: ["Visa", "Mastercard", "American Express", "PayPal"]
};

export const PaymentModal = ({ isOpen, onClose, product, region, currency }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState(product.price.toString());

  const banks = region === "Pakistan" ? pakistaniBanks : internationalBanks[region as keyof typeof internationalBanks] || internationalBanks.Global;

  const handlePayment = async () => {
    // Integrate with Stripe or other payment processor
    console.log("Processing payment:", {
      product: product.id,
      amount,
      currency,
      paymentMethod,
      selectedBank,
      region
    });
    
    // For now, show success message
    alert("Payment processing... This will integrate with your payment system.");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-lg font-bold text-amber-600">{currency} {product.price.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label>Payment Method</Label>
            <div className="flex space-x-4">
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="flex-1"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Card Payment
              </Button>
              <Button
                variant={paymentMethod === "bank" ? "default" : "outline"}
                onClick={() => setPaymentMethod("bank")}
                className="flex-1"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Bank Transfer
              </Button>
            </div>
          </div>

          {/* Bank Selection */}
          {paymentMethod === "bank" && (
            <div className="space-y-2">
              <Label>Select Bank</Label>
              <Select value={selectedBank} onValueChange={setSelectedBank}>
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
          )}

          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount ({currency})</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={product.price}
              step="0.01"
            />
            <p className="text-sm text-gray-500">
              Minimum: {currency} {product.price.toLocaleString()}
            </p>
          </div>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment} 
            className="w-full bg-amber-600 hover:bg-amber-700"
            disabled={paymentMethod === "bank" && !selectedBank}
          >
            Pay {currency} {parseFloat(amount).toLocaleString()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
