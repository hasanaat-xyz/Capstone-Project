import { useState } from "react";
import QuizApp from "../components/QuizApp";             
import LevelUpQuiz from "../components/LevelUpQuiz";     
import LevelUpQuiz3 from "../components/LevelUpQuiz3"; 
import EQReport from "../components/EQReport";

export default function EQAssessment({ currentUser }) {

  const [level, setLevel] = useState(1);
  const [results, setResults] = useState({ level1: null, level2: null, level3: null });
  const handleLevelComplete = (lvl, data) => {
    setResults((prev) => ({ ...prev, [`level${lvl}`]: data }));
    if (lvl < 3) setLevel(lvl + 1);
    else setLevel(4);
  };
  return (
    <>
      {level === 1 && (
        <QuizApp currentUser={currentUser} onComplete={(data) => handleLevelComplete(1, data)} />
      )}
      {level === 2 && (
        <LevelUpQuiz currentUser={currentUser} onComplete={(data) => handleLevelComplete(2, data)} />
      )}
      {level === 3 && (
        <LevelUpQuiz3 currentUser={currentUser} onComplete={(data) => handleLevelComplete(3, data)} />
      )}
      {level === 4 && <EQReport results={results} />}
    </>
  );
}
