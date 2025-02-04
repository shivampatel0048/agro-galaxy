// roleUtils.ts

export const setRole = (role: string): void => {
    if (typeof window === "undefined") return;

    localStorage.setItem("role", role); // Store role directly
};

export const getRole = (): string | null => {
    if (typeof window === "undefined") return null;

    try {
        const role = localStorage.getItem("role");
        return role; // Return role if it exists
    } catch (e: unknown) {
        console.error("Error retrieving role:", e);
        return null;
    }
};

export const removeRole = (): void => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("role"); // Remove role from localStorage
};