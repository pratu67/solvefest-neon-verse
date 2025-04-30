
import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight } from 'lucide-react';

interface RegistrationFormProps {
  formType: 'create' | 'join';
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formType }) => {
  const { toast } = useToast();
  const [teamCode, setTeamCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (formType === 'create') {
        // Generate a random team code
        const generatedTeamCode = 'TM' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setTeamCode(generatedTeamCode);
        toast({
          title: "Team Created Successfully!",
          description: `Your team code is ${generatedTeamCode}`,
        });
      } else {
        toast({
          title: "Team Joined Successfully!",
          description: "You have joined the team. The team leader will be notified.",
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };

  if (formType === 'create') {
    return (
      <div className="card-neon-blue p-8">
        <h3 className="text-2xl font-orbitron mb-6 text-glow-blue text-center">Create a New Team</h3>
        
        {teamCode ? (
          <div className="text-center py-6 animate-fade-in">
            <div className="mb-8">
              <h4 className="text-xl font-orbitron mb-4 text-neon-green">Team Created Successfully!</h4>
              <p className="text-light/80 mb-4">Share this code with your teammates:</p>
              <div className="bg-dark/50 border border-neon-green border-opacity-50 rounded-md p-4 mb-4">
                <p className="font-orbitron text-2xl text-glow-green tracking-wider">{teamCode}</p>
              </div>
              <p className="text-light/80 text-sm">Keep this code safe. Your teammates will need it to join your team.</p>
            </div>
            <Button 
              onClick={() => setTeamCode(null)} 
              variant="outline" 
              className="btn-neon-green glitch-effect"
              data-text="Create Another Team"
            >
              Create Another Team
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="team-name" className="font-orbitron text-light">Team Name</Label>
                <Input
                  id="team-name"
                  placeholder="Enter your team name"
                  required
                  className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="leader-name" className="font-orbitron text-light">Team Leader Name</Label>
                <Input
                  id="leader-name"
                  placeholder="Enter your full name"
                  required
                  className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="font-orbitron text-light">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-orbitron text-light">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                  className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="college" className="font-orbitron text-light">Select College</Label>
                <Select>
                  <SelectTrigger className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue">
                    <SelectValue placeholder="Select your college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mit">MIT</SelectItem>
                    <SelectItem value="stanford">Stanford University</SelectItem>
                    <SelectItem value="harvard">Harvard University</SelectItem>
                    <SelectItem value="caltech">Caltech</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="members" className="font-orbitron text-light">Number of Members</Label>
                <Select>
                  <SelectTrigger className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Members</SelectItem>
                    <SelectItem value="3">3 Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="payment" className="font-orbitron text-light">Upload Payment Screenshot</Label>
                <Input
                  id="payment"
                  type="file"
                  accept="image/*"
                  required
                  className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue file:bg-neon-blue file:text-dark file:border-0 file:rounded file:px-2 file:py-1 file:mr-2 file:font-orbitron"
                />
                <p className="text-xs text-light/60">Accepted formats: JPG, PNG, PDF. Max size: 5MB</p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-neon-blue glitch-effect py-6 font-orbitron text-lg flex items-center justify-center gap-2"
                data-text="Create Team"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    Create Team
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    );
  }
  
  // Join Team form
  return (
    <div className="card-neon-green p-8">
      <h3 className="text-2xl font-orbitron mb-6 text-glow-green text-center">Join Existing Team</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="participant-name" className="font-orbitron text-light">Participant Name</Label>
            <Input
              id="participant-name"
              placeholder="Enter your full name"
              required
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email-join" className="font-orbitron text-light">Email</Label>
            <Input
              id="email-join"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone-join" className="font-orbitron text-light">Phone Number</Label>
            <Input
              id="phone-join"
              placeholder="Enter your phone number"
              required
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="team-code" className="font-orbitron text-light">Team Code</Label>
            <Input
              id="team-code"
              placeholder="Enter team code"
              required
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="college-join" className="font-orbitron text-light">College Name</Label>
            <Input
              id="college-join"
              placeholder="Enter your college name"
              required
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-neon-green glitch-effect py-6 font-orbitron text-lg flex items-center justify-center gap-2"
            data-text="Join Team"
          >
            {isSubmitting ? 'Processing...' : (
              <>
                Join Team
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
