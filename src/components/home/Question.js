/*jshint esversion: 8*/
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "./HowTo.css";

const Question = ({ title, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="container question">
      <div className="question-title">
        <h4>{title}</h4>
        <button className="question-icons" onClick={handleClick}>
          {showAnswer ? (
            <AiOutlineMinus color="red" />
          ) : (
            <AiOutlinePlus color="#1f93ff" />
          )}
        </button>
      </div>
      <div className="question-answer">
        {showAnswer && <p className="u-text-small">{answer}</p>}
      </div>
    </div>
  );
};

export default Question;
