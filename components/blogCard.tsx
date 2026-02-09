
import supabase from "../db/supabaseClient";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
interface BlogCardProps {
    title: string;
    imageUrl?: string;
    created_at?: Date;
    author_id: string;
    id?: string;
}


function BlogCard({ title, imageUrl ,created_at, author_id,id }: BlogCardProps) { 
   const [imageSrc, setImageSrc] = useState<string>('');

   const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!author_id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username')
          .eq('id', author_id)
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
}, [author_id]);



   useEffect(() => {
    const fetchImage = async () => {
        if(!imageUrl) return;
        const { data } = await supabase.storage.from('blog_image').getPublicUrl(`public/`+imageUrl);
        setImageSrc(data.publicUrl);
    }
    fetchImage();
   }, [imageUrl]);



   
    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <Link to = {`/view/${id}`}>
                {title && <h2 className="text-2xl ml-1 font-bold mb-2">{title}</h2>}
                {author && <p className="text-gray-500 ml-1 text-sm mb-2">By {author}</p>}
                {created_at && <p className="text-gray-500 ml-1 text-sm mb-4">{new Date(created_at).toLocaleDateString()}</p>}
                {imageUrl && <img  src={imageSrc} alt={title} className="w-full h-48 rounded-lg object-cover mb-4" />}
            </Link>
        </div>
    )
}

export default BlogCard;