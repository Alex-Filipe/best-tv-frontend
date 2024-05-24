import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email === 'user@example.com' && password === 'password') {
      alert('Login successful');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={5} style={{ backgroundColor: '#87CEFA' }} />
      <Grid item xs={12} md={7} style={{ backgroundColor: 'white' }} container alignItems="center" justifyContent="center">
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            borderRadius={1}
            boxShadow={3}
          >
            <Typography variant="h4" component="h1" color="black" gutterBottom>
              BestTv
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Campo de Email */}
              <Typography
                variant="h6"
                gutterBottom
                textAlign="left"
                color="black"
                marginBottom="2%"
                fontSize="1.325rem"
                marginTop="1.75rem"
                fontWeight="600"
                sx={{
                  "@media (max-width: 1360px)": { fontSize: "1.125rem" },
                }}
              >
                E-mail:
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Digite aqui seu e-mail"
                type="email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                required
                inputProps={{ maxLength: 255 }}
                InputProps={{
                  style: { minHeight: "2.813rem", borderRadius: 12 },
                }}
              />

              {/* Campo de Senha */}
              <Typography
                variant="h6"
                gutterBottom
                textAlign="left"
                color="black"
                marginBottom="2%"
                fontSize="1.325rem"
                marginTop="1.75rem"
                fontWeight="600"
                sx={{
                  "@media (max-width: 1360px)": { fontSize: "1.125rem" },
                }}
              >
                Senha:
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Digite sua senha aqui"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                required
                inputProps={{ maxLength: 255 }}
                InputProps={{
                  style: { minHeight: "2.813rem", borderRadius: 12, marginBottom: "4%" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
              {/* Esqueci minha senha */}
              <Typography
                variant="body1"
                marginTop="6%"
                marginBottom="6%"
                onClick={handleShowForgotPassword}
                sx={{
                  fontSize: "1.125rem",
                  color: "#3A6647",
                  textDecoration: "underline",
                  textDecorationColor: "#3A6647",
                  cursor: "pointer",
                  "@media (max-width: 1360px)": { fontSize: "1rem" },
                }}
              >
                Esqueci minha senha
              </Typography>
              <Button type="submit" variant="contained" color="success" fullWidth>
                Criar conta
              </Button>
            </form>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
