
import React from 'react';
import { Trophy, Gift, Brain } from 'lucide-react';

const prizes = [
  {
    title: "Best Problem Solver 🧠",
    description: "Awarded to the team with the highest overall score across all challenges.",
    prize: "$5,000 + Trophy",
    icon: <Trophy className="w-12 h-12 text-neon-blue animate-pulse-neon" />,
    color: "blue"
  },
  {
    title: "Smart Solver ⚡",
    description: "Awarded to the team with the most innovative solution approach.",
    prize: "$3,000 + Tech Gadgets",
    icon: <Brain className="w-12 h-12 text-neon-green animate-pulse-neon" />,
    color: "green"
  },
  {
    title: "Logical Mind 💡",
    description: "Awarded to the team with the most efficient algorithm implementation.",
    prize: "$2,000 + Learning Resources",
    icon: <Gift className="w-12 h-12 text-neon-purple animate-pulse-neon" />,
    color: "purple"
  }
];

const PrizeDisplay = () => {
  return (
    <section id="prizes" className="py-20 bg-gradient-to-b from-dark/90 to-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron mb-4">Win Amazing <span className="text-glow-purple">Prizes</span></h2>
          <p className="text-light/80 max-w-2xl mx-auto">Showcase your problem-solving skills and compete for these prestigious awards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {prizes.map((prize, index) => (
            <div 
              key={index} 
              className={`card-neon-${prize.color} transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex flex-col items-center`}
            >
              <div className="mb-4">{prize.icon}</div>
              <h3 className={`text-2xl font-orbitron mb-4 text-glow-${prize.color}`}>{prize.title}</h3>
              <p className="text-light/80 mb-6 text-center">{prize.description}</p>
              <div className={`mt-auto py-2 px-6 rounded-md bg-neon-${prize.color} bg-opacity-20 text-neon-${prize.color} border border-neon-${prize.color} border-opacity-50 font-medium`}>
                {prize.prize}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrizeDisplay;
