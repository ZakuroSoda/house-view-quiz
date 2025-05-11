import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Label, ResponsiveContainer } from 'recharts';

export default function QuizScoreGraph({ answers, finalScore }) {
  const [graphData, setGraphData] = useState([]);
  
  useEffect(() => {
    if (!answers || answers.length === 0) return;
    
    // Transform answers into the data format needed for the chart
    const data = [];
    let runningTotal = 0;
    
    answers.forEach((answer, index) => {
      const pointValue = answer.points * answer.multiplier;
      runningTotal += pointValue;
      
      data.push({
        question: `Q${answer.id}`,
        score: runningTotal,
        pointValue: pointValue > 0 ? `+${pointValue}` : pointValue,
        multiplier: answer.multiplier !== 1 ? answer.multiplier : null
      });
    });
    
    setGraphData(data);
  }, [answers]);

  // Calculate the max and min values for Y axis
  const maxScore = Math.max(...graphData.map(item => item.score), 0);
  const minScore = Math.min(...graphData.map(item => item.score), 0);
  const yDomain = [
    minScore < 0 ? minScore - 10 : 0,
    maxScore + 10
  ];

  return (
    <div className="bg-black text-white p-6 rounded-lg w-full max-w-lg">
      <h1 className="text-4xl font-bold mb-1">Your final score</h1>
      <h2 className="text-8xl font-bold">{finalScore}</h2>
      <p className="text-xl mb-6">Weekend of May 2, 2025</p>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#555" horizontal={true} vertical={false} />
            <XAxis dataKey="question" stroke="#fff" />
            <YAxis domain={yDomain} stroke="#fff" />
            <ReferenceLine y={0} stroke="#555" />
            
            <Line
              type="stepAfter"
              dataKey="score"
              stroke="#fff"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <g>
                    {/* Point value label */}
                    <text 
                      x={cx} 
                      y={cy - 15} 
                      textAnchor="middle" 
                      fill="#fff" 
                      fontSize="12"
                    >
                      {payload.pointValue}
                    </text>
                    
                    {/* Draw the multiplier badge if exists */}
                    {payload.multiplier && (
                      <g>
                        <polygon 
                          points={`${cx-15},${cy+30} ${cx},${cy+15} ${cx+15},${cy+30} ${cx},${cy+45}`} 
                          fill="#d4ff4a" 
                        />
                        <text 
                          x={cx} 
                          y={cy + 32} 
                          textAnchor="middle" 
                          fill="#000" 
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {payload.multiplier === 0.5 ? '½' : `${payload.multiplier}x`}
                        </text>
                      </g>
                    )}
                    
                    {/* The actual dot */}
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={4} 
                      fill={payload.pointValue.startsWith('+') ? "#06D6A0" : "#EF476F"} 
                      stroke="#fff" 
                      strokeWidth={1}
                    />
                  </g>
                );
              }}
              activeDot={false}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <div className="text-2xl font-bold">Bloomberg</div>
        <div className="text-2xl font-bold text-lime-300">Pointed News Quiz</div>
      </div>
    </div>
  );
}