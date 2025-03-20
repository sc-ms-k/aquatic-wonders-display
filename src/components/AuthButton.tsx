
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
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const AuthButton: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle Google sign in
  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast({
        title: "Logged in successfully",
        description: `Welcome, ${result.user.displayName || result.user.email}!`,
      });
    } catch (error) {
      console.error('Error during sign in:', error);
      toast({
        title: "Login failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle sign out
  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out",
        description: "Come back soon!",
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      toast({
        title: "Logout failed",
        description: "Could not sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border border-white/20">
              <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
              <AvatarFallback className="bg-ocean-deep">
                {user.displayName ? user.displayName.charAt(0) : user.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
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
      <span className="hidden sm:inline">Google Login</span>
      <span className="sm:hidden">Login</span>
    </Button>
  );
};

export default AuthButton;
