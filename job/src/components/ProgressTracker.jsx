import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../assets/UserContext";
import "../style/progresstracker.css";

function ProgressTracker() {
  const { userData } = useContext(UserContext);
  const [progress, setProgress] = useState(null);
  const [view, setView] = useState("status"); // 'status' or 'finalResult'

  useEffect(() => {
    const fetchProgress = async () => {
      if (!userData?.email) return;
      try {
        const res = await axios.get(
          `http://localhost:3001/progress/by-email/${encodeURIComponent(userData.email)}`
        );
        setProgress(res.data);
      } catch (err) {
        console.error("Error fetching progress:", err.response?.data || err.message);
      }
    };

    fetchProgress();
  }, [userData]);

  return (
    <div className="progress-tracker-wrapper">
      <div className="progress-tracker">
        <h3>Application Progress</h3>

        <div className="button-group">
          <button
            className={view === "status" ? "active" : ""}
            onClick={() => setView("status")}
          >
            Show Status
          </button>
          <button
            className={view === "finalResult" ? "active" : ""}
            onClick={() => setView("finalResult")}
          >
            Final Result
          </button>
        </div>

        {progress ? (
          view === "status" ? (
            <ul>
              <li>
                <span>HR Approval:</span>
                <span
                  className={`status ${
                    progress.hrApproval === "Approved" ? "approved" : "pending"
                  }`}
                >
                  {progress.hrApproval}
                </span>
              </li>
              <li>
                <span>Interview:</span>
                <span
                  className={`status ${
                    progress.interview === "Scheduled" ? "scheduled" : "not-scheduled"
                  }`}
                >
                  {progress.interview === "Scheduled"
                    ? progress.interviewDate
                      ? `Scheduled on ${new Date(progress.interviewDate).toLocaleString()}`
                      : "Scheduled"
                    : "Not Scheduled"}
                </span>
              </li>
            </ul>
          ) : (
            <div className="final-result">
              {progress.finalResult ? (
                <h4
                  className={
                    progress.finalResult === "Selected"
                      ? "selected"
                      : "rejected"
                  }
                >
                  {progress.finalResult === "Selected"
                    ? "Congratulations! You are Selected 🎉"
                    : "We regret to inform you, Not Selected"}
                </h4>
              ) : (
                <p>Face-to-Face Interview Result Not Updated Yet</p>
              )}
            </div>
          )
        ) : (
          <p>Loading progress...</p>
        )}
      </div>
    </div>
  );
}

export default ProgressTracker;
