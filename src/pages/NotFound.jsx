
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div>
            <h2 className="text-lg">Page Not Found!</h2>
            <Link to="/">Back to home</Link>
        </div>
    )
}