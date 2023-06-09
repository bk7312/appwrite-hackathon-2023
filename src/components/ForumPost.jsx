import { Link } from 'react-router-dom'

export default function ForumPost(prop) {

    let postText = JSON.parse(prop.data.post)
    if (prop.excerpt) {
        if (postText.length > 310) {
            postText = postText.slice(0, 300).trim() + "..."
        }
    }
    const date = prop.data.$createdAt.slice(0, 10)
    const time = prop.data.$createdAt.slice(11, 16)
        
    return (
        <div className={`container mx-auto my-2 px-8 py-4 border rounded ${prop.className}`}>
            {
                prop.data.title && 
                <h4 className='text-xl font-bold py-2'>
                    {prop.data.title}
                </h4>
            }
            <p className={`leading-relaxed text-lg py-2 ${!prop.excerpt && "whitespace-pre-wrap"}`}>{postText}</p>
            <div className="flex justify-between flex-wrap gap-x-6 text-sm py-2 mt-2">
                <p className=''>
                    Posted by <Link to={`/forum/profile/${prop.data.user}`} className='underline'>{prop.data.user}</Link>
                </p>
                <p className=''>
                    Posted on {date}, {time} GMT
                </p>
            </div>
        </div>
    )
}