
import React from 'react';
import { Calendar, ArrowRight, Brain, Trophy } from 'lucide-react';

const timelineItems = [
  {
    icon: <Calendar className="text-neon-blue" />,
    title: "Registration Phase",
    date: "January 10 - February 28, 2025",
    description: "Register your team and secure your spot in the competition. Early birds get special perks!",
    color: "blue"
  },
  {
    icon: <Brain className="text-neon-green" />,
    title: "Round 1: Preliminary Challenge",
    date: "March 15, 2025",
    description: "Test your problem-solving skills in the preliminary round. Top teams advance to the finals.",
    color: "green"
  },
  {
    icon: <Brain className="text-neon-purple" />,
    title: "Round 2: Final Challenge",
    date: "March 16, 2025",
    description: "The ultimate test of logic and coding expertise. Compete for the grand prizes!",
    color: "purple"
  },
  {
    icon: <Trophy className="text-neon-blue" />,
    title: "Awards Ceremony",
    date: "March 16, 2025 (Evening)",
    description: "Celebration and recognition of the top performers and prize distribution.",
    color: "blue"
  }
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron mb-4">Event <span className="text-glow-green">Timeline</span></h2>
          <p className="text-light/80 max-w-2xl mx-auto">Follow our carefully planned journey from registration to the final awards ceremony.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {timelineItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Connecting line */}
              {index < timelineItems.length - 1 && (
                <div className={`absolute left-6 md:left-1/2 ml-[7px] md:-ml-[1px] top-16 bottom-0 w-0.5 bg-gradient-to-b from-neon-${item.color} to-neon-${timelineItems[index + 1].color} opacity-50`}></div>
              )}
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10 md:mb-16 relative">
                {/* Timeline dot */}
                <div className={`w-4 h-4 rounded-full bg-neon-${item.color} shadow-neon-${item.color} absolute left-6 md:left-1/2 top-6 transform md:-translate-x-1/2 z-10`}></div>
                
                {/* Date side */}
                <div className="md:w-1/2 md:text-right md:pr-12 mt-10 md:mt-0 ml-16 md:ml-0">
                  {index % 2 === 0 ? (
                    <div className={`card-neon-${item.color} inline-block`}>
                      <div className="flex items-center justify-center gap-2">
                        {item.icon}
                        <h3 className="font-orbitron text-lg">{item.title}</h3>
                      </div>
                      <p className={`text-neon-${item.color} font-medium mt-2`}>{item.date}</p>
                    </div>
                  ) : (
                    <div className="md:hidden">
                      <div className={`card-neon-${item.color} inline-block`}>
                        <div className="flex items-center justify-center gap-2">
                          {item.icon}
                          <h3 className="font-orbitron text-lg">{item.title}</h3>
                        </div>
                        <p className={`text-neon-${item.color} font-medium mt-2`}>{item.date}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Description side */}
                <div className="md:w-1/2 md:pl-12 ml-16 md:ml-0">
                  {index % 2 === 1 ? (
                    <div className={`card-neon-${item.color} md:inline-block`}>
                      <div className="flex items-center justify-center gap-2 md:hidden">
                        {item.icon}
                        <h3 className="font-orbitron text-lg">{item.title}</h3>
                      </div>
                      <p className={`text-neon-${item.color} font-medium mt-2 md:hidden`}>{item.date}</p>
                      <p className="text-light/80 mt-2">{item.description}</p>
                    </div>
                  ) : (
                    <div className={`hidden md:block card-neon-${item.color} md:inline-block`}>
                      <div className="flex items-center justify-center gap-2">
                        {item.icon}
                        <h3 className="font-orbitron text-lg">{item.title}</h3>
                      </div>
                      <p className={`text-neon-${item.color} font-medium mt-2`}>{item.date}</p>
                      <p className="text-light/80">{item.description}</p>
                    </div>
                  )}
                  
                  {index % 2 === 0 && (
                    <div className="md:hidden">
                      <p className="text-light/80">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
