import React, { useState } from "react";
import axios from "axios";
import "../style/viewshortlist.css";

const ViewShortlist = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setLoading(true);

    try {
      const candidateRes = await axios.get("http://localhost:3001/candidates");
      const candidates = candidateRes.data;

      const candidatesWithProgress = await Promise.all(
        candidates.map(async (candidate) => {
          const progressRes = await axios.get(
            `http://localhost:3001/progress/by-email/${encodeURIComponent(candidate.email)}`
          );
          const progress = progressRes.data;

          return {
            name: `${candidate.firstname} ${candidate.lastname}`,
            role: candidate.role,
            interviewDate: progress?.interviewDate || "",
          };
        })
      );

      // Filter only candidates matching the selected date
      const filteredCandidates = candidatesWithProgress.filter(
        (c) => c.interviewDate && c.interviewDate.split("T")[0] === date
      );

      setShortlistedCandidates(filteredCandidates);
    } catch (error) {
      console.error("Error fetching candidates or progress:", error);
    }

    setLoading(false);
  };

  return (
    <div className="view-shortlist-container">
      <h2>Shortlisted Candidates</h2>

      <div className="filter-container">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="candidate-list">
        {loading ? (
          <p>Loading candidates...</p>
        ) : shortlistedCandidates.length > 0 ? (
          shortlistedCandidates.map((c, idx) => (
            <div key={idx} className="candidate-card">
              <h3>{c.name}</h3>
              <p>Applied for: {c.role}</p>
              <p>Interview Scheduled: {c.interviewDate ? new Date(c.interviewDate).toLocaleString() : "Not Scheduled"}</p>
            </div>
          ))
        ) : selectedDate ? (
          <p>No candidates found for selected date.</p>
        ) : (
          <p>Please select a date to view shortlisted candidates.</p>
        )}
      </div>
    </div>
  );
};

export default ViewShortlist;
