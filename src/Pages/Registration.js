import React, { useState } from 'react';
import Parse from 'parse';
import '../Style/RegistrationStyle.css'
const Registration = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = new Parse.User();
    user.set('username', email);
    user.set('password', password);
    user.set('email', email);
    user.set('lastName', lastName);
    user.set('firstName', firstName);
    user.set('middleName', middleName);
    user.set('role', 'user'); // Set user role

    try {
      await user.signUp();
      alert('Registration successful!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleRegister} className="registration-form">
        <h2>Register</h2>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          Middle Name:
          <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;