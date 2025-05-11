import { FeatureCard } from './featureCard';
import { 
  BiAbacus, 
  BiCategoryAlt,
  BiTimer,
  BiLineChart,
  BiDownvote
} from 'react-icons/bi';
import { MdOutlineKeyboardOptionKey } from "react-icons/md";

function FeaturesSection() {
  const features = [
    {
      icon: <BiAbacus size={40} className="text-gray-800" />,
      title: "Allocate points before starting",
      description: "Allocate your points to each category before starting the quiz — play to your strengths. 10 questions total."
    },
    {
      icon: <BiCategoryAlt size={40} className="text-gray-800" />,
      title: "Hedging and Leverage",
      description: "During the quiz, you can use hedging or leverage multipliers to manage risk."
    },
    {
      icon: <BiTimer size={40} className="text-gray-800" />,
      title: "Face time pressure",
      description: "You only have 30 seconds to answer each question, so think fast! No time to Google."
    },
    {
      icon: <MdOutlineKeyboardOptionKey size={40} className="text-gray-800" />,
      title: "Options",
      description: "Pay for an option to skip a question. It's expensive though."
    },
    {
      icon: <BiDownvote size={40} className="text-gray-800" />,
      title: "Shorting Mechanic",
      description: "Bet on the most-commonly chosen wrong answer. Think like a contrarian."
    },
    {
      icon: <BiLineChart size={40} className="text-gray-800" />,
      title: "Scoring",
      description: "Your score is shown as a portfolio graph, and you can see how you compare to others on the bell curve."
    }
  ];

  return (
    <section className="py-8 md:py-16 px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 md:mb-16">
          How to Play
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;