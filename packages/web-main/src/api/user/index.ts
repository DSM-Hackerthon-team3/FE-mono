import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { instance } from "../axios";
import { AuthResponse } from "./type";
import { saveToken, setCookies } from "../axios";
import { useNavigate } from "react-router-dom";

interface UserRegisterProps {
  id: string;
  password: string;
  schoolLevel: string;
  gender: string;
}

interface AdminRegisterProps {
  id: string;
  password: string;
  position: string;
  gender: string;
}

export const useUserRegister = () => {
  const navigate = useNavigate();
  return useMutation<AuthResponse, AxiosError, UserRegisterProps>({
    mutationFn: async ({ id, password, schoolLevel, gender }) => {
      const response = await instance.post<AuthResponse>('/user/register', {
        id,
        password,
        schoolLevel,
        gender,
      });
      return response.data;
    },
    onSuccess: async () => {
      navigate('/login/student');
    },
  });
};

export const useAdminRegister = () => {
  const navigate = useNavigate();
  return useMutation<AuthResponse, AxiosError, AdminRegisterProps>({
    mutationFn: async ({ id, password, position, gender }) => {
      const response = await instance.post<AuthResponse>('/admin/register', {
        id,
        password,
        position,
        gender,
      });
      return response.data;
    },
    onSuccess: async () => {
      navigate('/login/employee');
    },
  });
};

interface UserLoginProps {
  id: string;
  password: string;
}

export const useUserLogin = () => {
  return useMutation<AuthResponse, AxiosError, UserLoginProps>({
    mutationFn: async ({ id, password }) => {
      const response = await instance.post<AuthResponse>('/user/login', {
        id,
        password,
      });
      return response.data;
    },
    onSuccess: async (res) => {
      saveToken(res.accessToken, null);
      setCookies('authority', 'user', {
        path: '/',
        secure: true,
        sameSite: 'none',
        domain: import.meta.env.VITE_USER_COOKIE_DOMAIN,
      });
      window.location.href = 'http://localhost:3001/';
    },
  });
};

export const useAdminLogin = () => {
  return useMutation<AuthResponse, AxiosError, UserLoginProps>({
    mutationFn: async ({ id, password }) => {
      const response = await instance.post<AuthResponse>('/admin/login', {
        id,
        password,
      });
      return response.data;
    },
    onSuccess: async (res) => {
      saveToken(res.accessToken, null);
      setCookies('authority', 'admin', {
        path: '/',
        secure: true,
        sameSite: 'none',
        domain: import.meta.env.VITE_ADMIN_COOKIE_DOMAIN,
      });
      window.location.href = 'http://localhost:3002/';
    },
  });
};