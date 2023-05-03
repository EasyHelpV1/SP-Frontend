/*jshint esversion: 8*/
import React from "react";
import { questions } from "./data.js";
import Question from "./Question";
import "./HowTo.css";

const HowTo = () => {
  return (
    <section id="faq">
      <div className="container faq">
        <div className="u-title" data-aos="fade-up">
          <h2>How to Use Easy Help?</h2>
          <p className="u-text-small">
            Here is a short guide to help with using Easy Help. If you have any
            additional questions, you can contact us using the information
            below.
          </p>
        </div>
        <div className="questions">
          {questions.map((question) => (
            <Question
              key={question.id}
              title={question.title}
              answer={question.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowTo;
