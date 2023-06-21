import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {

  const {signup,error,loading} = useSignup();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleForm = (event) => {
    setFormData((prevstate) => ({
        ...prevstate,
        [event.target.name] : event.target.value
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(formData.email,formData.password)

    setFormData({
        email : '',
        password : ''
    });
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Signup</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleForm}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        placeholder="Enter Password"
        onChange={handleForm}
      />
      <button disabled={loading} type="submit">Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
