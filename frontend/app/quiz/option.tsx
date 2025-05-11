import type { Question } from './quiz';

export function Option({
    optionKey, 
    text,
    selectedOption,
    isCorrect,
    currentQuestion,
    handleOptionSelect
}: {
    optionKey: string,
    text: string,
    selectedOption: string | null,
    isCorrect: boolean | null,
    currentQuestion: Question,
    handleOptionSelect: Function
}) {
    let buttonClass = "border rounded-md p-4 text-left mb-2 w-full ";

    if (selectedOption === optionKey) { // if this option is clicked
      buttonClass += isCorrect
        ? "bg-green-500 text-white border-green-600" // if correct, animate
        : "bg-red-500 text-white border-red-600"; // if wrong, animate
    } else if (selectedOption !== null && optionKey === currentQuestion.answer) { // option that is NOT clicked but is correct
      buttonClass += "bg-green-500 text-white border-green-600"; // Show correct answer
    } else {
      buttonClass += "hover:bg-gray-100 border-gray-300 cursor-pointer";
    }

    return (
      <button
        className={buttonClass}
        onClick={() => handleOptionSelect(optionKey)}
        disabled={selectedOption !== null}
      >
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold">{optionKey.toUpperCase()}. </span>
            {text}
          </div>
          {
            // show a tick on the answer
            selectedOption !== null && optionKey === currentQuestion.answer && (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )
          }
        </div>
      </button>
    );
}