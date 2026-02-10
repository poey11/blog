import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../db/supabaseClient.tsx';

import { useSelector,useDispatch } from 'react-redux';

interface AuthContextType {
    user: any | null
    loading: boolean
} 

const AuthContext = createContext<AuthContextType | undefined>(
    {
        user: null,
        loading: false,
    }
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const userB = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    console.log('User in AuthProvider:', userB);

    useEffect(() => {
        const {data} = supabase.auth.onAuthStateChange((event, session) => {
            
            if(event === 'SIGNED_IN' || event === 'INITIAL_SESSION'){
                setUser(session?.user || null);
                dispatch({ type: 'user/setUser', payload: {
                    id: session?.user?.id || null,
                    isUserSignedIn: !!session?.user,
                    email: session?.user?.email || null,
                    username: session?.user?.user_metadata?.username || null,
                } });

            }
            else if(event === 'SIGNED_OUT'){
                setUser(null);
                dispatch({ type: 'user/removeUser' });
            }
        })
        setLoading(false);
        return () => {
            data.subscription.unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};