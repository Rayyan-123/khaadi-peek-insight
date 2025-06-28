
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface ShoppingCartProps {
  currency: string;
  onCheckout: (items: CartItem[]) => void;
}

export const ShoppingCart = ({ currency, onCheckout }: ShoppingCartProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Floral Lawn Kurta",
      price: 5000,
      quantity: 1,
      image: "/placeholder.svg",
      size: "M"
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Shopping Cart
          <Badge variant="secondary">{cartItems.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="font-bold text-amber-600">{currency} {item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-amber-600">
                  {currency} {totalAmount.toLocaleString()}
                </span>
              </div>
              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700"
                onClick={() => onCheckout(cartItems)}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
