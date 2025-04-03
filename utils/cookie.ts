// Import client-side cookie functions
import { getCookie, hasCookie } from 'cookies-next/client';

export const getClientCookie = (key: string): string | null => {
    if (!key) return null; // Ensure key is provided

    // Check if cookie exists
    if (hasCookie(key)) {
        return getCookie(key) as string; // Retrieve cookie value
    }

    return null; // Return null if cookie doesn't exist
};