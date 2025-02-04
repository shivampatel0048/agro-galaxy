
'use client'

import LoadingUI from '@/components/loaders/LoadingUI';
import { getRole } from '@/utils/roleUtils';
import { getToken } from '@/utils/tokenUtils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AdminChecker = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const token = getToken();
    const router = useRouter();
    const pathname = usePathname();
    const role = getRole()
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        if (!token) {
            router.push(`/sign-in`);
        } else if (role !== 'admin') {
            toast.error('You are not authorized to access this page.')
            router.push(`/`);
        }
        setLoading(false);

    }, [token, role, router, pathname]);

    if (loading) {
        return <LoadingUI />;
    }

    return <>{children}</>;
};

export default AdminChecker;