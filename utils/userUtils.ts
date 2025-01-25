// userUtils.ts

// Function to store only the user ID in localStorage
export const setUserId = (id: string): void => {
    if (typeof window === "undefined") return;

    localStorage.setItem("user", JSON.stringify({ id }));  // Store only the user id
};

// Function to retrieve the user ID from localStorage
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

// Function to remove user data from localStorage
export const removeUserId = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");  // Remove user id from localStorage
};
