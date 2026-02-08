import { Link } from "react-router-dom"

function navbar() {
    return(
        <>
        <nav className="bg-neutral-100 h-16 w-full flex items-center justify-between px-4">
            <div className="text-xl font-bold">Simple Blog</div>
            <div className="flex space-x-4">

                <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-gray-900">Register</Link>
            </div>
        </nav>
        </>
    )
}

export default navbar