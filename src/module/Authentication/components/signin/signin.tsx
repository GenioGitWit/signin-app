import * as React from 'react';
import './signin-styles.scss';
import { Button, Grid, TextField } from '@mui/material';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { signIn, signInSimple } from '../../AuthSlice';

const SignIn = () => {
    
    const signedIn = useAppSelector(state => state.Auth.user);
    console.log('Logged in user : ', signedIn);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({

          email: Yup.string().email('Invalid email address').required(),
          password: Yup.string().required('Password is required')
        }),
        onSubmit: values => {
        //   alert(JSON.stringify(values, null, 2));
            let value = JSON.stringify(values, null, 2);
            dispatch(signInSimple(value));  
            navigate('/dashboard');
            // localStorage.setItem('authUser', value);
        },
      });

    return(
        <>
        <Grid container>
            <Grid container>
                <Grid item lg={6}>
                    <div className='welcome-heading '>
                        Welcome to Lorem 
                    </div>
                    <div className='welcome-heading-signin'>
                        Sign In
                    </div>
                </Grid>
                <Grid item lg={6}>
                    <div className="welcome-signup-small">
                        No Account
                    </div>
                    <div className="signup-right">
                        <Link to='/signup'>Sign up</Link>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <form onSubmit={formik.handleSubmit} className='signin-form'>
                    <Grid  item style={{marginTop:'15px'}}>
                        <label htmlFor="email">First Name or Email Address</label>
                        <TextField 
                            className='signin-input'    
                            id="email" type="text" {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}  
                    </Grid>
                    <Grid  item style={{marginTop:'15px'}}>
                        <label htmlFor="password">Password</label>
                        <TextField 
                            className='signin-input'    
                            id="password" type="text" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}     
                    </Grid>
                </form>
            </Grid>
            <Grid container className='form-submit-container' style={{marginTop:'30px'}}>
                <Button variant="contained" size='large' onClick={()=>{
                    formik.handleSubmit();
                    }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
        </>
    );
};

export default SignIn;