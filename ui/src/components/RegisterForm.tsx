import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const MIN_PASSWORD_LENGTH = 6;

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
    }
    return null;
  };

  const validatePasswordMatch = (pwd: string, confirmPwd: string): string | null => {
    if (confirmPwd && pwd !== confirmPwd) {
      return "Passwords do not match";
    }
    return null;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
    
    // Also validate match if confirm password is already entered
    if (confirmPassword) {
      setConfirmPasswordError(validatePasswordMatch(newPassword, confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(validatePasswordMatch(password, newConfirmPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate password length
    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    
    // Validate password match
    const matchError = validatePasswordMatch(password, confirmPassword);
    if (matchError) {
      setConfirmPasswordError(matchError);
      return;
    }
    
    try {
      await register(name, email, password, confirmPassword);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </label>
      <label>
        Password
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          className={passwordError ? "input-error" : ""}
        />
        {passwordError && <span className="field-error">{passwordError}</span>}
        {!passwordError && password && (
          <span className="field-success">Password length is valid</span>
        )}
      </label>
      <label>
        Confirm Password
        <input
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          required
          minLength={MIN_PASSWORD_LENGTH}
          className={confirmPasswordError ? "input-error" : ""}
        />
        {confirmPasswordError && <span className="field-error">{confirmPasswordError}</span>}
        {!confirmPasswordError && confirmPassword && password === confirmPassword && (
          <span className="field-success">Passwords match</span>
        )}
      </label>
      <button 
        type="submit" 
        disabled={!!passwordError || !!confirmPasswordError || !password || !confirmPassword}
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
