
import Navbar from "../components/navbar";
import {   useState,useEffect } from "react";
import supabase from "../db/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

interface blogType{
    title: string;
    content: string;
    image: string;
}

function Edit() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [blogData, setBlogData] = useState({
        title: '',
        content: '',
        image: '',
    });

    const [oldImage, setOldImage] = useState<string>('');

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error('Error fetching blog for edit:', error);
            }
            else {
                setBlogData({
                    title: data.title,
                    content: data.content,
                    image: data.image,
                });
                setOldImage(data.image);
            }
        }
        fetchBlog();
    }, [id]);

    

    const removeOldImage = async () => {
        if(!blogData.image) return;
        
        const { data, error } = await supabase.storage.from('blog_image').remove([`public/${oldImage}`]);
        if (error) {
             console.error('Error deleting old image:', error);
             alert('Failed to delete old image');
             return;
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {   
        const { name, value } = e.target;
        setBlogData(prev => ({ ...prev, [name]: value }));
    }

    const handleFileUpload = async () => {
        if(!blogData.image) return;
        
        const file = (document.getElementById('image') as HTMLInputElement).files?.[0];
        if(!file) return;
        
        removeOldImage();
        const {  error } = await supabase.storage.from('blog_image').upload(`public/${file.name}`, file);

        setBlogData(prev => ({ ...prev, image: file.name }));
        
        if(error){
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
            return;
        }

    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitting edited blog post:', blogData);
       
        if(!blogData.title || !blogData.content){
            alert('Title and content are required');
            return;
        }
        handleFileUpload();
        const { data, error } = await supabase
            .from('blog')
            .update({
                title: blogData.title,
                content: blogData.content, 
                image: blogData.image,
            })
            .eq('id', id);  
        if(error){
            console.error('Error updating blog post:', error);
            alert('Failed to update blog post');
        }
        else{
            alert('Blog post updated successfully');
            navigate(`/view/${id}`);
        }


    }


    return (
        <div className="bg-neutral-100 h-screen w-screen">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title"
                        onChange={handleChange}
                        value={blogData.title}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 "/>
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea id="content"          
                        value={blogData.content}               
                        onChange={handleChange} name="content" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL (Current Image: {oldImage})</label>
                        <input type="file"
                        onChange={(e) => setBlogData(prev => ({ ...prev, image: e.target.files ? e.target.files[0].name : '' }))}
                        id="image" name="image" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 " />
                    </div>
                    <div>
                        <button type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer" >Update Blog</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Edit;