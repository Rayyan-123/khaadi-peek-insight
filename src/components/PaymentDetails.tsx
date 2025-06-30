
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building, Phone, Mail } from "lucide-react";

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
              <p className="font-medium">Bank: HBL Bank</p>
              <p className="text-gray-600">Account: 1234-5678-9012-3456</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">JazzCash: 03XX-XXXXXXX</p>
              <p className="text-gray-600">EasyPaisa: 03XX-XXXXXXX</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">WhatsApp: +92-XXX-XXXXXXX</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-600" />
            <div>
              <p className="font-medium">Email: payments@kk-clothing.com</p>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-600 bg-white p-2 rounded border-l-4 border-amber-400">
          <p className="font-medium mb-1">Note:</p>
          <p>For specific payment arrangements or custom orders, please contact us directly through our chat system. We'll exchange secure payment details privately.</p>
        </div>
      </CardContent>
    </Card>
  );
};
