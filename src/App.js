import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', linkedin: '',
    education: '', experience: '', certifications: '',
    skills: '', jobDescription: ''
  });
  const [responseUrl, setResponseUrl] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://your-backend-api-url/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResponseUrl(data.downloadUrl);
  };

  return (
    <div className="container">
      <h1>Resume Builder</h1>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "linkedin", "education", "experience", "certifications", "skills", "jobDescription"]
          .map(field => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                rows={field === "jobDescription" || field === "experience" ? 4 : 2}
              />
            </div>
          ))}
        <button type="submit">Generate Resume</button>
      </form>

      {responseUrl && (
        <div className="download-section">
          <h2>Your resume is ready!</h2>
          <a href={responseUrl} target="_blank" rel="noreferrer">Download Resume</a>
        </div>
      )}
    </div>
  );
}

export default App;

