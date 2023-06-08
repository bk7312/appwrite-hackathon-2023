
export default function ForumPost(prop) {

    let postText = prop.data.post
    if (prop.excerpt) {
        if (postText.length > 310) {
            postText = postText.slice(0, 300).trim() + "..."
        }
    }
    const date = prop.data.$createdAt.slice(0, 10)
    const time = prop.data.$createdAt.slice(11, 16)

    return (
        <div className="container mx-auto my-2 px-8 py-4 border rounded">
            {
                prop.data.title && 
                <h4 className='text-xl font-bold py-2'>
                    {prop.data.title}
                </h4>
            }
            <p className="leading-relaxed text-lg py-2">{postText}</p>
            <div className="flex justify-between flex-wrap gap-x-6 text-sm py-2 mt-2">
                <p className=''>
                    Posted by {prop.data.user}
                </p>
                <p className=''>
                    Posted on {date}, {time} GMT
                </p>
            </div>
        </div>
    )
}