import {Link } from "react-router-dom"
import supabase from '../db/supabaseClient.tsx'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
interface userType{
    isUserSignedIn: boolean;
    email: string | null;
    username: string | null;
    id: string | null;
}
function Navbar() {
    const user:userType = useSelector((state: any) => state.user);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    }
    return(
        <>
        <nav className="bg-neutral-100 h-16 w-full flex items-center justify-between px-4">
            <div className="text-xl font-bold">Simple Blog</div>
            <div className="flex space-x-4">

                <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
                {user.isUserSignedIn ? (
                    <>
                        <Link to ={`/profile/`+user.id} className="text-gray-700">Welcome, {user.username }</Link>
                        <Link to = "/create" className="text-gray-700 hover:text-gray-900" >Create Blog</Link>
                        <button onClick={handleLogout}  className="text-gray-700 hover:text-gray-900 cursor-pointer">Logout</button>
                    
                    </>
                ):
                (
                    <>
                        <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
                        <Link to="/register" className="text-gray-700 hover:text-gray-900">Register</Link>
                    </>
                )}
                
            </div>
        </nav>
        </>
    )
}

export default Navbar