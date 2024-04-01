import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // Adjust the import path as necessary
import './GetQuiz.css';

function GetQuiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Stores answer IDs

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axiosInstance.get('get-quiz/');
        setQuizQuestions(response.data);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuizQuestions();
  }, []);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmitAnswers = async () => {
    // Construct the payload with both answer_id and question_id
    const attempt = Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
        answer_id: answerId,
        question_id: parseInt(questionId) // Ensure question_id is an integer
    }));

    const payload = { attempt };

    try {
        const response = await axiosInstance.post('attempt-quiz/', payload);
        console.log('Quiz submitted successfully', response.data);
        // console.log(payload)
        // Handle submission success, e.g., display a success message, redirect, or clear state
    } catch (error) {
        console.error('Failed to submit quiz:', error.response ? error.response.data : error);
        // Handle submission error, e.g., display an error message
    }
};

  return (
    <div className="quiz-container">
      <h2>Quiz</h2>
      {quizQuestions.length > 0 ? quizQuestions.map(question => (
        <div key={question.question_id} className="question">
          <h3>{question.question}</h3>
          {question.answers.map(answer => (
            <div key={answer.answer_id} className="answer">
              <input
                type="radio"
                name={`question-${question.question_id}`}
                value={answer.answer_id}
                checked={selectedAnswers[question.question_id] === answer.answer_id}
                onChange={() => handleAnswerSelect(question.question_id, answer.answer_id)}
              />
              <label>{answer.answer}</label>
            </div>
          ))}
        </div>
      )) : (
        <p className="loading">Loading questions...</p>
      )}
      <button onClick={handleSubmitAnswers} className="submit-answers">Submit Answers</button>
    </div>
  );
}

export default GetQuiz;
