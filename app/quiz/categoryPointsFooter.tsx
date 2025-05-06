import type { Question } from './quiz';

export function CategoryPointsFooter({
  currentQuestion
}:{
  currentQuestion: Question
}) {
  return (
    <div className="flex items-center">
      <svg className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
        <line x1="12" y1="11" x2="12" y2="16" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span>{capitalizeFirstLetter(currentQuestion.category)}:&nbsp;
        <span className="font-bold">{currentQuestion.points} pts</span>
      </span>
    </div>
  );
}

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}