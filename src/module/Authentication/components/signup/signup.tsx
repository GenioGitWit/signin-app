import * as React from 'react';
import { Grid, Input, TextField, Button} from '@mui/material';
import './signup-styles.scss';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { signUp } from '../../AuthSlice';
import { Link } from 'react-router-dom';


const SignUp = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.Auth.user);
    const userList = useAppSelector(state => state.Auth.userList);

    console.log('loggedIn user : ', user);
    console.log('signup user list : ', userList);

    const formik = useFormik({
        initialValues: {
          userName: '',
          password: '',
          email: '',
          phone: ''
        },
        validationSchema: Yup.object({
          userName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Username Required'),
          email: Yup.string().email('Invalid email address').required('Email required'),
          phone: Yup.string().max(10, "Must be 10 digits").required('Phone required'),
          password: Yup.string().required('password required')
        }),
        onSubmit: values => {
            let value = JSON.stringify(values, null, 2)
            console.log(value);
            dispatch(signUp(value));
        //   alert(JSON.stringify(values, null, 2));
        },
      });

    return(
        <>
        <Grid container >
            <Grid container>
                <Grid item lg={6}>
                    <div className='welcome-heading '>
                        Welcome to Lorem 
                    </div>
                    <div className='welcome-heading-signup'>
                        Sign up
                    </div>
                </Grid>
                <Grid item lg={6}>
                    <div className="welcome-signin-small">
                        Have an Account ?
                    </div>
                    <div className="signin-right">
                        <Link to='/signin'>Sign in</Link>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <form onSubmit={formik.handleSubmit} className='signup-form'>
                    <Grid item style={{marginTop:'15px'}}>
                        <label htmlFor="email">Email address</label>
                        <TextField
                            className='signup-input'
                            id="email"
                            type="text"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </Grid>
                    <Grid container>
                        <Grid item lg={6} style={{marginTop:'15px'}}>
                            <label htmlFor="userName">Username</label>
                            <TextField 
                                className='signup-input'    
                                id="userName" 
                                type="text" {...formik.getFieldProps('userName')} />
                                {formik.touched.userName && formik.errors.userName ? (
                                <div>{formik.errors.userName}</div>
                            ) : null}     
                            </Grid>

                            <Grid item lg={6} style={{marginTop:'15px'}}>
                                <label htmlFor="phone">Phone No.</label>
                                <TextField 
                                    className='signup-input'                                
                                    id="phone" type="text" {...formik.getFieldProps('phone')} />
                                    {formik.touched.phone && formik.errors.phone ? (
                                    <div>{formik.errors.phone}</div>
                                    ) : null}     
                            </Grid>
                    </Grid>
                    <Grid item style={{marginTop:'15px'}}>
                        <label htmlFor="password">Password</label>
                        <TextField 
                            className='signup-input'
                            id="password" type="text" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}       
                    </Grid>     
                </form>
            </Grid>
            <Grid container className='form-submit-container' style={{marginTop:'30px'}}>
                <Button 
                    variant="contained" 
                    size='large' onClick={()=>{formik.handleSubmit()}}>
                        Submit
                    </Button>
            </Grid>
        </Grid>
        </>
    );
};

export default SignUp;