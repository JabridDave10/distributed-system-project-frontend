import axios from 'axios';

  // URL base del backend - detectar automáticamente el entorno
const getBaseURL = () => {
  // Si hay una variable de entorno definida, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Si estamos en desarrollo (localhost), usar localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  
  // En producción, usar la URL del backend en Render
  return 'https://distributed-systems-project-backend.onrender.com';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Importante para incluir cookies HttpOnly
});

// Log para debugging
console.log('🔍 API Client initialized with baseURL:', getBaseURL());

// Interceptor para agregar token de autorización si está disponible
api.interceptors.request.use(
  (config) => {
    // Solo agregar el token del localStorage si no hay cookies
    // Esto permite que las cookies HttpOnly tengan prioridad
    const token = localStorage.getItem('auth_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log para debugging
    console.log('🔍 API Request:', {
      url: config.url,
      method: config.method,
      hasAuthHeader: !!config.headers.Authorization,
      withCredentials: config.withCredentials
    });
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas de error
api.interceptors.response.use(
  (response) => {
    // Log para debugging de respuestas exitosas
    console.log('✅ API Response:', {
      url: response.config.url,
      status: response.status,
      hasData: !!response.data
    });
    return response;
  },
  (error) => {
    // Log para debugging de errores
    console.log('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      // Token expirado o inválido - limpiar localStorage y redirigir al login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
