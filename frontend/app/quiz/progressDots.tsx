import type { Question, Answer } from "./quiz";
export function ProgressDots({
  quizData,
  answeredQuestions,
  currentQuestionIndex
}: {
  quizData: Question[],
  answeredQuestions: Answer[],
  currentQuestionIndex: number
}) {
  return quizData.map((_, index) => {
    let dotClass = "h-2 w-2 rounded-full mx-1 ";
    const answer = answeredQuestions[index] ?? false;

    // control flow here is very imporant
    if (index === currentQuestionIndex) {
      if (answer && answer.points > 0) {
        dotClass += "bg-green-500"; // Answered, Correct
      } else if (answer && answer.points === 0) {
        dotClass += "bg-red-500"; // Answered, Wrong
      } else {
        dotClass += "bg-black"; // Current question
      }
    } else if (!answer) {
      dotClass += "bg-gray-300"; // Unanswered fallback
    } else if (answer && answer.points > 0) {
      dotClass += "bg-green-500"; // Answered, Correct
    } else if (answer && answer.points === 0) {
      dotClass += "bg-red-500"; // Answered, Wrong
    } else {
      dotClass += "bg-gray-300"; // catchall fallback
    }
    return <div key={index} className={dotClass}></div>;
  });
}