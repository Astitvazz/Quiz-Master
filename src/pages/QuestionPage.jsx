import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuestionPage({
  questions,
  setQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  userAnswers,
  setUserAnswers,
  score,
  setScore,
  selectedAnswer,
  setSelectedAnswer,
  timeLeft,
  setTimeLeft,
  progress,
  setProgress,
  loading,
  setLoading,
  difficulty,
  setDifficulty,
  timerActive,
  setTimerActive,
  setShowResults,
}) {
  const navigate = useNavigate();

  // Decode HTML entities from API
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Fetch questions from API only
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=9${
            difficulty ? `&difficulty=${difficulty}` : ""
          }`
        );

        const data = response.data.results;

        if (!data || data.length === 0) {
          throw new Error("No questions received from API");
        }

        console.log("✅ API questions loaded successfully", data);

        const formattedQuestions = data.map((item) => {
          const allOptions = [...item.incorrect_answers, item.correct_answer];

          // Shuffle options
          for (let i = allOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
          }

          return {
            question: decodeHtml(item.question),
            options: allOptions.map((opt) => decodeHtml(opt)),
            correctAnswer: decodeHtml(item.correct_answer),
            category: decodeHtml(item.category || ""),
            difficulty: item.difficulty,
          };
        });

        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("🔥 API failed:", error.message);
      } finally {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer("");
        setTimeLeft(30);
        setProgress(0);
        setUserAnswers({});
        setTimerActive(true);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [difficulty]);

  const handleNextQuestion = () => {
    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex]?.correctAnswer;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selected: selectedAnswer || null,
        correct: questions[currentQuestionIndex]?.correctAnswer,
        isCorrect,
      },
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setTimeLeft(30);
    } else {
      setTimerActive(false);
      navigate("/results");
    }
  };

  // Timer effect
  useEffect(() => {
    if (questions.length === 0 || !timerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, questions, timerActive, handleNextQuestion]);

  // Update progress
  useEffect(() => {
    if (questions.length > 0) {
      const newProgress = (currentQuestionIndex / questions.length) * 100;
      setProgress(newProgress);
    }
  }, [currentQuestionIndex, questions.length, setProgress]);

  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    if (timeLeft === 0) return;
    setSelectedAnswer(answer);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      const prevAnswer = userAnswers[currentQuestionIndex - 1]?.selected || "";
      setSelectedAnswer(prevAnswer);
      setTimeLeft(30);
    }
  };

  const handleSubmit = () => {
    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex]?.correctAnswer;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: {
        selected: selectedAnswer || null,
        correct: questions[currentQuestionIndex]?.correctAnswer,
        isCorrect,
      },
    }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimerActive(false);
    navigate("/results");
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  <span className="text-lg font-bold">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <span className="text-blue-200"> of {questions.length}</span>
                </div>
                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                    timeLeft <= 10
                      ? "bg-red-500/20 text-red-300"
                      : "bg-blue-500/20 text-blue-300"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-bold">{timeLeft}s</span>
                </div>
              </div>
              <div className="text-right text-white">
                <div className="text-sm text-blue-200">Score</div>
                <div className="text-xl font-bold">
                  {score}/
                  {Math.max(
                    currentQuestionIndex,
                    Object.keys(userAnswers).length
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-500">
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {currentQuestion.category} • {currentQuestion.difficulty}
              </div>
              <h2
                className="text-2xl lg:text-3xl font-bold text-white leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              />
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const letters = ["A", "B", "C", "D"];
                const isSelected = selectedAnswer === option;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={timeLeft === 0}
                    className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:scale-105 ${
                      isSelected
                        ? "bg-yellow-500/20 border-yellow-400 shadow-lg"
                        : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40"
                    } ${
                      timeLeft === 0
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? "bg-yellow-400 text-black"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {letters[index]}
                      </div>
                      <span
                        className="text-white font-medium text-lg flex-1"
                        dangerouslySetInnerHTML={{ __html: option }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  currentQuestionIndex === 0
                    ? "bg-gray-600/20 text-gray-400 cursor-not-allowed"
                    : "bg-white/10 text-white hover:bg-white/20 transform hover:scale-105"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <button
                onClick={
                  currentQuestionIndex === questions.length - 1
                    ? handleSubmit
                    : handleNextQuestion
                }
                disabled={!selectedAnswer && timeLeft > 0}
                className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                  !selectedAnswer && timeLeft > 0
                    ? "bg-gray-600/20 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 shadow-lg"
                }`}
              >
                <span>
                  {currentQuestionIndex === questions.length - 1
                    ? "Finish"
                    : "Next"}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
