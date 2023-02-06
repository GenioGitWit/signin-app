import * as React from 'react';
import './signin-styles.scss';
import { Button, Grid, TextField } from '@mui/material';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { signIn, signInSimple } from '../../AuthSlice';
import googleSVG from '../../../../assets/google.svg'
import facebookSVG from '../../../../assets/facebook.svg'
import appleSVG from '../../../../assets/apple.svg'

const SignIn = () => {
    
    const [loading, setLoading] = React.useState(false);
    
    const user = useAppSelector(state => state.Auth.user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(()=> {
        if(user.loggedIn) {
            navigate('/dashboard')
        }
    }); //If user is logged In, back navigation won't work

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({

          email: Yup.string().email('Invalid email address').required(),
          password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
        //   alert(JSON.stringify(values, null, 2));
            let value = JSON.stringify(values, null, 2);
            dispatch(signInSimple(value)); 
            setLoading(true); 
            setTimeout(() => {
                setLoading(false); 
                user.loggedIn ? navigate('/dashboard') : null;
            }, 2000) ;  //logs user details and redirect to dashboard
        },
      });

    return(
        <>
        <Grid container>
            <Grid container>
                <Grid item xs={6} sm={6} lg={6} className='subcontainer-1'>
                    <Grid item>
                        <div className='welcome-heading' >
                            Welcome to <b style={{color:'#E48700'}}>Lorem</b> 
                        </div>
                        <div className='welcome-heading-signin' style={{marginTop:'10px'}}>
                            Sign In
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={6} sm={6} lg={6} className='subcontainer-2'>
                    <Grid item>
                        <div className="welcome-signup-small">
                            No Account?
                        </div>
                        <div className="signup-right">
                            <Link to='/signup'>Sign up</Link>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <form onSubmit={formik.handleSubmit} className='signin-form'>
                    <Grid  item style={{marginTop:'15px'}}>
                        <label className='label-style' htmlFor="email">First Name or Email Address</label>
                        <TextField 
                            className='signin-input'    
                            id="email" type="text" {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email ? (
                            <div className='form-validation'>{formik.errors.email}</div>
                        ) : null}  
                    </Grid>
                    <Grid  item style={{marginTop:'15px'}}>
                        <label className='label-style' htmlFor="password">Password</label>
                        <TextField 
                            className='signin-input'    
                            id="password" type="text" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                            <div className='form-validation'>{formik.errors.password}</div>
                        ) : null}     
                        <Grid item style={{display:'flex', justifyContent:'flex-end'}}>
                            <Link to='/signin' className='forget-password'>forget password?</Link>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid container className='form-submit-container' style={{marginTop:'30px'}}>
                <Button 
                    className='signin-submit-button'
                    variant="contained" 
                    size='large' onClick={()=>{
                    formik.handleSubmit();
                    }}
                >
                    {loading ? "Loading...":"Submit"}
                </Button>
            </Grid>
            <Grid container style={{marginTop:'30px'}}>
                <Grid item xs={8}>
                    <img src={googleSVG} alt='google' /> {' '} <b style={{color:'#E48700'}}>Sign-in with Google</b>
                </Grid>
                <Grid item xs={2}>
                    <img src={facebookSVG} alt='facebook'/>
                </Grid>
                <Grid item xs={2}> 
                    <img src={appleSVG} alt='appple'/>                   
                </Grid>
            </Grid>
        </Grid>
        </>
    );
};

export default SignIn;