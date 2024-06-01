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
