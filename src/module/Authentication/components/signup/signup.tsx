import * as React from 'react';
import { Grid, Input, TextField, Button} from '@mui/material';
import './signup-styles.scss';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { signUp } from '../../AuthSlice';
import { Link, useNavigate } from 'react-router-dom';


const SignUp = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.Auth.user);
    const userList = useAppSelector(state => state.Auth.userList);
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [status, setStatus] = React.useState('');

    let local = localStorage.getItem('users');

    React.useLayoutEffect(()=> {
        if(user.loggedIn) {
            navigate('/dashboard')
        }
    });

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
        onSubmit: (values) => {
            let value = JSON.stringify(values, null, 2);
            dispatch(signUp(value));
            setLoading(true);
            localStorage.setItem('users', value);
            let timeid = setTimeout(() => {
                setLoading(false);
                local? setStatus('Success! Now sign to dashboard'):setStatus('Oops! it\'s a snap')
                clearTimeout(timeid);
            }, 2000);
        },
      });

    return(
        <>
        <Grid container >
            <Grid container>
                <Grid item xs={6} sm={6} lg={6} className='subcontainer-1'>
                    <Grid item>
                        <div className='welcome-heading'>
                            Welcome to <b style={{color:'#E48700'}}>Lorem</b> 
                        </div> 
                        <div className='welcome-heading-signup' style={{marginTop:'10px'}}>
                            Sign up
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={6} sm={6} lg={6} className='subcontainer-2'>
                    <Grid item>
                        <div className="welcome-signin-small">
                            Have an Account ?
                        </div>
                        <div className="signin-right" >
                            <Link to='/signin'>Sign in</Link>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <form onSubmit={formik.handleSubmit} className='signup-form'>
                    <Grid item style={{marginTop:'15px'}}>
                        <label className='label-style' htmlFor="email">Email address</label>
                        <TextField
                            disabled={loading}
                            className='signup-input'
                            id="email"
                            type="text"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='form-validation'>{formik.errors.email}</div>
                        ) : null}
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6} style={{marginTop:'15px'}}>
                            <label className='label-style' htmlFor="userName">Username</label>
                            <TextField 
                                disabled={loading}
                                className='signup-input'    
                                id="userName" 
                                type="text" {...formik.getFieldProps('userName')} />
                                {formik.touched.userName && formik.errors.userName ? (
                                <div className='form-validation'>{formik.errors.userName}</div>
                            ) : null}     
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} style={{marginTop:'15px'}}>
                                <label className='label-style' htmlFor="phone">Phone No.</label>
                                <TextField 
                                    disabled={loading}
                                    className='signup-input'                                
                                    id="phone" type="text" {...formik.getFieldProps('phone')} />
                                    {formik.touched.phone && formik.errors.phone ? (
                                    <div className='form-validation'>{formik.errors.phone}</div>
                                    ) : null}     
                            </Grid>
                    </Grid>
                    <Grid item style={{marginTop:'15px'}}>
                        <label className='label-style' htmlFor="password">Password</label>
                        <TextField 
                            disabled={loading}
                            className='signup-input'
                            id="password" type="text" {...formik.getFieldProps('password')} />
                            {formik.touched.password && formik.errors.password ? (
                            <div className='form-validation'>{formik.errors.password}</div>
                        ) : null}       
                    </Grid>     
                </form>
            </Grid>
            <Grid container className='form-submit-container' style={{marginTop:'30px'}}>
                <Button 
                    className='signup-submit-button'
                    variant="contained" 
                    size='large' onClick={
                            (e)=>{
                            formik.handleSubmit();
                            // formik.handleReset(e);
                        }
                        }>
                        {loading?'Signing up...':'Submit'}
                    </Button>
            </Grid>
            <Grid container style={{display:'flex', justifyContent:'center', paddingTop:'2px'}}>
                <div style={{color:'#E48700'}}>
                    {status}
                </div>
            </Grid>
        </Grid>
        </>
    );
};

export default SignUp;