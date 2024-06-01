import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';
import { createProfile, fetchUserProfiles } from '../../Api/roleApi';

interface Profile {
    id: number;
    name: string;
}

const Home: React.FC = () => {
    const { user, token } = useAuth();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [newProfileName, setNewProfileName] = useState('');

    // Função para buscar perfis
    const fetchProfiles = useCallback(async () => {
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
    }, [user?.user_id, token]);

    useEffect(() => {
        fetchProfiles();
    }, [token, user?.user_id, fetchProfiles]);

    const handleCreateProfile = async () => {
        if (token && newProfileName) {
            try {
                await createProfile(token, newProfileName, user.user_id);
                setNewProfileName('');
                fetchProfiles();
            } catch (error) {
                console.error('Error creating profile:', error);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Selecione um perfil para continuar
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
            {profiles.length < 4 && (
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
            )}
        </Container>
    );
};

export default Home;
