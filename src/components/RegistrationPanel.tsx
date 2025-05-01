
import React, { useState, useEffect } from 'react';
import { Mail, Users, Clock, Info, CreditCard } from 'lucide-react';
import RegistrationForm from './RegistrationForm';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getTeamStats } from '@/services/mockDatabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RegistrationPanel = () => {
  const [registrationCount, setRegistrationCount] = useState<{ teams: number; participants: number }>({
    teams: 42,
    participants: 98
  });
  const [deadlineTime, setDeadlineTime] = useState<{ days: number; hours: number; minutes: number }>({
    days: 3,
    hours: 14,
    minutes: 22
  });
  const isMobile = useIsMobile();

  // Update registration count based on mock database
  const updateRegistrationCount = () => {
    const stats = getTeamStats();
    setRegistrationCount({
      teams: stats.totalTeams,
      participants: stats.totalParticipants
    });
  };

  // Update countdown timer every minute
  useEffect(() => {
    updateRegistrationCount(); // Initial count
    
    const timer = setInterval(() => {
      setDeadlineTime(prev => {
        let { days, hours, minutes } = prev;
        
        if (minutes > 0) {
          minutes -= 1;
        } else {
          minutes = 59;
          if (hours > 0) {
            hours -= 1;
          } else {
            hours = 23;
            if (days > 0) {
              days -= 1;
            } else {
              // Deadline reached
              clearInterval(timer);
              return { days: 0, hours: 0, minutes: 0 };
            }
          }
        }
        
        return { days, hours, minutes };
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Handle registration completion
  const handleRegistrationComplete = () => {
    updateRegistrationCount();
  };

  return (
    <section id="register" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="text-primary">Register</span> Now
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Secure your spot in the most anticipated coding event of 2025. Early registration ends February 1st.
          </p>
          
          {/* Live registration counter */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mt-4 md:mt-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                <span className="font-bold text-primary">{registrationCount.teams}</span> Teams
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
                <span className="font-bold text-green-500">{registrationCount.participants}</span> Participants
              </span>
            </div>
          </div>
          
          {/* Deadline timer */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
              Registrations close in: <span className="font-bold text-primary">
                {deadlineTime.days}d {deadlineTime.hours}h {deadlineTime.minutes}m
              </span>
            </span>
          </div>
          
          {/* Payment info */}
          <div className="mt-4 flex justify-center items-center gap-2">
            <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            <span className="text-slate-700 dark:text-slate-300 text-sm md:text-base">
              Registration fee: <span className="font-bold text-primary">₹50</span> per team
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="create">Create Team</TabsTrigger>
              <TabsTrigger value="join">Join Team</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="fade-in">
              <RegistrationForm 
                formType="create" 
                onRegistrationComplete={handleRegistrationComplete}
              />
            </TabsContent>
            <TabsContent value="join" className="fade-in">
              <RegistrationForm 
                formType="join" 
                onRegistrationComplete={handleRegistrationComplete}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPanel;
