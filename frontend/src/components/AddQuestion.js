// src/components/AddQuestions.js
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // Adjust the import path as necessary
import './AddQuestion.css';

function AddQuestions() {
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const handleAddAnswer = () => {
    setAnswers([...answers, { answer: '', is_correct: false }]);
  };

  const handleAnswerChange = (index, newText) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, answer: newText } : answer
    );
    setAnswers(newAnswers);
  };

  const handleToggleCorrect = (index) => {
    const newAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, is_correct: !answer.is_correct } : answer
    );
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        question: questionText,
        answers: answers,
        active: isActive,
      };
      // Send the question and answers to the 'question/' API endpoint
      const response = await axiosInstance.post('create-question/', payload);
      console.log(payload)
      console.log('Question submitted successfully', response.data);
      // Handle success, e.g., clear form, display success message, or redirect
      setQuestionText('');
      setAnswers([]);
      setIsActive(true);
    } catch (error) {
      console.error('Failed to submit question:', error.response ? error.response.data : error);
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Question</h2>
      <div>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
      </div>
      {answers.map((answer, index) => (
        <div key={index}>
          <input
            type="text"
            value={answer.answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required
          />
          <label>
            Correct?
            <input
              type="checkbox"
              checked={answer.isCorrect}
              onChange={() => handleToggleCorrect(index)}
            />
          </label>
        </div>
      ))}
      <div>
        <label>
          Active?
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
      </div>
      <button type="button" onClick={handleAddAnswer}>
        Add Answer
      </button>
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default AddQuestions;
