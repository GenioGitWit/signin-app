import * as React from 'react';
import { Grid } from '@mui/material';
import { useMatch, useLocation } from 'react-router-dom'
import './authStyle.scss';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';
import Dashboard  from '../Application/dashboard';

interface IAuth {

}

const Auth = () => {
    const location = useLocation();
    console.log('location : ', location);
    return(
        <>
        <Grid container className="auth-container-out">
            <Grid item sm={6} lg={6} className='auth-item-left'>

            </Grid>
            <Grid item sm={6} lg={6} className='auth-item-right'>

            </Grid>
            <div className='signup-container-out'>
                {
                    (location.pathname === '/signup' || location.pathname==='/') && <SignUp/>
                }
                {
                    location.pathname === '/signin' && <SignIn />
                }
                {
                    location.pathname === '/dashboard' && <Dashboard/>
                }
            </div>
        </Grid> 
        </>
    );
};

export default Auth;