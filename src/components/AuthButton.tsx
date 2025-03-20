
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { User, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  name: string;
  email: string;
  picture: string;
}

const AuthButton: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Check for existing user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
  }, []);

  // Simulating Google login flow
  const login = () => {
    setLoading(true);
    
    // This is just a simulation. In a real app, you would use the actual Google OAuth flow.
    setTimeout(() => {
      const fakeUsers = [
        {
          name: "Marine Researcher",
          email: "researcher@marine.org",
          picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
          name: "Ocean Explorer",
          email: "explorer@ocean.org",
          picture: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
        {
          name: "Marine Biologist",
          email: "biologist@sea.org",
          picture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        }
      ];
      
      const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
      setUser(randomUser);
      localStorage.setItem('user', JSON.stringify(randomUser));
      
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${randomUser.name}!`,
      });
      
      setLoading(false);
    }, 1000);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "Come back soon!",
    });
  };
  
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border border-white/20">
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback className="bg-ocean-deep">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  return (
    <Button 
      onClick={login} 
      className="flex items-center gap-2 bg-white text-blue-600 hover:bg-white/90"
      disabled={loading}
    >
      {loading ? (
        <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      ) : (
        <User className="h-4 w-4" />
      )}
      <span>Google Login</span>
    </Button>
  );
};

export default AuthButton;
