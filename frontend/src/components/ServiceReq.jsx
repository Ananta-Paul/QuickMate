import React, { useState } from 'react';
import { skillset } from "../data/ServiceSkill";

const ServiceReq = ({ ...data }) => {
  // State for storing selected skills and the current select value.
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  // State for all form fields.
  const [formData, setFormData] = useState({
    hireFor: data[0].title,
    skillset: [],
    gender: '',
    location: '',
    budget: '',
    description: ''
  });

  // When a skill is selected, add it to selectedSkills and update formData.
  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value) {
      const newSkills = [...selectedSkills, value];
      setSelectedSkills(newSkills);
      setSelectValue("");
      setFormData((prev) => ({ ...prev, skillset: newSkills }));
    }
  };

  // Remove a skill from selectedSkills and update formData.
  const removeSkill = (skillName) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillName);
    setSelectedSkills(newSkills);
    setFormData((prev) => ({ ...prev, skillset: newSkills }));
  };

  // Compute available skills by filtering out those already selected.
  const availableSkills = skillset.filter(skill => !selectedSkills.includes(skill.name));

  // Generic onChange handler for text inputs, selects, and textarea.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);
    // Add submission logic here (e.g., send data to an API).
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="font-semibold text-blue-600 text-lg mb-4 text-center">
        Find Your Professional Maid Here!
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Hire For Section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="hireFor" className="text-md font-semibold">Hire For</label>
          <input
            type="text"
            id="hireFor"
            name="hireFor"
            value={formData.hireFor}
            readOnly
            className="px-4 py-2 border-2 border-gray-200 rounded-sm w-full"
          />
        </div>

        {/* Skillset Selection Section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="skillset" className="text-md font-semibold">
            Requirements And Skillset
          </label>

          {/* Display Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center border-green-700 border-2 rounded-md px-2 py-1"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-red-500 font-bold"
                      title="Remove skill"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Select Dropdown for available skills */}
          <select
            id="skillset"
            name="skillset"
            value={selectValue}
            onChange={handleSelectChange}
            className="px-4 py-2 border-2 border-gray-200 rounded-sm w-full"
          >
            <option value="">Select a skill</option>
            {availableSkills.map(skill => (
              <option key={skill.id} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-md font-semibold">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="px-4 py-2 border-2 border-gray-200 rounded-sm w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Location Section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="text-md font-semibold">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter your location"
            value={formData.location}
            onChange={handleInputChange}
            className="px-4 py-2 border-2 border-gray-200 rounded-sm w-full"
          />
        </div>

        {/* Budget Section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-md font-semibold">Budget</label>
          <input
            placeholder="Enter your budget"
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="px-4 py-2 border-2 border-gray-200 rounded-sm w-full"
          />
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-md font-semibold">Description</label>
          <textarea
            placeholder="Anything you want to know us!"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="px-4 py-2 border-2 border-gray-200 rounded-sm w-full"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceReq;
