import React, { useState, useEffect, useContext } from "react";
import '../style/test.css';
import { UserContext } from "../assets/UserContext";
import { useNavigate } from 'react-router-dom';


const quizData = [
  {
    id:1,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High-Level Text Management Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language",
    ],
  },
  {
    id:2,
    question: "Which of the following is NOT a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
  },
  {
    id:3,
    question: "What is the output of print(2 ** 3) in Python?",
    options: ["6", "8", "9", "16"],
  },
  {
    id:4,
    question: "Which symbol is used for single-line comments in C++?",
    options: ["//", "/* */", "#", "--"],
  },
  {
    id:5,
    question: "What will 5 % 2 return in Python?",
    options: ["2", "2.5", "1", "0"],
  },
  {
    id:6,
    question: "Which data structure uses LIFO (Last In, First Out)?",
    options: ["Queue", "Stack", "Linked List", "Array"],
  },
  {
    id:7,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheet",
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Colorful Style System",
    ],
  },
  {
    id:8,
    question: "Which keyword is used to define a function in Python?",
    options: ["func", "def", "function", "define"],
  },
  {
    id:9,
    question: "What will console.log(typeof '123') output in JavaScript?",
    options: ["number", "string", "integer", "object"],
  },
  {
    id:10,
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["INSERT", "DELETE", "UPDATE", "SELECT"],
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const { userData } = useContext(UserContext);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const navigate = useNavigate();

  const handleChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // Event might be undefined when auto-submitting

    const allAnswered = quizData.every((q) => answers[q.id] !== undefined);
    if (!allAnswered) {
      alert("Time's up or incomplete submission! Submitting whatever is filled.");
    }

    const payload = {
      fullname: userData?.username || userData?.fullName,
      email: userData?.email,
      answers,
    };

    try {
      const res = await fetch("http://localhost:3001/api/submit-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payload }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Coding test answers submitted successfully!`);
      } else {
        alert("Submission failed: " + data.message);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("An error occurred while submitting your answers.");
    }
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // Auto submit when time finishes
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId); // Cleanup timeout
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Coding Test</h1>
      <div className="timer-box">
        Time Remaining: <span>{formatTime(timeLeft)}</span>
      </div>
      <form onSubmit={handleSubmit}>
        {quizData.map((q) => (
          <div key={q.id} className="mb-4 p-4 border rounded-lg shadow">
            <div className="question-box">
              <h2>Question {q.id}</h2>
              <p>{q.question}</p>
              {q.options.map((option, optionIndex) => (
                <label key={`${q.id}-${optionIndex}`}>
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={() => handleChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Quiz;
