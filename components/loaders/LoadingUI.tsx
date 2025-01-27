import React from 'react'
const LoadingUI = () => {
    return (
        <div className="fixed top-16 left-0 w-screen h-[calc(100vh-4rem)] flex items-center justify-center bg-white z-50">
            <span className="loader"></span>
        </div>
    );
};

export default LoadingUI