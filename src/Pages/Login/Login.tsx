import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createAccountUser, loginUser } from '../../Api/loginApi';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [error, setError] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showCreateAccount, setShowCreateAccount] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
    setShowCreateAccount(false);
    setName("");
    setEmail("");
    setPassword("");
    setBirthDate("");
  };

  const handleShowCreateAccount = () => {
    setShowCreateAccount(!showForgotPassword);
    setShowLogin(false);
    setShowForgotPassword(false);
    setName("");
    setEmail("");
    setPassword("");
    setBirthDate("");
  };

  const handleShowLoginAccount = () => {
    setShowLogin(true);
    setShowForgotPassword(false);
    setShowCreateAccount(false);
    setName("");
    setEmail("");
    setPassword("");
    setBirthDate("");
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

  const handleSubmitCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      password: password,
      dateBirth: birthDate
    };
    createAccountUser(formData)
      .then((response) => {
        handleShowLoginAccount();
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
            {showLogin &&
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%" }}>
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
                <Button type="submit" variant="contained" color="success" fullWidth style={{marginTop: "6%"}}>
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
                <Button onClick={handleShowCreateAccount} variant="contained" color="primary" fullWidth>
                  Criar conta
                </Button>
              </form>
            }
            {showCreateAccount &&
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
                  value={name}
                  onChange={handleNameChange}
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
                  value={birthDate}
                  onChange={handleBirthDateChange}
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
                  <Button onClick={handleShowLoginAccount} variant="contained" color="primary" style={{ width: "75%", marginTop: "6%", alignItems: "center" }}>
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
