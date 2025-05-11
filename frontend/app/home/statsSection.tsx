import { StatCard } from './statCard';

function StatsSection() {
  const stats = [
    {
      number: 46787,
      description: "Total Players",
    },
    {
      number: 125,
      description: "Average Score",
    },
    {
      number: 6,
      description: "Weekly Quizzes Launched",
    },
  ];

  return (
    <section className="py-8 md:py-16 px-8 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 md:mb-16">
          Enjoyed all over the world
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-0">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;