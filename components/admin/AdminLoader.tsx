import React from 'react'

const AdminLoader = () => {
    return (
        <div className="fixed top-0 left-64 w-[calc(100vw-16rem)] h-screen flex items-center justify-center bg-white z-50">
            <span className="loader"></span>
        </div>
    )
}

export default AdminLoader