import * as React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../store/hooks';

const Dashboard = () => {

    const user = useAppSelector(state => state.Auth.user);

    return(
        <Grid>
            Hello!  {user.email?.split('/')[0]}
        </Grid>
    );
};

export default Dashboard;