
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-hacker-bg text-hacker-text">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex p-3 rounded-full bg-neon-red/10 mb-4">
              <FileText className="h-8 w-8 text-neon-red" />
            </div>
            <h1 className="text-3xl font-orbitron text-glow-red mb-4">Terms of Service</h1>
            <p className="text-hacker-text/70">Last updated: April 30, 2025</p>
          </div>
          
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="font-orbitron text-neon-red">LEGAL_DOCUMENT.txt</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="space-y-6 text-sm">
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">1. Acceptance of Terms</h2>
                <p className="text-hacker-text/80 mb-2">
                  By accessing and participating in SolveFest 2025, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service. If you do not agree with 
                  any part of these terms, you may not participate in the event.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">2. Registration and Eligibility</h2>
                <p className="text-hacker-text/80 mb-2">
                  2.1. Participants must be at least 18 years of age or have parental consent.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  2.2. Registration is complete only after payment of the registration fee.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  2.3. A team may consist of 1-3 members, with one designated team leader.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  2.4. The organizing committee reserves the right to reject any registration without providing a reason.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">3. Payment and Refunds</h2>
                <p className="text-hacker-text/80 mb-2">
                  3.1. The registration fee is ₹50 per team, non-refundable except in case of event cancellation.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  3.2. All payments are processed through Razorpay and subject to their terms of service.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  3.3. In case of technical payment issues, contact support within 24 hours.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">4. Intellectual Property</h2>
                <p className="text-hacker-text/80 mb-2">
                  4.1. Participants retain ownership of their submitted solutions.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  4.2. By participating, you grant SolveFest a non-exclusive license to showcase your 
                  solution for promotional purposes.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  4.3. Participants must not infringe on third-party intellectual property rights.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">5. Code of Conduct</h2>
                <p className="text-hacker-text/80 mb-2">
                  5.1. Participants must conduct themselves professionally and respectfully.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  5.2. Harassment, discrimination, or disruptive behavior will not be tolerated.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  5.3. The organizing committee reserves the right to disqualify any participant violating the code of conduct.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">6. Liability</h2>
                <p className="text-hacker-text/80 mb-2">
                  6.1. SolveFest is not liable for any direct, indirect, incidental, consequential, or punitive damages 
                  arising from participation in the event.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  6.2. Participants are responsible for their own equipment and personal belongings.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">7. Privacy</h2>
                <p className="text-hacker-text/80 mb-2">
                  7.1. Personal information collected during registration will be handled according to our Privacy Policy.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  7.2. By registering, you consent to the collection and processing of your personal data for event-related purposes.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">8. Modifications</h2>
                <p className="text-hacker-text/80 mb-2">
                  8.1. SolveFest reserves the right to modify these terms at any time. Changes will be effective immediately upon posting.
                </p>
                <p className="text-hacker-text/80 mb-2">
                  8.2. Participants will be notified of significant changes via email.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-orbitron text-neon-red mb-2">9. Contact</h2>
                <p className="text-hacker-text/80 mb-2">
                  For questions regarding these terms, please contact us at 
                  <a href="mailto:legal@solvefest.com" className="text-neon-red hover:text-neon-red/80 ml-1">legal@solvefest.com</a>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-hacker-text/70 text-sm">
              By using our website and participating in SolveFest, you acknowledge that you have read and 
              understood these Terms of Service and agree to be bound by them.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
