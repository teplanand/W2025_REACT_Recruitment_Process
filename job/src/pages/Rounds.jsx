import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Slidbar";
import "../style/round.css";
import { useNavigate } from "react-router-dom";

const AptitudeTest = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Roles for each test
  const bothTestsRoles = [
    "Software Developer",
    "System Administrator",
    "Network Engineer",
    "Data Analyst",
    "Cybersecurity Analyst",
    "AI/ML Engineer",
    "Industrial Automation Engineer",
    "IoT Engineer"
  ];

  const generalTestOnlyRoles = [
    "Design Engineer",
    "Production Engineer",
    "Quality Control Engineer",
    "Maintenance Engineer",
    "Research & Development Engineer",
    "Manufacturing Process Engineer",
    "Supply Chain Engineer",
    "Product Testing Engineer",
    "ERP Specialist",
    "Technical Support Engineer",
    "Automation Engineer",
    "Project Manager",
    "Technical Sales Engineer",
    "Product Manager"
  ];

  return (
    <>
      <div className="preparation-container">
        <Header />
        <div className="dashboard-content">
          <Sidebar />
          <div className="content-body">
            <h1>Interview Rounds</h1>
            <p>
              Interview rounds are a crucial part of the hiring process. They help the interviewer assess
              the candidate's skills, experience, and fit for the role. Here are some tips to help
              you prepare for interview rounds:
            </p>
            <ul>
              <li>Research the company and the role</li>
              <li>Review the job description and requirements</li>
              <li>Prepare answers to common interview questions</li>
              <li>Practice your responses with a friend or family member</li>
            </ul>
            {/* Role Information Section */}
            <div className="test-section">
              <h2>Test Allocation Based on Roles</h2>

              <div className="roles-list-container">
                <div className="roles-list">
                  <h3>Roles requiring both General and Coding Tests:</h3>
                  <ul>
                    {bothTestsRoles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>

                <div className="roles-list">
                  <h3>Roles requiring only General Test:</h3>
                  <ul>
                    {generalTestOnlyRoles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* General Aptitude Section */}
            <div className="test-section">
              <h2>General Aptitude</h2>
              <button onClick={() => handleNavigate("/genral-test")}>Start General Test</button>
            </div>

            {/* Technical Aptitude Section */}
            <div className="test-section">
              <h2>Technical Aptitude (Coding Test)</h2>
              <button className="inline-button" onClick={() => handleNavigate("/coding-test")}>
                Start Coding Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AptitudeTest;
