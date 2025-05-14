import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/finalselect.css"; // ✅

const FinalSelect = () => {
  const [finalCandidates, setFinalCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get("http://localhost:3001/candidates");
        const candidates = res.data;

        const processedCandidates = candidates.map((candidate) => ({
          name: `${candidate.firstname} ${candidate.lastname}`,
          email: candidate.email, // ✅ Now include email
          phone: candidate.contact,
          location: candidate.city || "N/A",
          role: candidate.role,
        }));

        setFinalCandidates(processedCandidates);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleFinalResult = async (candidateEmail, result) => {
    try {
      await axios.put(`http://localhost:3001/progress/update-final/${encodeURIComponent(candidateEmail)}`, {
        finalResult: result,
      });
      alert(`Successfully updated as ${result}`);
    } catch (error) {
      console.error("Error updating final result:", error.response?.data || error.message);
      alert("Failed to update final result");
    }
  };

  const handleSelect = (candidateEmail) => {
    handleFinalResult(candidateEmail, "Selected");
  };

  const handleReject = (candidateEmail) => {
    handleFinalResult(candidateEmail, "Rejected");
  };

  return (
    <div className="final-select-container">
      <h2>Final Selection</h2>
      <div className="card-list">
        {finalCandidates.length > 0 ? (
          finalCandidates.map((c, idx) => (
            <div key={idx} className="candidate-card">
              <h3>{c.name}</h3>
              <p>Email: {c.email}</p> {/* ✅ Show email also */}
              <p>Phone: {c.phone}</p>
              <p>Applied Role: {c.role}</p>
              <div className="button-group">
                <button className="select-btn" onClick={() => handleSelect(c.email)}>Select</button>
                <button className="reject-btn" onClick={() => handleReject(c.email)}>Reject</button>
              </div>
            </div>
          ))
        ) : (
          <p>No candidates available.</p>
        )}
      </div>
    </div>
  );
};

export default FinalSelect;
