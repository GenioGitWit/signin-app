import { Dashboard } from '@mui/icons-material';
import { useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import './App.scss'
import Auth from './module/Authentication/Auth';
import { useAppSelector } from './store/hooks'; 

function App() {

  const user = useAppSelector(state => state.Auth.user);

  return (
    <div className="App">
        <Auth />
    </div>
  )
}

export default App
