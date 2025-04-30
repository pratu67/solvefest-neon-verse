
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

// Event date: March 15, 2025
const EVENT_DATE = new Date('2025-03-15T00:00:00').getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = EVENT_DATE - now;

      if (distance <= 0) {
        clearInterval(timer);
        // Event has arrived
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-dark to-dark/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="text-3xl font-orbitron flex items-center justify-center gap-2">
              <Clock className="text-neon-blue animate-pulse-neon" />
              <span className="text-glow-blue">Time Left to Unlock the Future</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item) => (
            <div key={item.label} className="card-neon-blue flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-orbitron mb-2 text-glow-blue animate-pulse-neon">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-light text-sm md:text-base font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
