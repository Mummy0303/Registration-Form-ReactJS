import React, { useState, useEffect } from "react";

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const usernameRegex = /^[A-Za-z0-9]{3,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!usernameRegex.test(values.username)) {
      errors.username =
        "Username should be 3-16 characters and shouldn't include any special character!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 10 characters!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
    }
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match!";
    }
    return errors;
  };

  return (
    <>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success">
          <h1 className="success-title">Signed in successfully</h1>
        </div>
      ) : (
        Object.keys(formErrors).length === 0 && isSubmit
      )}
      {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div className="field">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Choose a username"
            value={formValues.username}
            onChange={handleChange}
          />
          <p className="errors">{formErrors.username}</p>
        </div>
        <div className="field">
          <label htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="text"
            autoComplete="off"
            placeholder="Enter your email"
            value={formValues.email}
            onChange={handleChange}
          />
          <p className="errors">{formErrors.email}</p>
        </div>
        <div className="field">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
          />
          <p className="errors">{formErrors.password}</p>
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">PASSWORD CONFIRMATION</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <p className="errors">{formErrors.confirmPassword}</p>
        </div>
        <button className="signup-btn">Sign Up</button>
        <p>
          Already have an account?{" "}
          <button className="switch-btn">Sign In</button>
        </p>
      </form>
    </>
  );
};

export default Register;
