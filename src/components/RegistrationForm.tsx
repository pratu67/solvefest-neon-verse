
import React, { useState, useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, Info, Mail, Check, AlertCircle, QrCode, Smartphone } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface RegistrationFormProps {
  formType: 'create' | 'join';
}

// Mock database of existing teams and codes
const mockTeams = {
  'TM12A4B5': { name: 'Byte Busters', members: ['John Doe'], college: 'MIT', maxMembers: 3 },
  'TM78X9Z0': { name: 'Code Wizards', members: ['Jane Smith', 'Alex Chen'], college: 'Stanford', maxMembers: 3 },
  'TM45P6Q7': { name: 'Logic Lords', members: ['Sam Wilson', 'Amy Lee', 'Tom Grant'], college: 'Caltech', maxMembers: 3 }
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formType }) => {
  const { toast } = useToast();
  const [teamCode, setTeamCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationState, setValidationState] = useState({ isValid: false, message: '', team: null });
  const [joinTeamCode, setJoinTeamCode] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const validateTeamCode = (code: string) => {
    // Trim whitespace
    code = code.trim().toUpperCase();
    setJoinTeamCode(code);
    
    if (!code) {
      setValidationState({ isValid: false, message: '', team: null });
      return;
    }
    
    // Check if team exists
    if (mockTeams[code]) {
      const team = mockTeams[code];
      
      // Check if team is full
      if (team.members.length >= team.maxMembers) {
        setValidationState({ 
          isValid: false, 
          message: 'This team is full (maximum 3 members).', 
          team: null 
        });
      } else {
        setValidationState({ 
          isValid: true, 
          message: `Team found: ${team.name} (${team.members.length}/${team.maxMembers} members)`, 
          team: team 
        });
      }
    } else {
      setValidationState({ 
        isValid: false, 
        message: 'Invalid team code. Please check and try again.', 
        team: null 
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Form data collection would happen here in a real application
    const formData = new FormData(e.currentTarget);
    
    setTimeout(() => {
      if (formType === 'create') {
        // Generate a random team code
        const generatedTeamCode = 'TM' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setTeamCode(generatedTeamCode);
        
        // Show success animation
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 1500);
        
        toast({
          title: "Team Created Successfully!",
          description: `Your team code is ${generatedTeamCode}. A confirmation email has been sent.`,
        });
      } else if (formType === 'join' && validationState.isValid) {
        // Show success animation
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 1500);
        
        toast({
          title: "Team Joined Successfully!",
          description: "You have joined the team. A confirmation email has been sent to you and the team leader.",
        });
      } else {
        toast({
          title: "Error",
          description: "Please check your form and try again.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };

  if (formType === 'create') {
    return (
      <div className="card-neon-blue p-5 md:p-8 relative overflow-hidden">
        {showSuccessAnimation && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark/80 z-20 animate-fade-in">
            <div className="text-center">
              <Check className="h-16 w-16 text-neon-green mx-auto mb-4" />
              <p className="font-orbitron text-glow-green text-xl">Team Created!</p>
            </div>
          </div>
        )}
      
        <h3 className="text-xl md:text-2xl font-orbitron mb-5 md:mb-6 text-glow-blue text-center">Create a New Team</h3>
        
        {teamCode ? (
          <div className="text-center py-4 md:py-6 animate-fade-in">
            <div className="mb-6 md:mb-8">
              <h4 className="text-lg md:text-xl font-orbitron mb-3 md:mb-4 text-neon-green">Team Created Successfully!</h4>
              <p className="text-light/80 mb-3 md:mb-4 text-sm md:text-base">Share this code with your teammates:</p>
              <div className="bg-dark/50 border border-neon-green border-opacity-50 rounded-md p-3 md:p-4 mb-3 md:mb-4">
                <p className="font-orbitron text-xl md:text-2xl text-glow-green tracking-wider">{teamCode}</p>
              </div>
              <p className="text-light/80 text-xs md:text-sm">Keep this code safe. Your teammates will need it to join your team.</p>
              
              <Alert className="mt-6 bg-dark/70 border-neon-blue">
                <Mail className="h-5 w-5 text-neon-blue" />
                <AlertTitle className="text-light">Check Your Email</AlertTitle>
                <AlertDescription className="text-light/80">
                  A confirmation email has been sent with your team details and next steps.
                </AlertDescription>
              </Alert>
            </div>
            <Button 
              onClick={() => setTeamCode(null)} 
              variant="outline" 
              className="btn-neon-green"
            >
              Create Another Team
            </Button>
          </div>
        ) : (
          <>
            {/* Payment QR code section */}
            <div className="mb-6 p-4 border border-neon-blue border-opacity-40 rounded-lg bg-dark/30">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="bg-white p-3 rounded-md">
                  <div className="w-24 h-24 md:w-28 md:h-28 relative">
                    <QrCode className="w-full h-full text-dark" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-dark font-bold">QR CODE</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-orbitron text-neon-blue mb-2">Payment Details</h4>
                  <p className="text-light/70 text-sm mb-1">Registration Fee: ₹300 per team</p>
                  <p className="text-light/70 text-sm mb-3">UPI ID: solvefest@okaxis</p>
                  <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-neon-green">
                    <Info className="h-3 w-3" />
                    <span>Only team leader needs to pay</span>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="team-name" className="font-orbitron text-light">Team Name</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-neon-blue cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dark/90 border-neon-blue text-light">
                          <p className="text-xs">Choose a creative name for your team</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <Label htmlFor="email" className="font-orbitron text-light">Email</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-neon-blue cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dark/90 border-neon-blue text-light">
                          <p className="text-xs">Confirmation will be sent to this email</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <Label htmlFor="payment" className="font-orbitron text-light">Upload Payment Screenshot</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-neon-blue cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-dark/90 border-neon-blue text-light">
                          <p className="text-xs">Upload a screenshot of your payment receipt</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
              
              <div className="pt-3 md:pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full btn-neon-blue py-4 md:py-6 font-orbitron text-base md:text-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Processing...' : (
                    <>
                      Create Team
                      <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-center text-xs text-light/60 flex items-center justify-center gap-1">
                <Smartphone className="h-3 w-3" />
                <span>Mobile-friendly form</span>
              </div>
            </form>
          </>
        )}
      </div>
    );
  }
  
  // Join Team form
  return (
    <div className="card-neon-green p-5 md:p-8 relative overflow-hidden">
      {showSuccessAnimation && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark/80 z-20 animate-fade-in">
          <div className="text-center">
            <Check className="h-16 w-16 text-neon-green mx-auto mb-4" />
            <p className="font-orbitron text-glow-green text-xl">Team Joined!</p>
          </div>
        </div>
      )}
    
      <h3 className="text-xl md:text-2xl font-orbitron mb-5 md:mb-6 text-glow-green text-center">Join Existing Team</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
            <div className="flex items-center gap-2">
              <Label htmlFor="email-join" className="font-orbitron text-light">Email</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-neon-green cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-dark/90 border-neon-green text-light">
                    <p className="text-xs">You'll receive team information on this email</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
            <div className="flex items-center gap-2">
              <Label htmlFor="team-code" className="font-orbitron text-light">Team Code</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-neon-green cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-dark/90 border-neon-green text-light">
                    <p className="text-xs">Ask your team leader for this code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="team-code"
              placeholder="Enter team code"
              required
              value={joinTeamCode}
              onChange={(e) => validateTeamCode(e.target.value)}
              className={`bg-dark/50 border text-light focus:border-neon-green ${
                !joinTeamCode ? 'border-neon-green border-opacity-50' : 
                validationState.isValid ? 'border-neon-green border-opacity-80' : 'border-red-500 border-opacity-80'
              }`}
            />
            {joinTeamCode && (
              <div className={`text-xs mt-1 ${validationState.isValid ? 'text-neon-green' : 'text-red-400'}`}>
                {validationState.message}
              </div>
            )}
            
            {/* Team members auto-fill */}
            {validationState.isValid && validationState.team && (
              <div className="mt-3 bg-dark/40 border border-neon-green border-opacity-30 rounded-md p-3">
                <h5 className="text-neon-green text-xs font-orbitron mb-2">Current Team Members:</h5>
                <ul className="text-light/80 text-xs space-y-1">
                  {validationState.team.members.map((member, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-green"></span>
                      {member}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-neon-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-green"></span>
                    <span className="italic">Your spot is reserved</span>
                  </li>
                </ul>
              </div>
            )}
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
        
        <div className="pt-3 md:pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || (joinTeamCode && !validationState.isValid)}
            variant="outline"
            className="w-full btn-neon-green py-4 md:py-6 font-orbitron text-base md:text-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Processing...' : (
              <>
                Join Team
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </>
            )}
          </Button>
        </div>
        
        <div className="text-center text-xs text-light/60 flex items-center justify-center gap-1">
          <Mail className="h-3 w-3" />
          <span>Confirmation will be sent via email</span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
