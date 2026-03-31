import api from './api'

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export const registerRequest = async (data) => {
  const res = await api.post('/auth/register', data)
  return res.data
}

export const registerOrganizerRequest = async (data) => {
  const res = await api.post('/auth/register-organizer', data)
  return res.data
}

export const updateProfile = async (data) => {
  const res = await api.put('/auth/me', data)
  return res.data.user
}

export const loginRequest = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data;
}
