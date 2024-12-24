
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

export default function MockIntDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: '',
    yearsOfExperience: '',
    jobDescription: '',
    resume: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert('Please upload your resume.');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('resume', formData.resume);
    uploadData.append('jobRole', formData.jobRole);
    uploadData.append('yearsOfExperience', formData.yearsOfExperience);
    uploadData.append('jobDescription', formData.jobDescription);

    try {
      const response = await fetch('https://backend-interview-1.onrender.com/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      localStorage.setItem('interviewQuestions', JSON.stringify(result.interviewQuestions));
      navigate('/interview-questions');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Layout title={'Interview Dashboard'}>
      <div className="container w-75 my-3">
        <h1>Prepare for Your Mock Interview</h1>
        <p>Provide details about your desired job role and upload your resume to get started.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="jobRole" className="form-label">Job Role/Job Position</label>
            <input
              type="text"
              className="form-control"
              id="jobRole"
              placeholder="Ex. Full Stack Developer"
              value={formData.jobRole}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
            <input
              type="number"
              className="form-control"
              id="yearsOfExperience"
              placeholder="Ex. 5"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jobDescription" className="form-label">Job Description/Tech Stack</label>
            <textarea
              className="form-control"
              id="jobDescription"
              rows="5"
              placeholder="Describe the key responsibilities or tech stack related to the job."
              value={formData.jobDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="resume" className="form-label">Upload Your Resume</label>
            <input
              type="file"
              className="form-control"
              id="resume"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary btn-lg my-4"
              style={{"backgroundColor":"#f4476b"}}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
