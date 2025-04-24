import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    education: "",
    experience: "",
    certifications: "",
    skills: "",
    jobDescription: "",
  });

  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResume("");

    try {
      const response = await axios.post(
        "https://orxicjn7tg.execute-api.us-east-1.amazonaws.com/dev/items",
        formData
      );
      setResume(response.data.resume);
    } catch (err) {
      alert("Failed to generate resume: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>AI Resume Generator</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <textarea
              name={key}
              value={formData[key]}
              onChange={handleChange}
              rows={key === "jobDescription" ? 4 : 2}
              required
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </form>

      {resume && (
        <div className="resume-output">
          <h2>Generated Resume</h2>
          <pre>{resume}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

