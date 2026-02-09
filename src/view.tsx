import Navbar from "../components/navbar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../db/supabaseClient"
import { useAuth } from "../context/authContext.tsx";
import { useNavigate } from "react-router-dom"
import CommentCard from "../components/commentCard.tsx";

interface BlogType {
    id: string;
    title: string;
    content: string;
    image?: string;
    created_at: string;
    author_id: string;
}

interface commentType {
    id: string;
    cAuthor_id: string;
    image?: string;
    created_at: string;
    comment: string;
    blog_id:string

}

function View() {
    const { id } = useParams();
    const [blog, setBlog] = useState<BlogType>({
        id: '',
        title: '',
        content: '',
        created_at: '',
        author_id: '',
        image: '',
    });
    const { user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                console.error('Error fetching blog:', error);
            } else {
                setBlog(data);
            }   
        }
        fetchBlog();
    }, [id]);

    const [imageSrc, setImageSrc] = useState<string>('');
    console.log('Blog data:', blog);
    useEffect(() => {
        const fetchImage = async () => {
            if(blog.image) {
                const { data } = await supabase.storage.from('blog_image').getPublicUrl(`public/`+blog.image);
                console.log('Supabase storage response:', data);
                setImageSrc(data.publicUrl);
            };
        }
    fetchImage();
   }, [blog.image]);


   const [author, setAuthor] = useState<string>('');
    useEffect(() => {
          const fetchAuthor = async () => {
      if (!blog.author_id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('id', blog.author_id)
          .single();


        if (error) {
          console.error('Error fetching author:', error);
        } else {
          setAuthor(data?.username || 'Unknown Author');
        }
      } catch (err) {
        console.error('Unexpected error fetching author:', err);
      }
    };

    fetchAuthor();

    },[blog.author_id]);

    const handleDelete = async () => {
        if (!id) return;
       
        handleDeleteImage();
        const { error } = await supabase
            .from('blog')
            .delete()
            .eq('id', id);
        if (error) {
            console.error('Error deleting blog:', error);
        }

        navigate('/');
    }


    const handleDeleteImage = async () => {
        if (!blog.image) return;
        console.log('Deleting image with path:', `public/`+blog.image);
        const {data, error } = await supabase.storage.from('blog_image').remove([`public/`+blog.image]);
        if (error) {
            console.error('Error deleting image:', error);
        }
            console.log('Image deletion response:', data);
        
    }

    const handleEdit = () => {
        navigate(`/edit/${id}`);
    }

    const [comment, setComment] = useState<commentType>({
        id: '',
        cAuthor_id: user?.id,
        created_at: '',
        comment: '',
        image: '',
        blog_id: id || '',
    });

    const handleCommentFileUpload = async () => {
        if(!comment.image) return;
        
        const file = (document.getElementById('image') as HTMLInputElement).files?.[0];
        if(!file) return;
        
        const { error } = await supabase.storage.from('blog_comments').upload(`public/${file.name}`, file);
        
        if(error){
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
            return;
        }

    }

     

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment({
            ...comment,
            comment: e.target.value,
        });
    
    }

    const handleCommentSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!comment.comment){
            alert('Comment cannot be empty');
            return;
        }
        handleCommentFileUpload();
        const { error } = await supabase
            .from('comments')
            .insert([{
                cAuthor_id: user?.id || '',
                comment: comment.comment,
                image: comment.image,
                created_at: new Date(),
                blog_id: id,
            }]);
        if (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment');
        }
        else{
            alert('Comment submitted successfully');
            navigate(0);
        }
    }

    const [comments, setComments] = useState<commentType[]>([]);
    useEffect(() => {
        const fetchComments = async () => {
            if (!id) return;
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('blog_id', id)
                .order('created_at', { ascending: false });
            if (error) {
                console.error('Error fetching comments:', error);
            } else {
                setComments(data);
                
            }
        }
        fetchComments();
    }, [id]);

    console.log('Comments data:', comments);


    return (
        <div className="bg-neutral-100">
            <Navbar />
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
                <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
                {blog.author_id === user?.id && (
                    <>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 cursor-pointer" onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mb-4 ml-2 cursor-pointer">Delete</button>
                    </>
                )}
                <p>By: {author}</p>
                <p>{new Date(blog.created_at).toLocaleDateString()}</p>
                {imageSrc && <img src={imageSrc} alt="Blog Image" />}
                <p className="text-lg l text-justify">{blog.content}</p>
            </div>
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-bold mb-2">Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                ) : (   
                    comments.map((comment,index) => (
                        <CommentCard key={index} cAuthor_id={comment.cAuthor_id} 
                        comment={comment.comment} created_at={comment.created_at} image={comment.image}
                        />
                    ))
                )}
            </div>
            {user && (
                <>
                    <form onSubmit={handleCommentSubmit} className="container mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
                        <h3 className="text-1xl font-bold mb-2">Write a Comment....</h3>
                        <textarea className="w-full p-2 border border-gray-300 rounded mb-4" id="comment" name="comment" onChange={handleCommentChange} rows={4} placeholder="Write your comment here..."/>
                        <input type="file" id="image" name="image"  
                            onChange={(e) => setComment(prev => ({ ...prev, image: e.target.files ? e.target.files[0].name : '' }))}
                        className="w-full p-2 border border-gray-300 rounded mb-4" />
                        <button 
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">Submit Comment</button>
                    </form>

                </>

            )}
            
        </div>
    )
}

export default View