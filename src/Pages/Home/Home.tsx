import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';

interface Profile {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const { user, token } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfileName, setNewProfileName] = useState('');

//   useEffect(() => {
//     // Função para buscar perfis do usuário
//     const fetchProfiles = async () => {
//       // Aqui você faria a requisição para sua API para buscar os perfis
//       const response = await fetch('/api/profiles', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       setProfiles(data);
//     };

//     fetchProfiles();
//   }, [token]);

  const handleCreateProfile = async () => {
    // Função para criar um novo perfil
    // const response = await fetch('/api/profiles', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify({ name: newProfileName })
    // });

    // if (response.ok) {
    //   const newProfile = await response.json();
    //   setProfiles([...profiles, newProfile]);
    //   setNewProfileName('');
    // }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {/* Bem-vindo, {user.name}! */}
      </Typography>
      <Box mt={4}>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <Box key={profile.id} mb={2}>
              <Typography variant="h6">{profile.name}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="h6">Você não tem perfis. Crie um novo perfil abaixo:</Typography>
        )}
      </Box>
      <Box mt={4} display="flex">
        <TextField
          label="Nome do Perfil"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          fullWidth
        />
        <Button onClick={handleCreateProfile} variant="contained" color="primary" sx={{ ml: 2 }}>
          Criar Perfil
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
