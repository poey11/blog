
import Navbar from "../components/navbar";
import supabase from "../db/supabaseClient";
import {  useParams } from "react-router-dom";
import BlogCard from "../components/blogCard.tsx";
import { useEffect, useState } from "react";


function Profile() {   
    const { id } = useParams();

    const [blogs, setBlogs] = useState<Array<any>>([])

    const pagination_size = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
        const from = (currentPage - 1) * pagination_size
        const to = from + pagination_size - 1
        console.log(`Fetching blogs from ${from} to ${to}`);
        const { data, error } = await supabase.from('blog').select('*')
        .eq('author_id', id)
        .order('created_at', { ascending: false }).range(from, to);
        if (error) {
            console.error('Error fetching blogs:', error);
        } else {
            setBlogs(data || []);
            setHasMore(data && data.length === pagination_size);
        }
        }
        fetchBlogs();
    }, [currentPage])
    return (
        <>
            <Navbar /> 
                <div className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
                    <h1 className="text-3xl font-bold mb-4">List of Blogs Published</h1>
                    {blogs.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8">No blogs available.</p>
                    ):(
                        blogs.map((blog,index) => (
                            <BlogCard
                                key={index}
                                title={blog.title}
                                imageUrl={blog.image}
                                created_at={blog.created_at}
                                author_id={blog.author_id}
                                id={blog.id}
                            />
                        ))
                    )}
                    <div className="flex justify-center mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                        >Previous</button>
                        <button
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={!hasMore}
                        >Next</button>
                    </div>
                </div>
        </>
    )
}

export default Profile;
