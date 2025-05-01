
import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Lock, Shield, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '@/hooks/use-admin-auth';

const Admin = () => {
  const { toast } = useToast();
  const { isAuthenticated, login, logout } = useAdminAuth();
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(password);
      
      if (success) {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-hacker-bg text-hacker-text flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-hacker-terminal border border-neon-red border-opacity-30 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-neon-red/10 mb-4">
              <Shield className="h-8 w-8 text-neon-red" />
            </div>
            <h1 className="text-2xl font-orbitron text-neon-red mb-2">Admin Access</h1>
            <p className="text-hacker-text/70 text-sm font-tech-mono">Enter your password to access the admin dashboard</p>
          </div>
          
          <div className="terminal-window mb-6">
            <div className="terminal-header">
              <span className="font-orbitron text-neon-red">Security Protocol</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="terminal-text space-y-2">
              <div>$ initializing security scan...</div>
              <div>$ verifying credentials required...</div>
              <div>$ waiting for password input...</div>
              <div className="text-neon-red">$ authentication required</div>
            </div>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hacker-text/50 h-4 w-4" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-hacker-dark border-hacker-text/20 text-hacker-text font-tech-mono"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-glitch w-full py-2 font-orbitron"
              >
                {isSubmitting ? 'Authenticating...' : 'Login to Dashboard'}
              </Button>
              
              <div className="flex items-center gap-2 mt-4 p-2 bg-hacker-dark/40 rounded border border-dashed border-neon-red/40">
                <AlertTriangle className="h-4 w-4 text-neon-red" />
                <p className="text-hacker-text/50 text-xs font-tech-mono">
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
    <div className="min-h-screen bg-hacker-bg text-hacker-text">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-orbitron text-glow-red">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="border-red-500 text-red-400 hover:bg-red-500/20 btn-glitch"
            onClick={logout}
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
