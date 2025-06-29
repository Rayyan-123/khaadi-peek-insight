
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    discountPrice?: number;
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
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [amount, setAmount] = useState((product.discountPrice || product.price).toString());
  const { toast } = useToast();

  const banks = region === "Pakistan" ? pakistaniBanks : internationalBanks[region as keyof typeof internationalBanks] || internationalBanks.Global;
  const finalPrice = product.discountPrice || product.price;

  const handlePayment = async () => {
    // Validate amount
    if (parseFloat(amount) < finalPrice) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be at least ${currency} ${finalPrice}`,
        variant: "destructive"
      });
      return;
    }

    // Create order record
    const orderData = {
      orderId: Date.now().toString(),
      product: product,
      amount: parseFloat(amount),
      currency,
      region,
      paymentMethod,
      paymentDetails: paymentMethod === "card" ? cardDetails : bankDetails,
      customerDetails,
      timestamp: new Date().toISOString()
    };

    // Store order locally (in real app, send to backend)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Simulate payment processing
    toast({
      title: "Order Placed Successfully!",
      description: `Order #${orderData.orderId} has been submitted. We'll contact you soon for delivery.`,
    });

    // Send notification to admin (simulate)
    console.log("New Order Notification:", orderData);
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-bold text-amber-600">{currency} {finalPrice.toLocaleString()}</p>
                    {product.discountPrice && (
                      <p className="text-sm text-gray-500 line-through">{currency} {product.price.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label>Phone Number *</Label>
                  <Input
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <Label>Delivery Address *</Label>
                <Input
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  placeholder="Enter complete address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City *</Label>
                  <Input
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <Label>Postal Code</Label>
                  <Input
                    value={customerDetails.postalCode}
                    onChange={(e) => setCustomerDetails({...customerDetails, postalCode: e.target.value})}
                    placeholder="Enter postal code"
                  />
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

          {/* Payment Details */}
          {paymentMethod === "card" ? (
            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Card Number</Label>
                  <Input
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                </div>
                <div>
                  <Label>Cardholder Name</Label>
                  <Input
                    value={cardDetails.cardholderName}
                    onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                    placeholder="Name on card"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Month</Label>
                    <Select value={cardDetails.expiryMonth} onValueChange={(value) => setCardDetails({...cardDetails, expiryMonth: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 12}, (_, i) => (
                          <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>
                            {String(i+1).padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Select value={cardDetails.expiryYear} onValueChange={(value) => setCardDetails({...cardDetails, expiryYear: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="YY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 10}, (_, i) => (
                          <SelectItem key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                            {String(new Date().getFullYear() + i).slice(-2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Bank Transfer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Bank</Label>
                  <Select value={bankDetails.bankName} onValueChange={(value) => setBankDetails({...bankDetails, bankName: value})}>
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
                  <Label>Account Holder Name</Label>
                  <Input
                    value={bankDetails.accountHolderName}
                    onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
                    placeholder="Account holder name"
                  />
                </div>
                <div>
                  <Label>Account Number</Label>
                  <Input
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    placeholder="Account number"
                  />
                </div>
                {region === "Pakistan" && (
                  <div>
                    <Label>IBAN Number</Label>
                    <Input
                      value={bankDetails.ibanNumber}
                      onChange={(e) => setBankDetails({...bankDetails, ibanNumber: e.target.value})}
                      placeholder="PK36SCBL0000001123456702"
                    />
                  </div>
                )}
                {region !== "Pakistan" && (
                  <div>
                    <Label>Routing Number</Label>
                    <Input
                      value={bankDetails.routingNumber}
                      onChange={(e) => setBankDetails({...bankDetails, routingNumber: e.target.value})}
                      placeholder="Routing number"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Amount */}
          <div className="space-y-2">
            <Label>Payment Amount ({currency})</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={finalPrice}
              step="0.01"
            />
            <p className="text-sm text-gray-500">
              Minimum: {currency} {finalPrice.toLocaleString()}
            </p>
          </div>

          {/* Payment Button */}
          <Button 
            onClick={handlePayment} 
            className="w-full bg-amber-600 hover:bg-amber-700"
            disabled={!customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address}
          >
            Place Order - {currency} {parseFloat(amount).toLocaleString()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
