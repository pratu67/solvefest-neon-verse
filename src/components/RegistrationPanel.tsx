
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import RegistrationForm from './RegistrationForm';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const RegistrationPanel = () => {
  const [formType, setFormType] = useState<'default' | 'create' | 'join'>('default');
  const isMobile = useIsMobile();

  return (
    <section id="register" className="py-20 bg-gradient-to-b from-dark to-dark/90 relative overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNNDcgMUgxTTEgMXY0Nk0xIDQ3aDQ2TTQ3IDQ3VjE1bS0zMiAwdjE2bTE2IDB2MTZNMTUgMTVoMTZtMCAwdjE2IiBzdHJva2U9IiMzOEJERjgiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-orbitron mb-3 md:mb-4">
            <span className="text-glow-green">Register</span> Now
          </h2>
          <p className="text-light/80 max-w-2xl mx-auto text-sm md:text-base">
            Secure your spot in the most anticipated coding event of 2025. Early registration ends February 1st.
          </p>
        </div>

        {formType === 'default' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
            <div className="card-neon-blue p-6 md:p-8 flex flex-col items-center justify-center">
              <h3 className="text-xl md:text-2xl font-orbitron mb-4 md:mb-6 text-glow-blue">Create a Team</h3>
              <p className="text-light/80 text-center mb-5 md:mb-6 text-sm md:text-base">
                Form your own team and lead them to victory. Assemble up to 3 brilliant minds.
              </p>
              <Button 
                onClick={() => setFormType('create')}
                className="btn-neon-blue px-6 md:px-8 py-2 md:py-3 rounded-md font-orbitron text-base md:text-lg"
                variant="outline"
              >
                Create Team
              </Button>
            </div>

            <div className="card-neon-green p-6 md:p-8 flex flex-col items-center justify-center">
              <h3 className="text-xl md:text-2xl font-orbitron mb-4 md:mb-6 text-glow-green">Join Existing Team</h3>
              <p className="text-light/80 text-center mb-5 md:mb-6 text-sm md:text-base">
                Have a team code? Join your teammates and prepare for the challenge.
              </p>
              <Button 
                onClick={() => setFormType('join')}
                className="btn-neon-green px-6 md:px-8 py-2 md:py-3 rounded-md font-orbitron text-base md:text-lg"
                variant="outline"
              >
                Join Team
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6 md:mb-8">
              <Button 
                onClick={() => setFormType('default')}
                className="btn-neon-purple px-4 md:px-6 py-2 rounded-md font-orbitron text-xs md:text-sm flex items-center gap-2"
                variant="outline"
              >
                ← Back to Options
              </Button>
            </div>
            <RegistrationForm formType={formType} />
          </div>
        )}
      </div>
    </section>
  );
};

export default RegistrationPanel;
