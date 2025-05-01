
import React from 'react';
import { Trophy, Gift, Brain } from 'lucide-react';

const prizes = [
  {
    title: "Best Problem Solver 🧠",
    description: "Awarded to the team with the highest overall score across all challenges.",
    prize: "$5,000 + Trophy",
    icon: <Trophy className="w-12 h-12 text-blue-500" />,
    color: "blue"
  },
  {
    title: "Smart Solver ⚡",
    description: "Awarded to the team with the most innovative solution approach.",
    prize: "$3,000 + Tech Gadgets",
    icon: <Brain className="w-12 h-12 text-green-500" />,
    color: "green"
  },
  {
    title: "Logical Mind 💡",
    description: "Awarded to the team with the most efficient algorithm implementation.",
    prize: "$2,000 + Learning Resources",
    icon: <Gift className="w-12 h-12 text-purple-500" />,
    color: "purple"
  }
];

const PrizeDisplay = () => {
  return (
    <section id="prizes" className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Win Amazing <span className="text-purple-600 dark:text-purple-400">Prizes</span></h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Showcase your problem-solving skills and compete for these prestigious awards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {prizes.map((prize, index) => (
            <div 
              key={index} 
              className={`bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-2 hover:shadow-xl transform border border-slate-200 dark:border-slate-700 flex flex-col items-center`}
            >
              <div className="mb-4">{prize.icon}</div>
              <h3 className={`text-2xl font-bold mb-4 text-${prize.color}-600 dark:text-${prize.color}-400`}>{prize.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">{prize.description}</p>
              <div className={`mt-auto py-2 px-6 rounded-md bg-${prize.color}-100 dark:bg-${prize.color}-900/30 text-${prize.color}-700 dark:text-${prize.color}-300 font-medium`}>
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
