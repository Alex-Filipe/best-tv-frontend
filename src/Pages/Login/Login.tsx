import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '../../Api/loginApi';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<any>({});
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
    const formData = {
      email: email,
      password: password
    };
    loginUser(formData)
      .then((response) => {
        console.log("cai aqui")
        login(response.data);
        navigate('/home');
      })
      .catch((error) => {
        setError(error.response.data.errors);
      });
  };
  console.log(error)



  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={5} style={{ backgroundColor: '#6A5ACD' }} />
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
              {/* Mensagem de Erro Geral (erro.algo)*/}
              {error.erro && (
                <Typography
                  color="#DF2C0F"
                  sx={{
                    wordWrap: "break-word",
                    fontSize: "1.125rem",
                    display: "block",
                    textAlign: "center",
                    fontWeight: 400,
                    marginTop: "5%",
                  }}
                >
                  {error.erro}
                </Typography>
              )}

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
              {/* Mensagem de Erro para Email (erro.algo) */}
              {error.Email && (
                <Typography
                  color="#DF2C0F"
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 400,
                    marginTop: "2%",
                    "@media (max-width: 1360px)": { fontSize: "0.75rem" },
                  }}
                >
                  {error.Email}
                </Typography>
              )}

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
              {error.Password && (
                <Typography
                  color="#DF2C0F"
                  sx={{
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    fontWeight: 400,
                    marginTop: "2%",
                    "@media (max-width: 1360px)": { fontSize: "0.75rem" },
                  }}
                >
                  {error.Password}
                </Typography>
              )}

              {/* Botão login */}
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

              {/* Botão criar conta */}
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
