
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building, Phone, Mail, Smartphone } from "lucide-react";

export const PaymentDetails = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-amber-50 border-amber-200">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-amber-800">
          <CreditCard className="w-5 h-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="text-center text-amber-700 font-medium">
          KK-Clothing Payment Details
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">HBL Bank</p>
              <p className="text-gray-600">Account: [Your Account Number]</p>
              <p className="text-gray-600">IBAN: PK36SCBL0000001123456702</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">JazzCash: 03XX-XXXXXXX</p>
              <p className="text-gray-600">EasyPaisa: 03XX-XXXXXXX</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">Payoneer Email:</p>
              <p className="text-gray-600">payments@kk-clothing.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">WhatsApp: +92-300-1234567</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">Email: payments@kk-clothing.com</p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-600 bg-white p-3 rounded border-l-4 border-amber-400">
          <p className="font-medium mb-2">Payment Instructions:</p>
          <ul className="space-y-1">
            <li>• Send payment to any of the above methods</li>
            <li>• Share payment screenshot via WhatsApp/Chat</li>
            <li>• Include your order details in the message</li>
            <li>• We'll confirm and process your order</li>
          </ul>
        </div>
        
        <div className="text-xs text-gray-600 bg-amber-100 p-2 rounded">
          <p className="font-medium mb-1">Note:</p>
          <p>For custom payment arrangements or if you prefer to exchange bank details privately, please contact us through our chat system.</p>
        </div>
      </CardContent>
    </Card>
  );
};
