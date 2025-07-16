import { NextResponse } from 'next/server'
import { generateToken } from '@/lib/jwt'
import { AuthResponse } from '@/types/auth'

export async function POST(request: Request) {
    const { username, password } = await request.json()

    if (username === 'admin' && password === 'password') {
        const user = { id: '1', username }
        const token = generateToken(user)
        return NextResponse.json({ success: true, token } satisfies AuthResponse)
    }

    return NextResponse.json(
        { success: false, error: 'Неправильный логин или пароль' } satisfies AuthResponse,
        { status: 401 }
    )
}