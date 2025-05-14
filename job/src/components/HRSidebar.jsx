import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/hrsidebar.css";

function HRSidebar() {
  const navigate = useNavigate();

  return (
    <div className="hr-sidebar">
      <button onClick={() => navigate("/hr-dashboard")}>View Candidates</button>
      <button onClick={() => navigate("/interviews")}>Interview Rounds</button>
      <button onClick={() => navigate("/view-shortlist")}>View Shortlist</button> {/* ✅ New Button */}
      <button onClick={() => navigate("/final-select")}>Final Select</button> {/* ✅ New Button */}
    </div>
  );
}

export default HRSidebar;
