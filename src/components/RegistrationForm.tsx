
import React, { useState, useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronRight, Info, Mail, Check, AlertCircle, QrCode, Smartphone, CreditCard, Copy } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  createTeam,
  joinTeam, 
  checkTeamCode,
  sendEmail 
} from '@/services/mockDatabase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
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

  // Create confetti effect
  const createConfetti = () => {
    setShowConfetti(true);
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    
    const colors = ['#FF1E1E', '#ffffff', '#444444'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '0';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 8 + 2}px`;
      confetti.style.height = `${Math.random() * 6 + 2}px`;
      confetti.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confettiContainer.appendChild(confetti);
    }
    
    // Clean up confetti after animation completes
    setTimeout(() => {
      setShowConfetti(false);
      if (confettiContainer) {
        confettiContainer.innerHTML = '';
      }
    }, 5000);
  };

  // Razorpay integration
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    
    const res = await initializeRazorpay();
    
    if (!res) {
      toast({
        title: "Payment Failed",
        description: "Razorpay SDK failed to load. Check your internet connection.",
        variant: "destructive",
      });
      setIsProcessingPayment(false);
      return;
    }

    // Create order - would be server-side in production
    const paymentData = {
      amount: 5000, // in paise (₹50)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        teamName: formData.teamName,
        email: formData.email
      }
    };

    // Simulating order creation response
    const orderResponse = {
      id: `order_${Date.now()}`,
      amount: paymentData.amount,
      currency: paymentData.currency
    };
    
    // Configure Razorpay options
    const options = {
      key: "rzp_test_your_key_here", // Replace with your actual test key in production
      amount: orderResponse.amount,
      currency: orderResponse.currency,
      name: "SolveFest 2025",
      description: "Team Registration Fee",
      order_id: orderResponse.id,
      handler: function (response: any) {
        // Handle successful payment
        const { razorpay_payment_id } = response;
        setPaymentId(razorpay_payment_id);
        handleRegistrationAfterPayment(razorpay_payment_id);
      },
      prefill: {
        name: formData.leaderName,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: "#FF1E1E"
      },
      modal: {
        ondismiss: function() {
          setIsProcessingPayment(false);
        }
      }
    };

    // For demo purposes, we'll simulate a successful payment
    setTimeout(() => {
      const mockPaymentId = `pay_${Date.now()}`;
      setPaymentId(mockPaymentId);
      handleRegistrationAfterPayment(mockPaymentId);
    }, 2000);
    
    // In actual implementation, you would open Razorpay checkout:
    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  };

  const handleRegistrationAfterPayment = (paymentId: string) => {
    // Create team using mock database with payment ID
    const newTeam = createTeam({
      teamName: formData.teamName,
      leaderName: formData.leaderName,
      leaderEmail: formData.email,
      leaderPhone: formData.phone,
      college: formData.college,
      paymentId: paymentId
    });
    
    // Set the generated team code
    setTeamCode(newTeam.teamCode);
    
    // Simulate email sending
    sendEmail(
      formData.email,
      'Team Registration Successful',
      `Your team ${formData.teamName} has been registered successfully. Your team code is ${newTeam.teamCode}.`
    );
    
    // Show success animation with confetti
    setShowSuccessAnimation(true);
    createConfetti();
    
    toast({
      title: "Registration Successful!",
      description: `Your team code is ${newTeam.teamCode}. A confirmation email has been sent.`,
    });
    
    // Notify parent component
    if (onRegistrationComplete) onRegistrationComplete();
    
    setIsProcessingPayment(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (formType === 'create') {
        // For create team, initiate payment first
        handlePayment();
      } else if (formType === 'join' && validationState.isValid) {
        // Join team flow - no payment needed
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
          createConfetti();
          
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
      if (formType !== 'create') {
        setIsSubmitting(false);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Team code copied to clipboard",
    });
  };

  // Component for Create Team Form
  if (formType === 'create') {
    return (
      <div className="card-hacker relative overflow-hidden">
        {/* Confetti container */}
        <div id="confetti-container" className="absolute inset-0 pointer-events-none z-50"></div>
        
        {showSuccessAnimation && (
          <div className="absolute inset-0 flex items-center justify-center bg-hacker-bg/90 z-20 animate-fade-in">
            <div className="text-center p-8 max-w-md">
              <div className="terminal-window mb-6">
                <div className="terminal-header">
                  <span className="font-orbitron text-neon-red">Registration Complete</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="terminal-text space-y-2">
                  <div>$ Registration complete</div>
                  <div>$ Processing payment...OK</div>
                  <div>$ Generating team code...OK</div>
                  <div>$ Sending email notification...OK</div>
                  <div className="text-neon-red font-bold">$ ACCESS GRANTED</div>
                </div>
              </div>
              
              <h3 className="text-2xl font-orbitron mb-4 text-glow-red">Welcome to SolveFest</h3>
              <p className="text-hacker-text mb-6">Your team has been successfully registered!</p>
              
              <div className="bg-hacker-dark border border-neon-red border-opacity-50 rounded-md p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-hacker-text/80">Your unique team code:</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(teamCode || '')} 
                    className="h-7 px-2 text-neon-red hover:text-neon-red hover:bg-hacker-bg"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
                <p className="font-orbitron text-xl text-glow-red tracking-wider text-center">{teamCode}</p>
              </div>
              
              <p className="text-xs text-hacker-text/70 mb-6">
                Share this code with your teammates so they can join your team.
                You'll also receive all details via email.
              </p>
              
              <Button 
                onClick={() => {
                  setTeamCode(null);
                  setShowSuccessAnimation(false);
                  setPaymentId(null);
                  setFormData({
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
                }} 
                className="btn-glitch w-full py-3 font-orbitron text-lg"
              >
                Register Another Team
              </Button>
            </div>
          </div>
        )}
      
        <h3 className="text-xl md:text-2xl font-orbitron mb-5 md:mb-6 text-glow-red text-center">Create a New Team</h3>
        
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="teamName" className="font-orbitron text-hacker-text">Team Name</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-neon-red cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-hacker-dark border-neon-red text-hacker-text">
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
                className="input-hacker"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leaderName" className="font-orbitron text-hacker-text">Team Leader Name</Label>
              <Input
                id="leaderName"
                placeholder="Enter your full name"
                required
                value={formData.leaderName}
                onChange={handleInputChange}
                className="input-hacker"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email" className="font-orbitron text-hacker-text">Email</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-neon-red cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-hacker-dark border-neon-red text-hacker-text">
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
                className="input-hacker"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-orbitron text-hacker-text">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="input-hacker"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college" className="font-orbitron text-hacker-text">Select College</Label>
              <Select onValueChange={(value) => handleSelectChange('college', value)}>
                <SelectTrigger className="input-hacker">
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent className="bg-hacker-dark border-neon-red">
                  <SelectItem value="mit">MIT</SelectItem>
                  <SelectItem value="stanford">Stanford University</SelectItem>
                  <SelectItem value="harvard">Harvard University</SelectItem>
                  <SelectItem value="caltech">Caltech</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="members" className="font-orbitron text-hacker-text">Number of Members</Label>
              <Select onValueChange={(value) => handleSelectChange('memberCount', value)}>
                <SelectTrigger className="input-hacker">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent className="bg-hacker-dark border-neon-red">
                  <SelectItem value="2">2 Members</SelectItem>
                  <SelectItem value="3">3 Members</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-hacker-terminal p-4 rounded-md border border-neon-red border-opacity-20">
            <div className="flex items-center mb-3">
              <CreditCard className="h-5 w-5 mr-2 text-neon-red" />
              <h4 className="font-orbitron text-neon-red">Payment Details</h4>
            </div>
            <p className="text-sm text-hacker-text/80 mb-4">
              Registration fee: <span className="text-neon-red font-bold">₹50</span> per team (non-refundable)
            </p>
            <div className="text-xs text-hacker-text/60">
              Payments processed securely via Razorpay. You will be redirected to the payment gateway after clicking "Register Team".
            </div>
          </div>
          
          <div className="pt-3 md:pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting || isProcessingPayment}
              className="btn-glitch w-full py-4 font-orbitron text-base md:text-lg flex items-center justify-center gap-2"
            >
              {isSubmitting || isProcessingPayment ? (
                <>Processing...</>
              ) : (
                <>
                  Register Team
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center text-xs text-hacker-text/60 flex items-center justify-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>By registering, you agree to the Terms & Conditions</span>
          </div>
        </form>
      </div>
    );
  }
  
  // Join Team form
  return (
    <div className="card-hacker relative overflow-hidden">
      {/* Confetti container */}
      <div id="confetti-container" className="absolute inset-0 pointer-events-none z-50"></div>
    
      {showSuccessAnimation && (
        <div className="absolute inset-0 flex items-center justify-center bg-hacker-bg/90 z-20 animate-fade-in">
          <div className="text-center p-8 max-w-md">
            <div className="terminal-window mb-6">
              <div className="terminal-header">
                <span className="font-orbitron text-neon-red">Team Access</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="terminal-text space-y-2">
                <div>$ Validating team code...OK</div>
                <div>$ Checking team capacity...OK</div>
                <div>$ Adding member to team...OK</div>
                <div>$ Sending notifications...OK</div>
                <div className="text-neon-red font-bold">$ TEAM JOIN SUCCESSFUL</div>
              </div>
            </div>
            
            <h3 className="text-2xl font-orbitron mb-4 text-glow-red">Welcome to the Team!</h3>
            <p className="text-hacker-text mb-4">You've successfully joined the team</p>
            
            <div className="mb-6">
              <p className="text-xs text-hacker-text/70">
                A confirmation has been sent to your email with all details.
                The team leader has also been notified.
              </p>
            </div>
            
            <Button 
              onClick={() => {
                setShowSuccessAnimation(false);
                setJoinTeamCode('');
                setValidationState({ isValid: false, message: '', team: null });
                setFormData({
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
              }} 
              className="btn-glitch w-full py-3 font-orbitron"
            >
              Join Another Team
            </Button>
          </div>
        </div>
      )}
    
      <h3 className="text-xl md:text-2xl font-orbitron mb-5 md:mb-6 text-glow-red text-center">Join Existing Team</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="participantName" className="font-orbitron text-hacker-text">Participant Name</Label>
            <Input
              id="participantName"
              placeholder="Enter your full name"
              required
              value={formData.participantName}
              onChange={handleInputChange}
              className="input-hacker"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="participantEmail" className="font-orbitron text-hacker-text">Email</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-neon-red cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-hacker-dark border-neon-red text-hacker-text">
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
              className="input-hacker"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="participantPhone" className="font-orbitron text-hacker-text">Phone Number</Label>
            <Input
              id="participantPhone"
              placeholder="Enter your phone number"
              required
              value={formData.participantPhone}
              onChange={handleInputChange}
              className="input-hacker"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="team-code" className="font-orbitron text-hacker-text">Team Code</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-neon-red cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-hacker-dark border-neon-red text-hacker-text">
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
              className={`input-hacker ${
                !joinTeamCode ? '' : 
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
              <div className="mt-3 bg-hacker-dark p-3 rounded-md border border-neon-green border-opacity-30">
                <h5 className="text-neon-green text-xs font-orbitron mb-2">Current Team Members:</h5>
                <ul className="text-hacker-text/80 text-xs space-y-1">
                  {validationState.team?.members?.map((member: any, index: number) => (
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
            <Label htmlFor="participantCollege" className="font-orbitron text-hacker-text">College Name</Label>
            <Input
              id="participantCollege"
              placeholder="Enter your college name"
              required
              value={formData.participantCollege}
              onChange={handleInputChange}
              className="input-hacker"
            />
          </div>
        </div>
        
        <div className="pt-3 md:pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || (joinTeamCode && !validationState.isValid)}
            className="btn-glitch w-full py-4 font-orbitron text-base md:text-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Processing...' : (
              <>
                Join Team
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </>
            )}
          </Button>
        </div>
        
        <div className="text-center text-xs text-hacker-text/60 flex items-center justify-center gap-1">
          <Mail className="h-3 w-3" />
          <span>Confirmation will be sent via email</span>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
