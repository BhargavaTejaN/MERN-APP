import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {

  const {login,error,loading} = useLogin();

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
    
    await login(formData.email,formData.password)

    setFormData({
        email : '',
        password : ''
    });
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
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
      <button disabled={loading} type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
