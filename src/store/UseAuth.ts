import {create} from 'zustand'
import {persist} from 'zustand/middleware'

interface AuthStoreState {
    isAuth: boolean
    setAuth: (isAuth: boolean) => void
    email: string
    setEmail: (email : string) => void
    reset: () => void;
}

const initialState = {
    isAuth: !!localStorage.getItem('access_token'),
    email : "",
}

export const useAuth = create<AuthStoreState>()(
    persist(
        (set) => ({
            ...initialState,
            setAuth: (isAuth) => set({isAuth}),
            setEmail: (email) => set({email}),
            reset: () => {
                set(initialState)
            },
        }),
        {
            name: 'authStorage',
        },
    ),
)
