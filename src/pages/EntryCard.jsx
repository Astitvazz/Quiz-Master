import React from "react";
import { useState } from "react";
import { Trophy, Target, Clock, Zap, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EntryCard({loading,difficulty,setDifficulty}) {
    
    const navigate = useNavigate();
    const handleStartQuiz=()=>{
        navigate('/quiz');
    }
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border border-white/20">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Quiz Master
                        </h1>
                        <p className="text-blue-200 text-lg">
                            Test your knowledge with our exciting quiz!
                        </p>
                    </div>

                    <div className="mb-8 space-y-4">
                        <div className="flex items-center justify-center space-x-6 text-white/80">
                            <div className="flex items-center space-x-2">
                                <Target className="w-5 h-5" />
                                <span>10 Questions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5" />
                                <span>30s Each</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-white font-medium">
                                Choose Difficulty:
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            >
                                <option value="easy" className="bg-gray-800">
                                    Easy
                                </option>
                                <option value="medium" className="bg-gray-800">
                                    Medium
                                </option>
                                <option value="hard" className="bg-gray-800">
                                    Hard
                                </option>
                            </select>
                        </div>
                    </div>
                
                    <button
                        onClick={handleStartQuiz}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" />
                                <span>Start Quiz</span>
                            </>
                        )}
                    </button>
            
                </div>
            </div>
        </div>
    );
}

export default EntryCard;
