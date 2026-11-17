import { useState } from 'react';

function Login({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in successfully with: ${email}`);
  };

  return (
    <div className="form-card">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="switch-text">
        Don't have an account?{' '}
        <button type="button" className="switch-btn" onClick={onSwitch}>
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;
