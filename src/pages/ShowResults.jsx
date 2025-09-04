import React from 'react'
import { Trophy, Target, RotateCcw } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function ShowResults({score,questions,userAnswers,setTimerActive,setError,setGameStarted,
  setQuestions,
  setUserAnswers,
  setShowResults,
  setCurrentQuestionIndex,
  setScore,
  setSelectedAnswer,
  setTimeLeft,}) {
    console.log(questions);
    console.log(userAnswers);
    const Navigate=useNavigate();
    const percentage = Math.round((score / questions.length) * 100);
    const restartQuiz = () => {
    Navigate('/')
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSelectedAnswer('');
    setShowResults(false);
    setScore(0);
    setTimeLeft(30);
    setTimerActive(false);
    setGameStarted(false);
    setError(null);
    setQuestions([]);
  };
  return (
    <div>
         <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 text-center shadow-2xl border border-white/20">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-2xl text-blue-200 mb-4">{percentage}% Correct</p>
            <div className="w-full bg-white/10 rounded-full h-4 mb-6">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Detailed Results
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {questions.map((q, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer?.isCorrect;
                
                return (
                  <div key={index} className={`p-4 rounded-xl border-2 transition-all ${
                    isCorrect 
                      ? 'bg-green-500/20 border-green-400' 
                      : 'bg-red-500/20 border-red-400'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-white text-lg">Q{index + 1}:</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓ Correct' : '✗ Wrong'}
                      </span>
                    </div>
                    <p className="text-white/90 mb-3">{q.question}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-blue-200 font-medium mr-2">Your answer:</span>
                        <span className={userAnswer?.selected ? 'text-white' : 'text-gray-400'}>
                          {userAnswer?.selected || 'No answer'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-200 font-medium mr-2">Correct answer:</span>
                        <span className="text-green-300">{q.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center mt-8">
            <button
              onClick={restartQuiz}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Take Quiz Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowResults
