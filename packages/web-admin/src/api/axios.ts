import axios, { AxiosError, AxiosInstance } from 'axios'
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const saveToken = (accessToken: string, refreshToken: string) => {
    cookie.set('access_token', accessToken);
    cookie.set('refresh_token', refreshToken);
};

const BASEURL = import.meta.env.VITE_BASE_URL

export const authInstance = axios.create({
  baseURL: BASEURL,
})

export const instance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const refreshInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
})

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = cookie.get('access_token')
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers['ngrok-skip-browser-warning'] = true
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

refreshInstance.interceptors.request.use(
  (config) => {
    const refreshToken = cookie.get('refresh_token')
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response
      if (status === 401) {
        const refreshToken = cookie.get('refresh_token')
        try {
          await axios
            .post(`${BASEURL}user/refresh`, null, {
              headers: {
'X-Refresh-Token': `${refreshToken}`,
                'ngrok-skip-browser-warning': 'true',
              },
            })
            .then((response) => {
              const data = response.data
              cookie.set('access_token', data.accessToken)
              cookie.set('refresh_token', data.refreshToken)
            })
            .catch(() => {
              window.location.href = '/'
              cookie.remove('access_token')
              cookie.remove('refresh_token')
            })
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }
    }
    return Promise.reject(error)
  },
)