
import React from 'react';
import { Mail } from 'lucide-react';

const RegistrationPanel = () => {
  return (
    <section id="register" className="py-20 bg-gradient-to-b from-dark to-dark/90 relative overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNNDcgMUgxTTEgMXY0Nk0xIDQ3aDQ2TTQ3IDQ3VjE1bS0zMiAwdjE2bTE2IDB2MTZNMTUgMTVoMTZtMCAwdjE2IiBzdHJva2U9IiMzOEJERjgiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron mb-4">
            <span className="text-glow-green">Register</span> Now
          </h2>
          <p className="text-light/80 max-w-2xl mx-auto">
            Secure your spot in the most anticipated coding event of 2025. Early registration ends February 1st.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="card-neon-blue p-8">
            <h3 className="text-2xl font-orbitron mb-6 text-glow-blue">Registration Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-orbitron text-lg mb-2">Entry Fee</h4>
                <p className="text-light/80">
                  <span className="text-neon-blue font-medium">$50</span> per team (up to 3 members)
                </p>
                <p className="text-light/80 mt-1">
                  <span className="text-neon-green font-medium">Early bird:</span> $35 (before February 1st)
                </p>
              </div>
              
              <div>
                <h4 className="font-orbitron text-lg mb-2">Registration Includes</h4>
                <ul className="text-light/80 space-y-2">
                  {[
                    "Access to both competition rounds",
                    "Event t-shirts for all team members",
                    "Meals during the event",
                    "Networking opportunities with industry experts",
                    "Certificate of participation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-neon-blue mr-2">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-orbitron text-lg mb-2">Payment Methods</h4>
                <p className="text-light/80">Credit/debit cards, PayPal, and bank transfers accepted.</p>
              </div>
            </div>
          </div>

          <div className="card-neon-green p-8">
            <h3 className="text-2xl font-orbitron mb-6 text-glow-green">Sign Up Form</h3>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="team-name" className="block font-orbitron mb-1 text-light">Team Name</label>
                  <input 
                    type="text" 
                    id="team-name"
                    className="w-full bg-dark/50 border border-neon-green border-opacity-50 rounded-md px-4 py-2 text-light focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-opacity-50 focus:border-transparent"
                    placeholder="Enter your team name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-orbitron mb-1 text-light">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-dark/50 border border-neon-green border-opacity-50 rounded-md px-4 py-2 text-light focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-opacity-50 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="participants" className="block font-orbitron mb-1 text-light">Number of Participants</label>
                  <select 
                    id="participants"
                    className="w-full bg-dark/50 border border-neon-green border-opacity-50 rounded-md px-4 py-2 text-light focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-opacity-50 focus:border-transparent"
                  >
                    <option value="1">1 (Individual)</option>
                    <option value="2">2 Team Members</option>
                    <option value="3">3 Team Members</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-5 h-5 bg-dark/50 border border-neon-green border-opacity-50 rounded checked:bg-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-opacity-50"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-light/80">
                    I agree to the <a href="#" className="text-neon-green hover:underline">terms and conditions</a>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit"
                className="btn-neon-green w-full py-3 rounded-md font-orbitron text-lg flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Complete Registration
              </button>
              
              <p className="text-xs text-center text-light/70 mt-4">
                You will receive a confirmation email with payment instructions.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPanel;
