import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../db/supabaseClient.tsx';



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

    useEffect(() => {
        const {data} = supabase.auth.onAuthStateChange((event, session) => {
            
            if(event === 'SIGNED_IN' || event === 'INITIAL_SESSION'){
                setUser(session?.user || null);
            }
            else if(event === 'SIGNED_OUT'){
                setUser(null);
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