// userUtils.ts

export const setUserId = (id: string): void => {
    if (typeof window === "undefined") return;

    localStorage.setItem("user", JSON.stringify({ id }));  // Store only the user id
};

export const getUserId = (): string | null => {
    if (typeof window === "undefined") return null;

    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
        try {
            const { id } = JSON.parse(userDataStr);
            return id;  // Return only the user id
        } catch (e: unknown) {
            // Invalid JSON, remove corrupted user data
            localStorage.removeItem("user");
            console.error("Error parsing user data:", e);
            return null;
        }
    }
    return null;
};

export const removeUserId = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");  // Remove user id from localStorage
};
