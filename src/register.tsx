import Navbar from '../components/navbar.tsx'
import supabase from '../db/supabaseClient.tsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react' 

function Register() {
    const [NewUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null)

    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...NewUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log('User registered:', NewUser)
        setLoading(true);
        const {data,error } = await supabase.auth.signUp({
            email: NewUser.email,
            password: NewUser.password,
         
            options:{
                data:{
                    username: NewUser.username
                }
            }
        })

        setLoading(false);
        if (error) {
            setError(error.message)
        } else {
            setError(null)

            const {error} = await supabase.from('profiles').insert({
                id: data?.user?.id,
                username: NewUser.username,
                email: NewUser.email,
            })

            navigate('/')
        }
        
    

    }

    return(
        <div className="bg-neutral-100 h-screen w-screen">
            <Navbar />
            <div className=" flex  flex-col items-center">
                <h1 className="text-4xl font-bold c">Register</h1>

                <div className="flex flex-col space-y-4 mt-8 border border-gray-300 rounded-md p-8">
                    {error && <div className="text-red-500">{error}</div>}
                    <input type="text" placeholder="Username" name="username"
                        onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="px-4 py-2 bg-blue-500 
                        text-white rounded-md hover:bg-blue-600"onClick={handleSubmit}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default Register