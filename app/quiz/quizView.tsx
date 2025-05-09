import { useState } from 'react';
import type { Question, Answer } from './quiz';

import { Option } from './option';
import { ProgressDots } from './progressDots';
import { CategoryPointsFooter } from './categoryPointsFooter';
// import { QuizScoreGraph } from './quizScoreGraph';

export function QuizView({
  quizData
}: {
  quizData: Question[]
}) {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  // const [showGraph, setShowGraph] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Answer[]>([]);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null) return; // Prevent multiple/double selections (rapid clicking)

    setSelectedOption(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);

    let pointsToAdd = 0;

    if (correct) {
      pointsToAdd = currentQuestion.points;
      setScore(prevScore => prevScore + pointsToAdd);
      // if (currentQuestion.category === "rumors") {
      //   setMultiplier(prev => Math.min(prev + 2, 5)); // Increase multiplier up to 5x
      // }
    } else {
      setMultiplier(1); // Reset multiplier on wrong answer
    }

    // Add to answered questions
    setAnsweredQuestions(prev => [...prev, {
      id: currentQuestion.id,
      selected: selectedOption,
      points: pointsToAdd,
      multiplier: 1
    }]);

    // Transition to next question after 1500 flash answer
    setTimeout(() => {
      setTransitioning(true);
      // then 500 blank screen
      setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } 
        // else {
        //   setShowGraph(true); // Show graph if it's the last question
        // }
        setSelectedOption(null);
        setIsCorrect(null);
        setTransitioning(false);
      }, 500);
    }, 1500);
  };

  return (
    <div className={`w-full max-w-2xl transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>

      {/* --- Top line with progress dots, title, and score --- */}
      <div className="flex justify-between items-center w-full mb-6">
        <div className="flex">
          <ProgressDots
            quizData={quizData}
            answeredQuestions={answeredQuestions}
            currentQuestionIndex={currentQuestionIndex}
          />
        </div>
        <div className="font-bold text-xl">The House View Quiz</div>
        <div className="text-right">
          Your score | <span className="font-bold">{score}</span>
        </div>
      </div>
      {/* ------ */}

      {/* Question and Options*/}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <p className="text-lg mb-4">
          {currentQuestion.question}
        </p>

        {/* TODO: Multiplier badge (if active) */}
        {/* {multiplier > 1 && (
          <div className="bg-yellow-300 inline-block px-2 py-1 rounded text-sm font-bold mb-4">
            {multiplier}X Multiplier applied
          </div>
        )} */}

        {/* Options grid - tight on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Object.entries(currentQuestion.options as Record<string, string>).map(([key, value]) => (
            <div key={key} className="w-full">
              <Option
                key={key}
                optionKey={key}
                text={value}
                selectedOption={selectedOption}
                isCorrect={isCorrect}
                currentQuestion={currentQuestion}
                handleOptionSelect={handleOptionSelect}
              />
            </div>
          ))}
        </div>
      </div>
      {/* ------ */}

      {/* Footer with point value and multiplier indicators */}
      <div className="flex justify-between items-center">
        <CategoryPointsFooter currentQuestion={currentQuestion} />
        <div className="flex">
          {/* TODO: Indicator for streak multiplier
          {currentQuestion.category === "rumors" && (
            <div className={`h-8 w-8 flex items-center justify-center rounded-md ml-2 ${multiplier > 1 ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'
              }`}>
              {multiplier > 1 ? (
                <span className="font-bold">{multiplier}x</span>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 12L12 22L22 12L12 2Z" />
                </svg>
              )}
            </div>
          )} */}
        </div>
      </div>
      {/* ------ */}
      {/* {showGraph ?
        <QuizScoreGraph
          answers={answeredQuestions}
          finalScore={40}
        />
        : null
      } */}
    </div>
  );
}