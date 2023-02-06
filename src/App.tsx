import { Dashboard } from '@mui/icons-material';
import { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
// import './App.scss'
import Auth from './module/Authentication/Auth';
import { useAppSelector } from './store/hooks'; 

function App() {

  const navigate = useNavigate();

  const [count, setCount] = useState(0)
  const user = useAppSelector(state => state.Auth.user);

  // console.log('logged In : ', user.loggedIn);

  // if(user.loggedIn) {
  //   navigate('/dashboard')
  // }
  return (
    <div className="App">
        <Auth />
    </div>
  )
}

export default App
