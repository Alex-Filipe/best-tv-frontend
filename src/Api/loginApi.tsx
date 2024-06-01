import axios, { AxiosResponse } from "axios";

interface User {
  email: string;
  password: string;
}

interface UserAccount {
  name: string;
  email: string;
  password: string;
  dateBirth: string;
}

export const loginUser = async (user: User): Promise<any> => {
  const apiUrl: string | undefined = process.env.REACT_APP_LINK_API;

  const options = {
    method: 'POST',
    url: `${apiUrl}/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: user
  };


    const response: AxiosResponse<any> = await axios.request(options);
    return response.data;
};

export const createAccountUser = async (user: UserAccount): Promise<any> => {
  const apiUrl: string | undefined = process.env.REACT_APP_LINK_API;

  const options = {
    method: 'POST',
    url: `${apiUrl}/new_user`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: user
  };


    const response: AxiosResponse<any> = await axios.request(options);
    return response.data;
};