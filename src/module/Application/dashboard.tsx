import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom'; 
import { logout } from '../Authentication/AuthSlice';

const Dashboard = () => {

    const user = useAppSelector(state => state.Auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return(
        <Grid container style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Grid item>
                <h2>Hello!  {user.email?.split('@')[0]}</h2>    
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={()=>{
                    dispatch(logout());
                    setTimeout(() => {
                        navigate('/signin');
                    }, 1000);
                }}>Logout</Button>
            </Grid>
        </Grid>
    );
};

export default Dashboard;