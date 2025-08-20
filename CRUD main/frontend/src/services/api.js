import axios from "axios"

const API_BASE = 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_BASE,
   
});

// attach token to every request

api.interceptors.request.use((config) => {
 const token = localStorage.getItem("token")
 console.log(token)
 if(token){
    config.headers.Authorization = `${token}`

    console.log(token)
  }
  return config
})

export const authapi = {
    register: (data) => api.post("auth/register" , data),
    login: (data) => api.post("auth/login" , data),
}

export const itemsApi = {
  list: (params) => api.get("/items", { params }),
  get: (id) => api.get(`/items/${id}`),
  create: (data) => api.post("/items", data),
  update: (id, data) => api.put(`/items/${id}`, data),
  remove: (id) => api.delete(`/items/${id}`)
};

export default api;