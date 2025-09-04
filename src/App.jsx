import { useState } from 'react'
import './App.css'
import ShowResults from './pages/ShowResults'
import EntryCard from './pages/EntryCard'
import QuestionPage from './pages/QuestionPage'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footerr from './components/Footerr'
import Navbar from './components/Navbar'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progress, setProgress] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    setGameStarted(true);
  };

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route 
            path="/" 
            element={
              <EntryCard 
                loading={loading} 
                difficulty={difficulty} 
                setDifficulty={setDifficulty} 
              />
            } 
          />
          <Route 
            path="/quiz" 
            element={
              <QuestionPage 
                questions={questions} 
                setQuestions={setQuestions} 
                currentQuestionIndex={currentQuestionIndex} 
                setCurrentQuestionIndex={setCurrentQuestionIndex} 
                score={score} 
                setScore={setScore} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
                progress={progress} 
                setProgress={setProgress} 
                loading={loading} 
                setLoading={setLoading} 
                difficulty={difficulty} 
                setDifficulty={setDifficulty} 
                timeLeft={timeLeft} 
                setTimeLeft={setTimeLeft} 
                timerActive={timerActive} 
                setTimerActive={setTimerActive}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
              />
            } 
          />
          <Route 
            path="/results" 
            element={
              <ShowResults 
                setError={setError} 
                setGameStarted={setGameStarted} 
                setUserAnswers={setUserAnswers} 
                setShowResults={setShowResults} 
                questions={questions} 
                setQuestions={setQuestions} 
                currentQuestionIndex={currentQuestionIndex} 
                setCurrentQuestionIndex={setCurrentQuestionIndex} 
                score={score} 
                setScore={setScore} 
                selectedAnswer={selectedAnswer} 
                setSelectedAnswer={setSelectedAnswer} 
                progress={progress} 
                setProgress={setProgress} 
                loading={loading} 
                setLoading={setLoading} 
                difficulty={difficulty} 
                setDifficulty={setDifficulty} 
                timeLeft={timeLeft} 
                setTimeLeft={setTimeLeft} 
                timerActive={timerActive} 
                setTimerActive={setTimerActive}
                userAnswers={userAnswers}
              />
            } 
          />
        </Routes>
        <Footerr/>


      </Router>
    </>
  )
}

export default App