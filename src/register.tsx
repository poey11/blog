import Navbar from '../components/navbar.tsx'
import { useState } from 'react'

function Register() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value})
        
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // Here you would typically send the user data to your backend for registration
        console.log('User registered:', user)
    }

    return(
        <div className="bg-neutral-100 h-screen w-screen">
            <Navbar />
            <div className=" flex  flex-col items-center">
                <h1 className="text-4xl font-bold c">Register</h1>

                <div className="flex flex-col space-y-4 mt-8 border border-gray-300 rounded-md p-8">
                    <input type="text" placeholder="Username" name="username"
                        onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button className="px-4 py-2 bg-blue-500 
                        text-white rounded-md hover:bg-blue-600"onClick={handleSubmit}>
                    Register</button>
                </div>
            </div>
            
        </div>
    )
}

export default Register