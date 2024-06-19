import axios from 'axios';

export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
  console.log('Token armazenado no localStorage:', token);
};

export const saveUserIdToLocalStorage = (userId) => {
  localStorage.setItem('userId', userId);
  console.log('O id do usuario foi armazenado, ', userId);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const [, payloadBase64] = token.split('.');
    const payloadString = atob(payloadBase64);
    const payload = JSON.parse(payloadString);
    return payload.userId;
  }
  return null;
};

export const getUserInfoFromServer = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const [, payloadBase64] = token.split('.');
      const payloadString = atob(payloadBase64);
      const payload = JSON.parse(payloadString);
      const userId = payload.userId;
      const response = await axios.get(`http://localhost:3000/users/get/${userId}`);
      const userData = response.data;
      return { userId: userData.id, isAdmin: userData.isAdmin === 1, ...userData };
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
      return { userId: null, isAdmin: false };
    }
  }
  return { userId: null, isAdmin: false };
};

export const isAdmin = async () => {
  const userInfo = await getUserInfoFromServer();
  return userInfo.isAdmin;
};
