/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { useEffect } from "react";
import { cookie } from "./api/axios";

function App() {
  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const token = cookie.get('access_token');
      if (token) {
        try {
          // JWT 토큰 디코딩해서 역할 확인
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userRole = payload.role;

          if (userRole === 'admin') {
            window.location.href = 'http://localhost:3002/';
          } else {
            window.location.href = 'http://localhost:3001/';
          }
        } catch (error) {
          // 토큰이 잘못된 경우 제거
          cookie.remove('access_token');
        }
      }
    };

    checkTokenAndRedirect();
  }, []);

  return <RouterProvider router={Router} />;
}

export default App;