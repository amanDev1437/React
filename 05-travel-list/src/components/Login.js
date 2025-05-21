import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import "./css/Login.css";
export default function Login() {
  const [email, setEmail] = useState("saksham123@gmail.com");
  const [password, setPassword] = useState(321);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="login">
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
}
