import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createAccountUser, loginUser } from '../../Api/loginApi';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthDate: ''
  });
  const [error, setError] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [view, setView] = useState<'login' | 'createAccount' | 'forgotPassword'>('login');


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const switchView = (newView: 'login' | 'createAccount' | 'forgotPassword') => {
    setView(newView);
    setFormData({ email: '', password: '', name: '', birthDate: '' });
    setError({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password
    };
    loginUser(data)
      .then((response) => {
        login(response);
        navigate('/home');
      })
      .catch((error) => {
        setError(error.response.data.errors);
      });
  };

  const handleSubmitCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dateBirth: formData.birthDate
    };
    createAccountUser(data)
      .then((response) => {
        switchView('login');
        navigate('/');
      })
      .catch((error) => {
        setError(error.response.data.errors);
      });
  };

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
            {view === "login" &&
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "80%" }}>
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                <Button type="submit" variant="contained" color="success" fullWidth style={{marginTop: "6%"}}>
                  Login
                </Button>

                {/* Esqueci minha senha */}
                <Typography
                  variant="body1"
                  marginTop="6%"
                  marginBottom="6%"
                  onClick={() => switchView('forgotPassword')}
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
                <Button onClick={() => switchView('createAccount')} variant="contained" color="primary" fullWidth>
                  Criar conta
                </Button>
              </form>
            }
            {view === "createAccount" &&
              <form onSubmit={handleSubmitCreateAccount} style={{ display: "flex", flexDirection: "column", width: "80%" }}>
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

                {/* Campo de Nome */}
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
                  Nome:
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Digite seu nome"
                  type="text"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 255 }}
                  InputProps={{
                    style: { minHeight: "2.813rem", borderRadius: 12 },
                  }}
                />
                {/* Mensagem de Erro para Name (erro.algo) */}
                {error.Name && (
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
                    {error.Name}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

                {/* Campo de Data de Nascimento */}
                <Typography
                  variant="h6"
                  gutterBottom
                  textAlign="left"
                  color="black"
                  marginBottom="2%"
                  fontSize="1.325rem"
                  marginTop="1rem"
                  fontWeight="600"
                  sx={{
                    "@media (max-width: 1360px)": { fontSize: "1.125rem" },
                  }}
                >
                  Data de Nascimento:
                </Typography>
                <TextField
                  variant="outlined"
                  type="date"
                  fullWidth
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                  InputProps={{
                    style: { minHeight: "2.813rem", borderRadius: 12 },
                  }}
                />
                {/* Mensagem de Erro para Data de Nascimento (erro.algo) */}
                {error.DateBirth && (
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
                    {error.DateBirth}
                  </Typography>
                )}

                <div style={{ alignItems: "center", display: "flex", flexDirection: "column"}}>
                  {/* Botão confirmar */}
                  <Button type="submit" variant="contained" color="success" style={{ marginBottom: "10px", width: "100%", marginTop: "6%" }}>
                    Confirmar
                  </Button>

                  {/* Botão criar conta */}
                  <Button onClick={() => switchView('login')} variant="contained" color="primary" style={{ width: "75%", marginTop: "6%", alignItems: "center" }}>
                    Voltar
                  </Button>
                </div>
              </form>}
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
