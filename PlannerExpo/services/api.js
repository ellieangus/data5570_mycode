// API service for communicating with Django backend
const API_BASE_URL = 'https://farm-flights-cruises-left.trycloudflare.com/api'; // Use Cloudflare tunnel for deployed app

class ApiService {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async put(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async delete(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    // DELETE requests might return no content
    try {
      return response.json();
    } catch {
      return null;
    }
  }
}

export const apiService = new ApiService();

// Task API endpoints
export const tasksAPI = {
  getAll: () => apiService.get('/tasks/'),
  create: (taskData) => apiService.post('/tasks/', taskData),
  update: (id, taskData) => apiService.put(`/tasks/${id}/`, taskData),
  delete: (id) => apiService.delete(`/tasks/${id}/`),
};

// Habit API endpoints
export const habitsAPI = {
  getAll: () => apiService.get('/habits/'),
  create: (habitData) => apiService.post('/habits/', habitData),
  update: (id, habitData) => apiService.put(`/habits/${id}/`, habitData),
  delete: (id) => apiService.delete(`/habits/${id}/`),
};