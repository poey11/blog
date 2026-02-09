import Navbar from '../components/navbar.tsx'
import supabase from '../db/supabaseClient.tsx'
import { useState } from 'react' 
import { useNavigate } from 'react-router-dom'


function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('User logged in:', credentials)
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
        })
        setLoading(false);

        if (error) {
            setError(error.message)
        }
        else{
            setError(null)
            alert('Login successful')
            navigate('/')
        }

    }


    return(
        <div className="bg-neutral-100 h-screen w-screen">
            <Navbar />
            <div className=" flex  flex-col items-center">
                <h1 className="text-4xl font-bold c">Login</h1>

                <div className="flex flex-col space-y-4 mt-8 border border-gray-300 rounded-md p-8">
                    {error && <div className="text-red-500">{error}</div>}

                    <input type="email" placeholder="Email" name="email" 
                        onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" 
                        onChange={handleChange}
                    placeholder="Password" name="password" className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={handleSubmit}
                    >   {loading ? 'Logging in...' : 'Login'}
                    </button>

                </div>
            </div>
            
        </div>
    )
}

export default Login