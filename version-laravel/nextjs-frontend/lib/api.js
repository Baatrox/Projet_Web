const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function apiRequest(path, options = {}) {
  const { token, ...fetchOptions } = options;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const storedToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }

  const isFormData = options.body instanceof FormData;
  if (isFormData) {
    delete headers['Content-Type'];
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...fetchOptions,
      headers,
    });

    if (!res.ok) {
      // Try to parse error response as JSON
      let errorData = {};
      try {
        errorData = await res.json();
      } catch {
        // Fallback if response is not JSON
      }
      
      const errorMessage = errorData.message || errorData.error || `Erreur ${res.status}`;
      throw new Error(errorMessage);
    }

    // Handle empty responses
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`API request failed for ${path}:`, error);
    throw error;
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}
