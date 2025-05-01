
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
import { 
  createTeam,
  joinTeam, 
  checkTeamCode,
  sendEmail 
} from '@/services/mockDatabase';

interface RegistrationFormProps {
  formType: 'create' | 'join';
  onRegistrationComplete?: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formType, onRegistrationComplete }) => {
  const { toast } = useToast();
  const [teamCode, setTeamCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationState, setValidationState] = useState({ isValid: false, message: '', team: null });
  const [joinTeamCode, setJoinTeamCode] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    email: '',
    phone: '',
    college: '',
    memberCount: '',
    participantName: '',
    participantEmail: '',
    participantPhone: '',
    participantCollege: '',
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateTeamCode = (code: string) => {
    // Trim whitespace
    code = code.trim().toUpperCase();
    setJoinTeamCode(code);
    
    if (!code) {
      setValidationState({ isValid: false, message: '', team: null });
      return;
    }
    
    // Check if team exists using mock database
    const result = checkTeamCode(code);
    setValidationState(result as any); // TypeScript type coercion
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (formType === 'create') {
        // Create team using mock database
        const newTeam = createTeam({
          teamName: formData.teamName,
          leaderName: formData.leaderName,
          leaderEmail: formData.email,
          leaderPhone: formData.phone,
          college: formData.college,
          paymentProof: 'payment-screenshot.jpg' // In a real app, this would be the uploaded file
        });
        
        // Set the generated team code
        setTeamCode(newTeam.teamCode);
        
        // Simulate email sending
        await sendEmail(
          formData.email,
          'Team Registration Successful',
          `Your team ${formData.teamName} has been registered successfully. Your team code is ${newTeam.teamCode}.`
        );
        
        // Show success animation
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 1500);
        
        toast({
          title: "Team Created Successfully!",
          description: `Your team code is ${newTeam.teamCode}. A confirmation email has been sent.`,
        });
        
        // Notify parent component
        if (onRegistrationComplete) onRegistrationComplete();
        
      } else if (formType === 'join' && validationState.isValid) {
        // Join team using mock database
        const result = joinTeam(joinTeamCode, {
          name: formData.participantName,
          email: formData.participantEmail,
          phone: formData.participantPhone,
          college: formData.participantCollege
        });
        
        if (result.success) {
          // Simulate email sending
          await sendEmail(
            formData.participantEmail,
            'Team Join Successful',
            `You have successfully joined the team ${result.team?.teamName}.`
          );
          
          // Also notify team leader
          if (result.team) {
            await sendEmail(
              result.team.leaderEmail,
              'New Team Member Alert',
              `${formData.participantName} has joined your team ${result.team.teamName}.`
            );
          }
          
          // Show success animation
          setShowSuccessAnimation(true);
          setTimeout(() => setShowSuccessAnimation(false), 1500);
          
          toast({
            title: "Team Joined Successfully!",
            description: "You have joined the team. A confirmation email has been sent to you and the team leader.",
          });
          
          // Notify parent component
          if (onRegistrationComplete) onRegistrationComplete();
          
        } else {
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Please check your form and try again.",
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
              className="bg-neon-green hover:bg-neon-green/80 text-dark border-none transition-colors duration-300"
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
                    <Label htmlFor="teamName" className="font-orbitron text-light">Team Name</Label>
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
                    id="teamName"
                    placeholder="Enter your team name"
                    required
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="leaderName" className="font-orbitron text-light">Team Leader Name</Label>
                  <Input
                    id="leaderName"
                    placeholder="Enter your full name"
                    required
                    value={formData.leaderName}
                    onChange={handleInputChange}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-orbitron text-light">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-dark/50 border border-neon-blue border-opacity-50 text-light focus:border-neon-blue"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="college" className="font-orbitron text-light">Select College</Label>
                  <Select onValueChange={(value) => handleSelectChange('college', value)}>
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
                  <Select onValueChange={(value) => handleSelectChange('memberCount', value)}>
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
                  className="w-full bg-neon-blue hover:bg-neon-blue/80 text-dark border-none py-4 md:py-6 font-orbitron text-base md:text-lg flex items-center justify-center gap-2 transition-colors duration-300"
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
            <Label htmlFor="participantName" className="font-orbitron text-light">Participant Name</Label>
            <Input
              id="participantName"
              placeholder="Enter your full name"
              required
              value={formData.participantName}
              onChange={handleInputChange}
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="participantEmail" className="font-orbitron text-light">Email</Label>
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
              id="participantEmail"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.participantEmail}
              onChange={handleInputChange}
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="participantPhone" className="font-orbitron text-light">Phone Number</Label>
            <Input
              id="participantPhone"
              placeholder="Enter your phone number"
              required
              value={formData.participantPhone}
              onChange={handleInputChange}
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
              placeholder="Enter team code (e.g., SF25-ABCD)"
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
                      {member.name}
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
            <Label htmlFor="participantCollege" className="font-orbitron text-light">College Name</Label>
            <Input
              id="participantCollege"
              placeholder="Enter your college name"
              required
              value={formData.participantCollege}
              onChange={handleInputChange}
              className="bg-dark/50 border border-neon-green border-opacity-50 text-light focus:border-neon-green"
            />
          </div>
        </div>
        
        <div className="pt-3 md:pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || (joinTeamCode && !validationState.isValid)}
            className="w-full bg-neon-green hover:bg-neon-green/80 text-dark border-none py-4 md:py-6 font-orbitron text-base md:text-lg flex items-center justify-center gap-2 transition-colors duration-300"
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
