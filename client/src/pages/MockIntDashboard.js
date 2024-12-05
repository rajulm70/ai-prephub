import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

export default function MockIntDashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: '',
    yearsOfExperience: '',
    jobDescription: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    // You can add any form validation logic here if needed
    navigate('/under-progress');
  };

  return (
    <Layout title={'Interview Dashboard'}>
      <div className="container w-75 my-3">
        <h1>Tell us more about your job interviewing</h1>
        <p>Add details about the job position, your skills, and years of experience</p>

        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="jobRole" className="form-label">Job Role/Job Position</label>
            <input
              type="text"
              className="form-control"
              id="jobRole"
              placeholder="Ex. Full Stack Developer"
              value={formData.jobRole}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
            <input
              type="text"
              className="form-control"
              id="yearsOfExperience"
              placeholder="Ex. 5"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="jobDescription" className="form-label">Job Description/ Tech Stack</label>
          <textarea
            className="form-control"
            id="jobDescription"
            rows="8"
            value={formData.jobDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary btn-lg my-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
}
