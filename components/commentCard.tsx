import { useEffect, useState  } from "react";
import supabase from "../db/supabaseClient";
interface commentType {
    cAuthor_id: string;
    image?: string;
    created_at: string;
    comment: string;

}
function CommentCard({cAuthor_id, comment,created_at, image, }:  commentType) {

    const [imageSrc, setImageSrc] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    useEffect(() => {
    const fetchAuthor = async () => {
        if (!cAuthor_id) return;

        try {
            const { data, error } = await supabase
            .from('profiles')
            .select('id, username')
            .eq('id', cAuthor_id)
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
    }, [cAuthor_id]);
    
    useEffect(() => {
        const fetchImage = async () => {
            if(!image) return;
            console.log('Fetching image for URL:', image);
            const { data } = await supabase.storage.from('blog_comments').getPublicUrl(`public/`+image);
            console.log('Supabase storage response:', data);
            setImageSrc(data.publicUrl);
        }
        fetchImage();
    }, [image]);

    return (
        <div className="border p-4 rounded mb-4">
            <p className="text-sm text-gray-600 mb-2">By: {author} on {new Date(created_at).toLocaleString()}</p>
            <p className="mb-2">{comment}</p>
            {image && (
                <img src={imageSrc} alt="Comment Image" className="max-w-full h-auto" />
            )}
        </div>
    );
}   

export default CommentCard;