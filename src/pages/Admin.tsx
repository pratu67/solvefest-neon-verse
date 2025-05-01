
import React, { useState } from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Shield } from 'lucide-react';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would validate against a secure backend
    setTimeout(() => {
      if (password === 'admin123') { // Demo password
        setIsAuthenticated(true);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }, 1000);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark text-light flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-dark/80 border border-neon-purple border-opacity-30 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-neon-purple/20 mb-4">
              <Shield className="h-8 w-8 text-neon-purple" />
            </div>
            <h1 className="text-2xl font-orbitron text-neon-purple mb-2">Admin Access</h1>
            <p className="text-light/70 text-sm">Enter your password to access the admin dashboard</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light/50 h-4 w-4" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-dark/30 border-light/20 text-light"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white py-2"
              >
                {isSubmitting ? 'Authenticating...' : 'Login to Dashboard'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-light/50 text-xs">
                  Hint: For this demo, use password "admin123"
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark text-light">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-orbitron text-glow-blue">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="border-red-500 text-red-400 hover:bg-red-500/20"
            onClick={() => setIsAuthenticated(false)}
          >
            Log Out
          </Button>
        </div>
        
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
