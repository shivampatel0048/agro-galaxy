'use client'

import LoadingUI from '@/components/loaders/LoadingUI';
import { getToken } from '@/utils/tokenUtils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Protected = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const token = getToken();
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        if (!token) {
            router.push(`/sign-in`);
        } else {
            setLoading(false);
        }
    }, [token, router, pathname]);

    if (loading) {
        return <LoadingUI />;
    }

    return <>{children}</>;
};

export default Protected;