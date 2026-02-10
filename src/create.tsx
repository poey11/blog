import Navbar from "../components/navbar";
import {   useState } from "react";
import supabase from "../db/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


interface blogType{
    title: string;
    content: string;
    image: string;
    author_id: string;
    created_at: Date;
}

function Create(){
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    const [blogData, setBlogData] = useState<blogType>({
        title: '',
        content: '',
        image: '',
        author_id: user.id,
        created_at: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {   
        const { name, value } = e.target;
        setBlogData(prev => ({ ...prev, [name]: value }));
    }

    
    
    const handleFileUpload = async () => {
        if(!blogData.image) return;
        
        const file = (document.getElementById('image') as HTMLInputElement).files?.[0];
        if(!file) return;
        
        const {  error } = await supabase.storage.from('blog_image').upload(`public/${file.name}`, file);
        
        if(error){
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
            return;
        }

    }

      
    

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting blog post:', blogData);
        
        if(!blogData.title || !blogData.content){
            alert('Title and content are required');
            return;
        }
        console.log('Inserting blog post into database:', blogData);
        
        handleFileUpload();
        
        const {  error } = await supabase
            .from('blog')
            .insert([blogData]);
        
        if(error){
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post');
        }
        
        else{
            alert('Blog post created successfully');
            setBlogData({
                title: '',
                content: '',
                image: '',
                author_id: user.id,
                created_at: new Date(),
            });
            navigate('/');

        }

    }

    return(
        <div className="bg-neutral-100 h-screen w-screen">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title"
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea id="content"                         
                        onChange={handleChange} name="content" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="file"
                        onChange={(e) => setBlogData(prev => ({ ...prev, image: e.target.files ? e.target.files[0].name : '' }))}
                        id="image" name="image" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                        <button type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer" >Create Post</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Create;