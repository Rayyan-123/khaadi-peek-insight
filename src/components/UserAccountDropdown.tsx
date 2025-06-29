
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";

interface UserAccountDropdownProps {
  user: any;
  onLogout: () => void;
  onSwitchAccount: () => void;
}

export const UserAccountDropdown = ({ user, onLogout, onSwitchAccount }: UserAccountDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-xs">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:inline text-sm font-medium">{user.name}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  {user.provider && (
                    <p className="text-xs text-blue-600 capitalize">
                      via {user.provider}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  // Handle profile settings
                }}
                className="w-full justify-start gap-2"
              >
                <Settings className="w-4 h-4" />
                Account Settings
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  onSwitchAccount();
                }}
                className="w-full justify-start gap-2"
              >
                <User className="w-4 h-4" />
                Switch Account
              </Button>
              
              <hr className="my-2" />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
