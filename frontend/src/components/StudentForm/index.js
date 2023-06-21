import React, { useState } from "react";
import { useStudentContext } from "../../hooks/useStudentContext";
import {useUserContext} from '../../hooks/useUserContext'

const StudentForm = () => {

  const {dispatch} = useStudentContext();
  const {user} = useUserContext();

  const [formData, setFormData] = useState({
    name: "",
    standard: "Nursery",
    gender: "Male",
    marks: "",
  });

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const standards = [
    "Nursery",
    "LKG",
    "UKG",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const genders = ["Male", "Female", "Others"];

  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!user){
      setError('You Must Be Logged in');
      return
    }

    const { name, standard, gender, marks } = formData;
    const student = { name, standard, gender, marks };

    const options = {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
        'Authorization' : `Bearer ${user.token}`
      },
    };

    const response = await fetch("/api/students", options);
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    } else {
      dispatch({type : 'CREATE_STUDENT',payload : data})
      setError(null);
      setEmptyFields([]);
      setFormData({
        name: "",
        standard: "Nursery",
        gender: "Male",
        marks: "",
      });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add Student</h3>
      <label htmlFor="name">Name</label>
      <input
        placeholder="Enter Name"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={emptyFields.includes("name") ? "error" : ""}
      />
      <label htmlFor="standard">Class</label>
      <select
        id="standard"
        name="standard"
        value={formData.standard}
        onChange={handleChange}
      >
        {standards.map((standard) => (
          <option key={standard} value={standard}>
            {standard}
          </option>
        ))}
      </select>
      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className={emptyFields.includes("gender") ? "error" : ""}
      >
        {genders.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <label htmlFor="marks">Marks</label>
      <input
        placeholder="Enter Marks"
        type="number"
        id="marks"
        name="marks"
        value={formData.marks}
        onChange={handleChange}
      />

      <div>
        <button type="submit">Submit</button>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default StudentForm;
