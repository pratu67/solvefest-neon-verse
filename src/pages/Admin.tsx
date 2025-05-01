
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Admin Access</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your password to access the admin dashboard</p>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-md mb-6">
            <div className="text-slate-700 dark:text-slate-300 space-y-2 text-sm">
              <div>Initializing security scan...</div>
              <div>Verifying credentials required...</div>
              <div>Waiting for password input...</div>
              <div className="text-primary">Authentication required</div>
            </div>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Authenticating...' : 'Login to Dashboard'}
              </Button>
              
              <div className="flex items-center gap-2 mt-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-dashed border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <p className="text-amber-700 dark:text-amber-400 text-xs">
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
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
