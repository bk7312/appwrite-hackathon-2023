import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    
    return (
        <>
            <h2 className="text-lg">Error: {error.message}</h2>
            <p className="font-mono">{error.status} - {error.statusText}</p>
        </>
    )
}