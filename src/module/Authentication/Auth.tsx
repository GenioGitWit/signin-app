import * as React from 'react';
import { Grid } from '@mui/material';
import { useMatch, useLocation } from 'react-router-dom'
import './authStyle.scss';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';
import Dashboard  from '../Application/dashboard';
import glyphLeft from '../../assets/glyph-left.svg'
import glyphRight from '../../assets/glyph-right.svg'
import { useAppSelector } from '../../store/hooks';  

interface IAuth {

}

const Auth = () => {

    const location = useLocation();
    console.log('location : ', location);


    return(
        <>
        <Grid container className="auth-container-out">
            <Grid item sm={6} lg={6} className='auth-item-left'>
                <img src={glyphLeft} width={269} height={256} alt="left-glyph" />
            </Grid>
            <Grid item sm={6} lg={6} className='auth-item-right'>
                <img src={glyphRight} width={450} height={450} alt="right-glyph" />
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