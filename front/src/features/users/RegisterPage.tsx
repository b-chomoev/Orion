import React, { useState } from 'react';
import { RegisterMutation } from '../../types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError } from './usersSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from './usersThunks';
import FileInput from '../../components/FileInput/FileInput';

const initialState = {
  email: '',
  displayName: '',
  avatar: null,
  password: '',
}

const regEmail = /^(\w+[-.]?\w+)@(\w+)+([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();
  const [error, setError] = useState<{ email?: string }>({});
  const [form, setForm] = useState<RegisterMutation>(initialState);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      if (regEmail.test(value)) {
        setError(prevState => ({...prevState, 'email': ''}));
      } else {
        setError(prevState => ({...prevState, 'email': 'Invalid email format'}));
      }
    }

  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(register(form)).unwrap();
      navigate('/');
    } catch (e) {
      console.error('Failed to register:', e);
    }
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setForm(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }))
    }
  }

  const getFieldError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        {/*{loginError && (*/}
        {/*  <Alert severity="error" sx={{mt: 3, width: '100%'}}>*/}
        {/*    {loginError.error}*/}
        {/*  </Alert>*/}
        {/*)}*/}

        <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
          <Grid container direction={'column'} size={12} spacing={2}>

            <Grid size={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={form.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email')) || Boolean(error.email)}
                helperText={getFieldError('email') || error.email}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                value={form.displayName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('displayName'))}
                helperText={getFieldError('displayName')}
              />
            </Grid>

            <Grid size={12}>
              <FileInput name='avatar' label='Avatar' onGetFile={fileEventChangeHandler} />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <NavLink to={'/register'}>
                Doesn't have an account yet? Sign up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
