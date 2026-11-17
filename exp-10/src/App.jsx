import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="app-container">
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;
