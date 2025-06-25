import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useBaseUrl } from '../../../BaseUrlContext';

const LoginForm = () => {
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSavedLogin, setIsCheckingSavedLogin] = useState(true); // Flag for auto-login state

  // Auto-login check on first load
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
      loginUser(savedEmail, savedPassword, true); // auto-login flag
    } else {
      setIsCheckingSavedLogin(false); // Done checking, show login form
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setIsLoading(true);

    // Handle Remember Me storage
    if (rememberMe) {
      localStorage.setItem('savedEmail', email);
      localStorage.setItem('savedPassword', password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
      localStorage.setItem('rememberMe', 'false');
    }

    await loginUser(email, password);
  };

  const loginUser = async (loginEmail, loginPassword, auto = false) => {
    setError('');
    if (!auto) setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/user/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userEmail', data.email);
        navigate('/dashboard');
      } else if ([401, 403].includes(response.status)) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      if (!auto) setIsLoading(false);
      setIsCheckingSavedLogin(false);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  // Prevent login form flicker during auto-login
  if (isCheckingSavedLogin) {
    return (
      <div className={styles.loadingScreen}>
        <p>Checking saved login...</p>
        {/* You can replace this with a spinner if you'd like */}
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <button
          className={styles.homebutton}
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? styles.inputError : styles.neonInput}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? styles.inputError : styles.neonInput}
              required
            />
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button
            type="submit"
            className={`${styles.loginButton} ${styles.neonButton}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
