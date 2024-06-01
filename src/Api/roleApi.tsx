// src/api/userApi.ts

import axios, { AxiosResponse } from 'axios';

const apiUrl: string | undefined = process.env.REACT_APP_LINK_API;

export const fetchUserProfiles = async (userId: string, token: string): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.get(`${apiUrl}/roles/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw error;
    }
};

export const createProfile = async (token: string, newProfileName: string, user_id: number): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await axios.post(
            `${apiUrl}/new_role`,
            {
                name: newProfileName,
                user_id: user_id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating profile:', error);
        throw error;
    }
};
