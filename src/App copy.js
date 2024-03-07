import './App.css';
import React, { useState } from 'react';
import { Intro, Questions } from './pmp';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <>
      <br />
      <div>
        {!quizStarted && <Intro startQuiz={startQuiz} />}
        {quizStarted && <Questions />}
      </div>
    </>
  );
}

export default App;
