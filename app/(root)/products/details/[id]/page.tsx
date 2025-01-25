import React from 'react'

const Page = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const id = (await params).id
    return (
        <div>Product Detail : {id}</div>
    )
}

export default Page