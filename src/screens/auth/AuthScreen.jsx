import { useState } from 'react';
import SignUp from './Signup';
import Login from './Login';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-screen">
      <div className="auth-toggle">
        <button onClick={() => setIsLogin(true)} disabled={isLogin}>
          Login
        </button>
        <button onClick={() => setIsLogin(false)} disabled={!isLogin}>
          Sign Up
        </button>
      </div>

      {isLogin ? <Login /> : <SignUp />}
    </div>
  );
}
