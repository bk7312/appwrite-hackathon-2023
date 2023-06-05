
export default function ForumPost(prop) {
    const { text } = prop
    
    if (text) {
        return <p>{text}</p>
    }
    return (
        <div className="container mx-auto p-2">
            <h4 className='text-lg font-bold mt-2 py-2'>
                {prop.data.title}
            </h4>
            <p>{prop.data.postData[0].slice(0, 100).trim() + "..."}</p>
            <p className='text-sm mt-2 py-2'>
                Posted by: {prop.data.user}
            </p>
        </div>
    )
}