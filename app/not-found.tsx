import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full h-screen flex justify-center items-center flex-col'>
            <div className='text-center space-y-2'>
                <h2 className='text-2xl font-medium'>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link className='text-blue-500 font-medium underline underline-offset-2' href="/">Return Home</Link>
            </div>
        </div>
    )
}