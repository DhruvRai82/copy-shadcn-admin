/* eslint-disable no-console */
import axios from 'axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().auth.accessToken
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data || '')
    return config
})

api.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} => ${response.status}`)
        return response
    },
    (error) => {
        const message = error.response?.data?.message || 'An error occurred'
        console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} => ${error.response?.status}`, message)

        if (error.response?.status === 401) {
            console.warn('[API] 401 Unauthorized detected. Resetting auth state.')
            // useAuthStore.getState().auth.reset()
            // window.location.href = '/sign-in'
            toast.error('Session expired or unauthorized. Please logs check.')
        }
        return Promise.reject(error)
    }
)

export default api
