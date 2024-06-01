import React, { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';
import { fetchUserProfiles } from '../../Api/roleApi';

interface Profile {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const { user, token } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [newProfileName, setNewProfileName] = useState('');

  // GET de Perfis da conta
  useEffect(() => {
    const fetchProfiles = async () => {
      if (user?.user_id && token) {
        try {
          const data = await fetchUserProfiles(user.user_id, token);
          setProfiles(data);
        } catch (error) {
          console.error('Error fetching profiles:', error);
        }
      } else {
        console.warn('User ID or token is missing');
      }
    };

    fetchProfiles();
  }, [token, user?.user_id]);

  const handleCreateProfile = async () => {
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
        Selecione um perfil para continuar.
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
