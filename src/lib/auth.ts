import { AuthResponse } from '@/types/auth.d';

const saveTokenToLocalStorage = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token)
        // Можно добавить время истечения токена
        localStorage.setItem('authTokenExpiry',
            (Date.now() + 3600 * 1000).toString() // 1 час
        )
    }
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        const data: AuthResponse = await response.json()

        if (data.success && data.token) {
            // Вызываем функцию сохранения токена
            saveTokenToLocalStorage(data.token)
        }

        return data
    } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: 'Network error' }
    }
}

export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') return false

    const token = localStorage.getItem('authToken')
    const expiry = localStorage.getItem('authTokenExpiry')

    if (!token || !expiry) return false

    return Date.now() < parseInt(expiry)
}