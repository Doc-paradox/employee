import React ,{useState} from 'react';
import axios from 'axios';
import './EmpForm.css';

const EmpForm = () => {
  const [step,setStep] =useState(1);
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
  });

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.employeeId || !formData.department || !formData.dob || !formData.gender || !formData.designation || !formData.salary) {
      alert('Please fill in all the fields.');
      return;
    }
    // Additional validation
    if (formData.name.length > 30) {
      alert('Employee name should be within 30 characters.');
      return;
    }
    if (formData.salary.length > 8) {
      alert('Salary should be within 8 digits.');
      return;
    }
    // Backend logic here (You can send data to backend or handle submission)
    alert('Form submitted successfully!');
    console.log(formData);
  };*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleNextClick =(e) =>{
    e.preventDefault();
    setStep(step+1);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.employeeId || !formData.department || !formData.dob || !formData.gender || !formData.designation || !formData.salary) {
      alert('Please fill in all the fields.');
      return;
    }
    // Additional validation
    if (formData.name.length > 20) {
      alert('Employee name should be within 20 characters.');
      return;
    }
    const dob = new Date(formData.dob);
    if (dob.getFullYear() > 2002) {
      alert('Year of birth should be before 2002.');
      return;
    }
    if (formData.salary.length > 8) {
      alert('Salary should be within 8 digits.');
      return;
    }
    
  
    try {
      // Send form data to backend
      const response = await axios.post('http://localhost:3001/employee', formData);
      console.log('Form submitted successfully!', response.data);
      alert('Form submitted successfully!');
      // Clear the form after successful submission
      setFormData({
        name: '',
        employeeId: '',
        department: '',
        dob: '',
        gender: '',
        designation: '',
        salary: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    }
  };

  return (
    /*<div className="form-container">
      <h2 className="form-header">Employee Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">
          Employee Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <br />
        <label className="form-label">
          Employee ID:
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <br />
        <label className="form-label">
          Department:
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <br />
        <label className="form-label">
          Gender:
          <label >
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              required
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              required
            /> Female
          </label>
        </label>
        <br />
        <label className="form-label">
          Designation:
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <br />
        <label className="form-label">
          Salary:
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="input-field"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>*/
    <form onSubmit={step === 1 ? handleNextClick : handleSubmit}>
          {step === 1 && (
        <>

      <label htmlFor="name">Employee Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} maxLength="30" required /><br /><br />

      <label htmlFor="employeeId">Employee ID:</label>
      <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required /><br /><br />

      <label htmlFor="department">Department:</label>
      <select id="department" name="department" value={formData.department} onChange={handleChange} required>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
      </select><br /><br />
      <input type="submit" value="Next" />
      </>
      )}
      {step === 2 && (
        <>

      <label htmlFor="dob">Date of Birth:</label>
      <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required /><br /><br />

      <label>Gender:</label>
      <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required /> Male
      <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required /> Female<br /><br />

      <label htmlFor="designation">Designation:</label>
      <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} required /><br /><br />

      <label htmlFor="salary">Salary:</label>
      <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} maxLength="8" required /><br /><br />
      <input type="submit" value="Submit" />
      </>
      )}
    </form>
  );
};

export default EmpForm;