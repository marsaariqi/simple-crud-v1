
const LoadingContent = () => {
    return (
        <div className='flex gap-5'>
            <div className="card w-72 bg-base-100 shadow-xl card-bordered rounded-3xl border-4">
                <div className="card-body">
                    <div className="skeleton h-8 w-full mb-4"></div>
                    <div className="skeleton h-4 w-full mb-2"></div>
                    <div className="skeleton h-4 w-full mb-2"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingContent