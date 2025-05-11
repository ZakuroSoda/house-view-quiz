import { QuizView } from "./quizView";
import { useState } from "react";

export function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <main className="flex justify-center pt-16 pb-16 bg-gray-100 h-screen">
      <div className="flex flex-col items-center pb-8">

        {!quizStarted ?
          <>
            <p className="text-5xl text-gray-950">
              The House View Quiz
            </p>
            <p className="text-4xl text-gray-950 tracking-tight pb-8">
              Weekend of May 3, 2025
            </p>
            <p className="text text-gray-950">
              Think you got better knowledge than finance bros? Prove it.
            </p>
            <button
              className="bg-gray-800 hover:bg-gray-900 cursor-pointer text-white font-bold mt-16 py-2 px-15 rounded"
              onClick={() => setQuizStarted(prev => !prev)}
            >
              Start
            </button>
          </> :
          <QuizView quizData={quiz}/>
        }
      </div>
    </main>
  );
}

const quiz = [
  {
    id: 1,
    category: "rumours",
    question: "'This is a hostile and political act by Amazon.' That was a quote from the White House press secretary in response to a rumor that the company planned to do what?",
    options: {
      a: "Offer discounted shipping to Mexico and Canada",
      b: "Remove MAGA gear from Amazon marketplace",
      c: "Move the company's headquarters to Toronto",
      d: "Display the cost of Trump's tariffs beside the total price"
    },
    answer: "d",
    points: 10
  },
  {
    id: 2,
    category: "economy",
    question: "The Bank of Japan made headlines by doing what for the first time in 17 years?",
    options: {
      a: "Cutting interest rates to zero",
      b: "Allowing the yen to float freely",
      c: "Raising interest rates above zero",
      d: "Buying Bitcoin to stabilize the market"
    },
    answer: "c",
    points: 10
  },
  {
    id: 3,
    category: "tech",
    question: "Apple quietly rolled out a change that has privacy advocates concerned. What did they do?",
    options: {
      a: "Enabled location tracking by default in Safari",
      b: "Allowed iPhone data backups to sync with iCloud by default",
      c: "Started scanning photos for AI training without user consent",
      d: "Bundled Siri recordings into iOS crash reports"
    },
    answer: "d",
    points: 10
  },
  {
    id: 4,
    category: "rumours",
    question: "A viral TikTok claimed Google was planning to replace which popular service with an AI chatbot?",
    options: {
      a: "Google Translate",
      b: "Google Maps",
      c: "Gmail",
      d: "Google Search"
    },
    answer: "d",
    points: 10
  },
  {
    id: 5,
    category: "markets",
    question: "After a sudden 18% surge in its stock, what did Reddit reportedly plan to do?",
    options: {
      a: "Ban all stock trading discussions",
      b: "Launch a branded meme ETF",
      c: "Offer premium users early access to IPO news",
      d: "Sell off some of its own shares"
    },
    answer: "d",
    points: 10
  }
]

export type Question = {
  id: number;
  category: string;
  question: string;
  options: Record<string, string>;
  answer: string;
  points: number;
};

export type Answer = {
  id: number;
  selected: string | null;
  points: number;
  multiplier: number;
}