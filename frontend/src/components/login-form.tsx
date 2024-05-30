import { Alert, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface Inputs {
  email: string;
  password: string;
}

const UserLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: 'user@test.com',
      password: 'Secret1',
    },
  });

  const onSubmit = async (data: Inputs) => {
    setIsLoading(true);
    setError('');

    if (!data.email) {
      setError('Please enter email');
      setIsLoading(false);
      return;
    }

    if (!data.password) {
      setError('Please enter password');
      setIsLoading(false);
      return;
    }

    try {
      if (data.email === 'user@test.com' && data.password === 'Secret1') {
        setTimeout(() => {
          navigate('/user');
          setIsLoading(false);
        }, 3000);
      } else if (data.email === 'admin@test.com' && data.password === 'Secret1') {
        setTimeout(() => {
          navigate('/admin');
          setIsLoading(false);
        }, 3000);
      } else {
        setError('Wrong email address/password');
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setError('An error occurred during login');
    }
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <FaEye
                      cursor="pointer"
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <FaEyeSlash
                      cursor="pointer"
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button disabled={isLoading} type="submit" variant="contained">
            Sign in
          </Button>
        </Stack>
      </form>
      <Alert color="success">
        For admin login{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          admin@test.com
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>
      <Alert color="success">
        For user login{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
        user@test.com
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>
    </Stack>
  );
};

export default UserLogin;
